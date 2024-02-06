import { Telegraf } from "telegraf";


const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("hello", (ctx) => ctx.reply("Hello, friend!"));

module.exports = (req, res) => {
  return bot.handleUpdate(req.body, res);
};