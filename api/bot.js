import { webhookCallback } from "grammy";
import bot from "../utils/bot.js";
import registerHandlers from "../handlers/handlers.js";

// Ваш код оставляется без изменений
async function runApp() {
  // Handle errors
  bot.catch((err) => console.error(err));

  // Register handlers
  await registerHandlers();

  // Set up webhooks
  webhookCallback(bot, "http");

  // Start bot
  // console.info(`\x1b[33mBot is running on @${bot.botInfo.username}\x1b[0m`);
}

// Экспортируйте функцию, которая будет обрабатывать HTTP-запросы
export default async function handler(req, res) {
  // Вызовите вашу функцию runApp при получении HTTP-запроса
  await runApp();

  // Верните успешный статус, если нужно
  res.status(200).send("Bot is running!");
}