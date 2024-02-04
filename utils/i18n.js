import { I18n } from "@grammyjs/i18n";
import path from 'path';

const currentModuleURL = new URL(import.meta.url);
const currentModulePath = path.dirname(currentModuleURL.pathname);

const i18n = new I18n({
  defaultLocale: "uz",
  directory: path.join(currentModulePath, '..', 'locales'),
  useSession: true,
});

export default i18n;