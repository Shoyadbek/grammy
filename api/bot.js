import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("hello", (ctx) => ctx.reply("Hello, friend!"));

export default (req, res) => {
  return bot.handleUpdate(req.body, res);
};