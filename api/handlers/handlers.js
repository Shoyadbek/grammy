import bot from "../utils/bot.js";

import { defaultKeyboards } from "../keyboards/default.js";
import { inlineKeyboards } from "../keyboards/inline.js";

import axios from "axios";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { InputFile } from "grammy";
import { hears } from "@grammyjs/i18n";

async function registerHandlers() {
  bot.command("start", (ctx) => {
    ctx.reply(`Пожалуйста, выберите язык | Iltimos, tilni tanlang`, {
      reply_markup: inlineKeyboards.lang,
    });
  });

  bot.callbackQuery(/^lang:(.+)$/, async (ctx) => {
    const lang = ctx.match[1];
    ctx.i18n.setLocale(lang);
    await ctx.deleteMessage();
    return ctx.reply(ctx.t("home"), {
      reply_markup: await defaultKeyboards.homeMenu(lang, ctx.t),
    });
  });

  bot.command("lang", async (ctx) => {
    return ctx.reply(`Пожалуйста, выберите язык | Iltimos, tilni tanlang`, {
      reply_markup: inlineKeyboards.lang,
    });
  });

  bot.filter(hears("news"), async (ctx) => {
    await ctx.reply("news");
  });

  bot.filter(hears("contacts"), async (ctx) => {
    await ctx.reply("contacts");
  });

  bot.on(":text", async (ctx) => {
    const searchText = ctx.message.text;

    const lang = await ctx.i18n.getLocale();
    const searchTextCleaned = searchText.replace(
      /^[\s\S]*?([\wа-яА-ЯёЁ0-9].*)$/,
      "$1"
    );
    console.log(searchTextCleaned);
    ctx.reply(ctx.t("subcategory"), {
      reply_markup: await inlineKeyboards.subCategory(lang, searchTextCleaned),
    });
  });

  bot.callbackQuery(/^subcategory:(.+)$/, async (ctx) => {
    try {
      const categoryId = ctx.match[1];

      const lang = await ctx.i18n.getLocale();

      // Запрос на API для получения данных магазинов по выбранной подкатегории
      const response = await axios.get(
        `https://apps.avtoindex.uz/api/v1/market/list/?category_id=${categoryId}&q=`
      );

      const stores = response.data || [];

      if (stores.length > 0) {
        // Отправляем каждый магазин в отдельном сообщении с фото
        for (const store of stores) {
          let resizedImageBuffer;

          try {
            resizedImageBuffer = await resizeImage(
              store.background_image,
              600,
              600
            );

            // Генерируем уникальное имя файла
            const filename = `resized_image_${Date.now()}.jpg`;
            const filepath = path.join(process.cwd(), filename);

            await fs.promises.writeFile(filename, resizedImageBuffer, "binary");

            let caption = `${store.store_name} | ${
              lang == "uz" ? store.sub_title : store.sub_title_ru
            }\n\n`;

            caption += `${
              lang == "uz" ? store.description : store.description_ru
            }\n\n`;

            caption += `${ctx.t("phone")} ${store.phone_number}\n\n`;
            caption += `${ctx.t("number")} ${store.title}\n\n`;
            caption += `📍 ${store.block} ${ctx.t("block")}, ${
              store.floor
            } ${ctx.t("floor")} \n\n`;

            let scheduleText = store.schudale.items
              .map(
                (day) =>
                  `${lang == "uz" ? day.title_uz : day.title_ru}: ${
                    day.time.open
                  } - ${day.time.close}`
              )
              .join(", ");

            caption += `${ctx.t("schedule")} ${
              lang == "uz" ? scheduleText : scheduleText
            }\n`;

            if (
              store.social_network &&
              Object.keys(store.social_network).length > 0
            ) {
              // Кнопки
              const inlineKeyboard = {
                inline_keyboard: Object.entries(store.social_network).map(
                  ([network, link]) => [
                    {
                      text: capitalizeFirstLetter(network),
                      url: isValidUrl(link) ? link : `https://t.me/${link}`,
                    },
                  ]
                ),
              };

              // Отправка сообщения с фотографией, HTML-разметкой подписи и кнопками
              await ctx.replyWithPhoto(new InputFile(filepath), {
                caption,
                parse_mode: "HTML",
                reply_markup: inlineKeyboard,
              });
            } else {
              // Отправка сообщения с фотографией и HTML-разметкой подписи без кнопок
              await ctx.replyWithPhoto(new InputFile(filepath), {
                caption,
                parse_mode: "HTML",
              });
            }

            // Удаляем временный файл после отправки
            await fs.promises.unlink(filepath);
          } catch (resizeError) {
            console.error(resizeError);
            continue; // Пропускаем магазин, если возникла ошибка при изменении размера изображения
          }
        }
      } else {
        // Сообщение, если магазины не найдены
        await ctx.answerCallbackQuery("Магазины не найдены.");
      }
    } catch (error) {
      console.error(error);
      // Сообщение об ошибке при обработке запроса
      await ctx.reply("Произошла ошибка при обработке запроса.");
    }
  });
}

async function resizeImage(imageUrl, width, height) {
  // Загрузка изображения и изменение его размера
  const resizedImageBuffer = await sharp(
    await axios
      .get(imageUrl, { responseType: "arraybuffer" })
      .then((response) => response.data)
  )
    .resize({ width, height })
    .toBuffer();

  return resizedImageBuffer;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default registerHandlers;
