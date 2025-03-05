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
import promotion from "./src/routes/promotiton";
import { Promotion } from "./src/entity/promotion.entity"; 
import coupon from "./src/routes/coupon";
import { Coupon } from "./src/entity/coupon.entity"; 

const token = process.env.TELEGRAM_TOKEN || "";

console.log(token);

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", auth);
app.use("/api/activity", activity);
app.use("/api/promotion", promotion);
app.use("/api/coupon", coupon);

const bot = new telegramBot(token, { polling: true });

const commands = [
  { command: "/start", description: "Start the bot and get command list" },
  { command: "/branch", description: "See all the branch" },
  { command: "/workout-plan", description: "See all the workout-plan" },
  { command: "/promotion", description: "See current promotions" },
  { command: "/coupon", description: "See available coupons" },
  { command: "/membership-info", description: "see all the membership-info" },
  { command: "/membershin-plan", description: "See all the memership plan" },

];

bot.setMyCommands(commands).then(() => console.log("Commands set successfully"));

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let response = "Welcome! Here are the available commands:\n\n";
  commands.forEach((cmd) => {
    response += `${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, response);
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "This bot allows you to access various features. Use /start to see available commands.");
});

bot.onText(/\/promotion/, async (msg) => {
  const promotionRepo = AppDataSource.getRepository(Promotion);
  try {
    const promotions = await promotionRepo.find({
      order: { created_at: "DESC" },
    });

    if (promotions.length === 0) {
      return bot.sendMessage(msg.chat.id, "No promotions available.");
    }

    promotions.forEach(async (promotion) => {
      const message = `🔥 *${promotion.title}* 🔥\n` +
                      `💬 ${promotion.offer_description}\n` +
                      `🎯 Discount: ${promotion.discount_percentage}%\n` +
                      `⏳ Valid Until: ${promotion.valid_until}\n`;

      if (promotion.img_url) {
        await bot.sendPhoto(msg.chat.id, promotion.img_url, { caption: message, parse_mode: "Markdown" });
      } else {
        await bot.sendMessage(msg.chat.id, message, { parse_mode: "Markdown" });
      }
    });
  } catch (err) {
    console.error("Error fetching promotions", err);
    bot.sendMessage(msg.chat.id, "Failed to fetch promotions. Please try again later.");
  }
});

bot.onText(/\/coupon/, async (msg) => {
  const couponRepo = AppDataSource.getRepository(Coupon);
  try {
    const coupons = await couponRepo.find({
      order: { createdAt: "DESC" },
    });

    if (coupons.length === 0) {
      return bot.sendMessage(msg.chat.id, "No coupons available.");
    }

    coupons.forEach(async (coupon) => {
      const message = `🎉 *${coupon.title}* 🎉\n` +
                      `💬 ${coupon.offer}\n` +
                      `⏳ Valid Until: ${coupon.valid_until.toLocaleDateString()}\n` +
                      `📜 Terms: ${coupon.terms}\n` +
                      `🎯 Status: ${coupon.status ? "Active" : "Inactive"}`;

      await bot.sendMessage(msg.chat.id, message, { parse_mode: "Markdown" });
    });
  } catch (err) {
    console.error("Error fetching coupons", err);
    bot.sendMessage(msg.chat.id, "Failed to fetch coupons. Please try again later.");
  }
});

bot.on("message", (msg) => {
  try {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Received your message!");
  } catch (err) {
    console.error("Error in message handler", err);
  }
});

export const getDataSource = (delay = 3001): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

export default app;

const PORT = process.env.PORT || 3000;
AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 
});
