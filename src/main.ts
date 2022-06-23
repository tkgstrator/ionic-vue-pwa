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
    stats_type: {
      SALMONID: "Salmonids",
      EGGS: "Eggs",
    },
    stage_name: {
      5000: "Spawning Grounds",
      5001: "Marooner's Bay",
      5002: "Lost Outpost",
      5003: "Salmonid Smokeyard",
      5004: "Ruins of Ark Polaris",
    },
    languages: {
      lang: "Languages",
      en: "English",
      ja: "Japanese",
      zh: "Chinese",
    },
    text: {
      cancel: "Cancel",
    },
    tabs: {
      results: "Results",
      schedules: "Schedules",
      ranking: "Ranking",
      settings: "Settings",
      home: "Home",
    },
    salmonid: {
      GOLDIE: "Goldie",
      BOMBER: "Steelhead",
      TWINS: "Flyfish",
      SHIELD: "Shield",
      SNAKE: "Steel Eel",
      TOWER: "Tower",
      MAWS: "Maws",
      DOZER: "Griller",
      ROCKET: "Drizzler",
    },
    rank: {
      mode: {
        sum: "Total",
        max: "Best",
        avg: "Average",
      },
      type: {
        worked: "Worked",
        golden: "Golden",
        power: "Power",
      },
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
    stats_type: {
      SALMONID: "オオモノ",
      EGGS: "イクラ",
    },
    stage_name: {
      5000: "シェケナダム",
      5001: "難破船ドン・ブラコ",
      5002: "海上集落シャケト場",
      5003: "トキシラズいぶし工房",
      5004: "朽ちた箱舟 ポラリス",
    },
    languages: {
      lang: "言語",
      en: "英語",
      ja: "日本語",
      zh: "中国語",
    },
    text: {
      cancel: "キャンセル",
    },
    tabs: {
      results: "リザルト",
      schedules: "スケジュール",
      ranking: "ランキング",
      settings: "設定",
      home: "ホーム",
    },
    salmonid: {
      GOLDIE: "キンシャケ",
      BOMBER: "バクダン",
      TWINS: "カタパッド",
      SHIELD: "テッパン",
      SNAKE: "ヘビ",
      TOWER: "タワー",
      MAWS: "モグラ",
      DOZER: "グリル",
      ROCKET: "コウモリ",
    },
    rank: {
      mode: {
        sum: "合計",
        max: "最高",
        avg: "平均",
      },
      type: {
        worked: "バイト",
        golden: "金イクラ",
        power: "イクラ",
      },
    },
  },
};

const locale: string = localStorage.getItem("locale") ?? "en";

const i18n = createI18n({
  legacy: false,
  locale: locale,
  allowComposition: true,
  messages: message,
  fallbackLocale: locale,
  fallbackRoot: true,
  availableLocales: ["en", "ja", "zh"],
});

const app = createApp(App).use(IonicVue).use(router).use(i18n);

router.isReady().then(() => {
  app.mount("#app");
});
