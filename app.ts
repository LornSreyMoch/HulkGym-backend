import express from "express";
const app = express();
import auth from "./src/routes/auth";
import { AppDataSource } from "./src/config/data-source";
import { DataSource } from "typeorm";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger";
import cors from "cors";
import bodyParser from "body-parser";
import activity from "./src/routes/activity";
import telegramBot from "node-telegram-bot-api";
import { handleMessage } from "./src/service/telegram.service";

import branch from "./src/routes/branch";
import branchContact from "./src/routes/branchContact";

import workoutPlan from "./src/routes/workoutplan";
import workout from "./src/routes/workout";
import exercise from "./src/routes/exercise";
import { WorkoutPlan } from "./src/entity/workout_plan.entity";
import { Workout } from "./src/entity/workout.entity";




import axios from "axios";
import membershipPlan from "./src/routes/membership"

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN || "";

console.log("token", token)

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(bodyParser.json());

// Swagger setup
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes setuphttps://fboxmschac.sharedwithexpose.com
app.use("/api/auth", auth);
app.use("/api/activity", activity);
app.use("/api/membership_plan", membershipPlan);


app.use("/api/branch", branch);
app.use("/api/branchContact", branchContact);

app.use("/api/workoutplan", workoutPlan);
app.use("/api/workout", workout);
app.use("/api/exercise", exercise);

interface Exercise {
  id: number;
  name: string;
  workout_id: number;
}


// Create a bot that uses 'polling' to fetch new updates
const bot = new telegramBot(token, { polling: true });

// Define the command list
const commands = [
  { command: "/start", description: "Start the bot and get command list" },
  { command: "/workout_plan", description: "Get help and usage instructions" },

];

// Set bot commands in Telegram
bot
  .setMyCommands(commands)
  .then(() => console.log("Commands set successfully"));

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let response = "Welcome! Here are the available commands:\n\n";
  commands.forEach((cmd) => {
    response += `${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, response);
});
bot.onText(/\/workout_plan/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const workouts = await AppDataSource.getRepository(WorkoutPlan).find();
    console.log("=============================", workouts)
    if (workouts.length > 0) {
      let message = "Here are all available workout plans:\n\n";

      // Create inline keyboard buttons
      const buttons = workouts.map((workout) => [
        { text: workout.name, callback_data: `workout_${workout.id}` },
      ]);

      bot.sendMessage(chatId, message, {
        reply_markup: { inline_keyboard: buttons },
      });
    } else {
      bot.sendMessage(chatId, "No workout plans found.");
    }
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    bot.sendMessage(chatId, "An error occurred while fetching workout plan data.");
  }
});
bot.on("callback_query", async (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;

  if (!msg || !data) {
    return bot.sendMessage(callbackQuery.from.id, "Invalid selection. Please try again.");
  }

  if (data.startsWith("workout_")) {
    const workoutId = data.split("_")[1]; // Extract workoutId

    try {
      // Use parameterized query to avoid SQL injection risks
      const exercises = await AppDataSource.query(
        `SELECT * FROM public.exercise WHERE "workout_id" = $1`, [workoutId]
      );
      console.log(exercises);

      if (exercises.length === 0) {
        return bot.sendMessage(msg.chat.id, "No exercises found for this plan.");
      }

      // Create inline buttons for each exercise
      const buttons = exercises.map((exercise:Exercise) => [
        {
          text: `💪 ${exercise.name}`,
          callback_data: `exercise_${exercise.id}`,
        },
      ]);

      bot.sendMessage(msg.chat.id, "Exercises in this plan:", {
        reply_markup: {
          inline_keyboard: buttons,
        },
      });
    } catch (err) {
      console.error("Error fetching exercises:", err);
      bot.sendMessage(msg.chat.id, "Failed to fetch exercises. Please try again later.");
    }
  }
});






// Listen for any kind of message. There are different kinds of
bot.on("message", (msg) => {
  try {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    const message = handleMessage(msg) || "";
    console.log("------ ", msg);
    if (message.length > 0) bot.sendMessage(chatId, message);
  } catch (err) {
    console.log(err);
  }
});

// Handle /options command with inline buttons
bot.onText(/\/options/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Option 1", callback_data: "option_1" },
          { text: "Option 2", callback_data: "option_2" },
        ],
        [{ text: "Option 3", callback_data: "option_3" }],
      ],
    },
  };
  bot.sendMessage(chatId, "Please select an option:", options);
});

// Handle callback queries from inline buttons
bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  if (msg) {
    bot.sendMessage(msg.chat.id, `You selected: ${callbackQuery.data}`);
    bot.answerCallbackQuery(callbackQuery.id);
  }
});

// Start server
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

export default app;
