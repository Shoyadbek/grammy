import { webhookCallback } from "grammy";
import bot from "../utils/bot.js";
import registerHandlers from "../handlers/handlers.js";

async function runApp() {
  // Handle errors
  bot.catch((err) => console.error(err));

  // Register handlers
  await registerHandlers();



  // Set up webhooks
  webhookCallback(bot, "http");



  // Start bot
  console.info(`\x1b[33mBot is running on @${bot.botInfo.username}\x1b[0m`);
}

export default async function handler(req, res) {
  // Вызовите вашу функцию runApp при получении HTTP-запроса
  await runApp();

  // Верните успешный статус, если нужно
  res.status(200).send("Bot is running!");
}



// import bot from "../utils/bot.js";
// import { run } from "@grammyjs/runner";
// import registerHandlers from "../handlers/handlers.js";
// async function runApp() {
//   // Handle errors

//   bot.catch((err) => console.error(err));

//   // Start bot

//   await bot.init();
//   await registerHandlers();
//   run(bot);
//   console.info(`\x1b[33mBot is running on @${bot.botInfo.username}\x1b[0m`);
//   // Enable graceful stop

//   const stopRunner = () => runner.isRunning() && runner.stop();
//   process.once("SIGINT", stopRunner);
//   process.once("SIGTERM", stopRunner);
// }

// runApp();
