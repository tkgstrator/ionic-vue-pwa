import { ComponentPublicInstance, createApp, ref, Ref } from "vue";
import App from "./App.vue";
import router from "./router";
// Added by the CLI
import "./registerServiceWorker";

// Above the createApp() line
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { IonicVue } from "@ionic/vue";

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

/* Localized */
import { createI18n } from "vue-i18n";

/* Dayjs */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

/* Firebase */
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
console.log(firebaseConfig);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.tz.setDefault(dayjs.tz.guess());

// 現在の設定を取得して、なければ英語に設定
const locale: string = localStorage.getItem("locale") ?? "en";

const i18n = createI18n({
  legacy: false,
  locale: locale,
  allowComposition: true,
  messages: {
    ja: require("/locales/ja.yaml"),
    en: require("/locales/en.yaml"),
    zh: require("/locales/zh-cn.yaml"),
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
