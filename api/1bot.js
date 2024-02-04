import { Bot, webhookCallback } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command('start', ctx => {
    ctx.reply('Hello Vercel!')
})

bot.command("private", (ctx) => {
  ctx.reply("Using Web Application Button in private messages", {
    ...Markup.inlineKeyboard([
      Markup.button.webApp("Web App Button", process.env.PUBLIC_WEBAPP_URL),
    ]),
  });
});

bot.command("inline", (ctx) => {
  ctx.reply("Using Inline Button in public messages", {
    ...Markup.inlineKeyboard([
      Markup.button.url("Inline Button", process.env.TELEGRAM_WEBAPP_URL),
    ]),
  });
});

bot.command("keyboard", (ctx) => {
  ctx.reply("Using Keyboard Button in prviate messages", {
    ...Markup.keyboard([
      Markup.button.webApp("Keyboard Button", process.env.PUBLIC_WEBAPP_URL),
    ]).resize(),
  });
});


export default webhookCallback(bot, "http");
