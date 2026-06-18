import { createI18n } from "vue-i18n";

import th from "./locales/th";
import en from "./locales/en";

export type AppLocale = "th" | "en";

const defaultLocale: AppLocale = "th";

const storedLocale = localStorage.getItem("app_locale") as AppLocale | null;

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale || defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    th,
    en,
  },
});