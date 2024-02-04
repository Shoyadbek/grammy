import { Bot, session } from "grammy";

import { ignoreOld, sequentialize } from "grammy-middlewares";
import i18n from "./i18n.js";


const bot = new Bot(process.env.BOT_TOKEN);

// Middlewares

bot.use(ignoreOld());
bot.use(sequentialize());
bot.use(session({ initial: () => ({}) }));
bot.use(i18n.middleware());
// bot.use(async (ctx, next) => {
//   let user = await db.getUser(ctx.chat.id);
//   if (!user) {
//     user = await db.createUser({
//       id: ctx.chat.id,
//       type: ctx.chat.type,
//       lang: ctx.from?.language_code || undefined,
//     });
//   }
//   ctx.session.user = user;
//   return next();
// });

bot.api.setMyCommands([
  { command: "start", description: "Asosiy menyu / Главное меню" },
  { command: "lang", description: "Tilni o'zgartirish / Сменить язык" },
]);

export default bot;
