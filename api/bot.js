import { webhookCallback } from "grammy";
import bot from "../utils/bot.js";
import registerHandlers from "../handlers/handlers.js";

const startBot = async () => {
  await registerHandlers(bot);
  webhookCallback(bot, "http");  // возвращает функцию-обработчик вебхука
  return "Bot is running!";  // возвращаемый ответ
};

export default startBot;