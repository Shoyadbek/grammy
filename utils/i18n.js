import { I18n } from "@grammyjs/i18n";
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const i18n = new I18n({
  defaultLocale: "uz",
  directory: path.resolve(__dirname, "locales"),
  useSession: true,
});

export default i18n;