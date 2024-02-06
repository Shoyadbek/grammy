import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);


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

bot.telegram.deleteWebhook().then(() => {
  return bot.telegram.setWebhook(`${process.env.VERCEL_URL}/api/bot`, { dropPendingUpdates: true });
});

export default (req, res) => {
  return bot.handleUpdate(req.body, res, { dropPendingUpdates: true });
};