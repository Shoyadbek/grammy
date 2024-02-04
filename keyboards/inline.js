import axios from "axios";
import { InlineKeyboard } from "grammy";

const lang = new InlineKeyboard()
  .row(InlineKeyboard.text("🇷🇺 Русский", "lang:ru"))
  .row(InlineKeyboard.text("🇺🇿 O'zbekcha", "lang:uz"));

const subCategory = async (locale, searchText) => {
  try {
    const response = await axios.get(
      "https://apps.avtoindex.uz/api/v1/eav/category/list/"
    );

    const categories = response.data.items || [];

    const selectedCategory = categories.find((category) => {
      const categoryTitle =
        locale === "uz" ? category.title.title_uz : category.title.title_ru;
      return categoryTitle === searchText;
    });

    if (
      selectedCategory &&
      selectedCategory.children &&
      selectedCategory.children.length > 0
    ) {
      // Если у выбранной категории есть подменю, формируем inline клавиатуру
      const inlineKeyboard = new InlineKeyboard();

      selectedCategory.children.forEach((subcategory) => {
        const subcategoryTitle =
          locale === "uz"
            ? subcategory.title.title_uz
            : subcategory.title.title_ru;

        // Используем row и передаем параметры текста и данных
        inlineKeyboard.row(
          InlineKeyboard.text(subcategoryTitle, `subcategory:${subcategory.id}`)
        );
      });

      // Теперь возвращаем InlineKeyboard
      console.log(inlineKeyboard);
      return inlineKeyboard;
    }
  } catch (error) {
    console.error(error);
  }
};

export const inlineKeyboards = {
  lang,
  subCategory,
};
