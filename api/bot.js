import { webhookCallback } from "grammy";
import bot from "../utils/bot.js";
import registerHandlers from "../handlers/handlers.js";

const startBot = async () => {
  
  await bot.init();
  
  await registerHandlers(bot);
  const handleWebhook = webhookCallback(bot, "http");

  return handleWebhook; // Возвращаем функцию-обработчик из функции startBot
};

// Вызываем startBot для инициализации и запуска бота
export default startBot; 