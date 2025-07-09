import { Tolgee, DevTools, FormatSimple } from "@tolgee/react";

// Statische Importe der Übersetzungsdateien
import de from "../translation/de.json";
import en from "../translation/en.json";
import es from "../translation/es.json";
import it from "../translation/it.json";
import nl from "../translation/nl.json";
import zh from "../translation/zh.json";

// Konfiguration basierend auf Umgebung
const isDevelopment = process.env.NODE_ENV === 'development';
const defaultLanguage = localStorage.getItem("language") || "de";

export const tolgee = Tolgee()
  .use(FormatSimple())
  .use(isDevelopment ? DevTools() : undefined)
  .init({
    ...(isDevelopment && {
      apiUrl: "http://localhost:3000",
      apiKey: "dummy",
    }),
    availableLanguages: ["de", "en", "es", "it", "nl", "zh"],
    defaultLanguage,
    fallbackLanguage: "en",
    staticData: { de, en, es, it, nl, zh },
  });
