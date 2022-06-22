import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Added by the CLI
import "./registerServiceWorker";

// Above the createApp() line
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Theme fonts */
import "./assets/sass/style.scss";
import { createI18n } from "vue-i18n";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const message = {
  en: {
    water_level: {
      HT: "HT",
      NT: "NT",
      LT: "LT",
    },
    event_type: {
      WATER_LEVELS: "-",
      RUSH: "Rush",
      GEYSER: "Goldie Seeking",
      GRILLER: "Griller",
      RALLY: "The Mothership",
      FOG: "Fog",
      MISSILE: "Cohock Charge",
    },
  },
  ja: {
    water_level: {
      HT: "満潮",
      NT: "通常",
      LT: "干潮",
    },
    event_type: {
      WATER_LEVELS: "-",
      RUSH: "ラッシュ",
      GEYSER: "キンシャケ探し",
      GRILLER: "グリル発進",
      RALLY: "ハコビヤ襲来",
      FOG: "霧",
      MISSILE: "ドスコイ大量発生",
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  allowComposition: true,
  messages: message,
  fallbackLocale: "en",
  fallbackRoot: true,
  availableLocales: ["en", "ja"],
});

const app = createApp(App).use(IonicVue).use(router).use(i18n);

router.isReady().then(() => {
  app.mount("#app");
});
