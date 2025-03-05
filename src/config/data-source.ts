import { DataSource } from "typeorm";
import path from "path";
import * as dotenv from "dotenv";

// Import Entities
import { UserInfo } from "../entity/user.entity";
import { Promotion } from "../entity/promotion.entity";
import { Coupon } from "../entity/coupon.entity";
import { Activity } from "../entity/activity.entity"; // Ensure Activity is included

dotenv.config();

// Destructuring environment variables
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

// Resolving paths for migrations
const migrationPath = path.join(__dirname, "/migrations/*.{ts,js}");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: false,
  synchronize: NODE_ENV === "dev", // Auto-sync only in development
  logging: NODE_ENV === "dev",
  entities: [Promotion, Coupon, UserInfo, Activity], // Ensure all entities are registered
  migrations: [migrationPath], 
  subscribers: [],
});
