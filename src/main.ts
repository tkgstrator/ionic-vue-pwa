import { ComponentPublicInstance, createApp, ref, Ref } from "vue";
import App from "./App.vue";
import router from "./router";
// Added by the CLI
import "./registerServiceWorker";

// Above the createApp() line
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { createGesture, IonicVue } from "@ionic/vue";

import VueGtag from "vue-gtag-next";
import Ads from "vue-google-adsense";

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

/* Dayjs */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

const locale: string = localStorage.getItem("locale") ?? "en";

const i18n = createI18n({
  legacy: true,
  locale: locale,
  allowComposition: true,
  messages: {
    ja: require("./locales/ja.json"),
    en: require("./locales/en.json"),
  },
  fallbackLocale: locale,
  fallbackRoot: true,
  availableLocales: ["en", "ja", "zh"],
});

const app = createApp(App)
  .use(IonicVue, {
    rippleEffect: true,
    mode: "md",
  })
  .use(router)
  .use(i18n)
  .use(VueGtag, { property: { id: "G-ZTVD4X4NVR", router } })
  .use(Ads.Adsense)
  .use(Ads.InArticleAdsense)
  .use(Ads.InFeedAdsense);

router.isReady().then(() => {
  app.mount("#app");
});
