import { I18n } from "@grammyjs/i18n";

const i18n = new I18n({
  defaultLocale: "uz",
  directory: process.cwd() + "/locales",
  useSession: true,
});

export default i18n;
