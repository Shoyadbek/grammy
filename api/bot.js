import { webhookCallback } from "grammy";
import bot from "../utils/bot.js";
import registerHandlers from "../handlers/handlers.js";

// Оборачиваем вызов registerHandlers в async функцию
const startBot = async () => {
  // Регистрируем обработчики из registerHandlers
  await registerHandlers(bot);

  // Экспортируем функцию-обработчик вебхука
  return webhookCallback(bot, "http");
};

// Вызываем startBot для инициализации и запуска бота
export default startBot;