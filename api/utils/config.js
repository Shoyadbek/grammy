import { config } from 'dotenv';

config();
export default {
  BOT_TOKEN: process.env.BOT_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL
};
