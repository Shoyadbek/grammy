import { Bot, webhookCallback } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command('start', ctx => {
    ctx.reply('Hello Vercel!')
})

export default webhookCallback(bot, "http");
