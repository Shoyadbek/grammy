import { Telegraf } from "telegraf";

const token = process.env.BOT_TOKEN; // Проверьте, что у вас есть переменная окружения BOT_TOKEN
const bot = new Telegraf(token);

bot.command("hello", ctx => ctx.reply("Hello, friend!"));

export default botFunction = bot.webhookCallback(bot.secretPathComponent());