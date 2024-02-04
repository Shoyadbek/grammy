import axios from "axios";
import { Keyboard } from "grammy";

const homeMenu = async (lang, t) => {
  try {
    const response = await axios.get(
      "https://apps.avtoindex.uz/api/v1/eav/category/list/"
    );

    const categories = response.data.items || [];

    const keyboard = new Keyboard();

    categories.forEach((category, index) => {
      const title =
        lang === "uz" ? category.title.title_uz : category.title.title_ru;

      const emoji = getEmoji(lang, title);

      keyboard.text(emoji + title);

      if ((index + 1) % 2 === 0) {
        keyboard.row();
      }
    });
    keyboard.text(t("news"));
    keyboard.text(t("contacts"));
    return keyboard.resized();
  } catch (error) {
    return new Keyboard().resized();
  }
};

const getEmoji = (lang, categoryTitle) => {
  switch (lang) {
    case "ru":
      switch (categoryTitle) {
        case "Автомагазины":
          return "🛒 ";
        case "Документация":
          return "📄 ";
        case "Магазины":
          return "🛍️ ";
        case "Автомастерская":
          return "🔧 ";
        case "Услуги":
          return "🛠️ ";
        case "Кафе и рестораны":
          return "🍽️ ";
        default:
          return "";
      }
    case "uz":
      switch (categoryTitle) {
        case "Avto do’konlar":
          return "🛒 ";
        case "Hujjatlashtirish":
          return "📄 ";
        case "Do’konlar":
          return "🛍️ ";
        case "Ustaxona":
          return "🔧 ";
        case "Xizmatlar":
          return "🛠️ ";
        case "Kafe va restoranlar":
          return "🍽️ ";
        default:
          return "";
      }
    default:
      return "";
  }
};

export const defaultKeyboards = {
  homeMenu,
};
