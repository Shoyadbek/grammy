import { I18n } from "@grammyjs/i18n";
import path from 'path';

const i18n = new I18n({
  defaultLocale: "uz",
  directory: path.resolve(__dirname, "locales"),
  useSession: true,
});

export default i18n;