import { config } from "dotenv";
import { z } from "zod";

config({ path: `.env.${process.env.NODE_ENV}.local` });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().default("3000"),
  MONGODB_URL: z
    .string()
    .default("mongodb://localhost:27017/kanban-task-management"),
  MONGODB_DBNAME: z.string(),
  LOG_FORMAT: z.string(),
  LOG_DIR: z.string(),
});

export const {
  PORT,
  NODE_ENV,
  MONGODB_URL,
  MONGODB_DBNAME,
  LOG_DIR,
  LOG_FORMAT,
} = envSchema.parse(process.env);
