<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel, IonItem, IonSelect, IonToggle, IonListHeader, IonSelectOption } from '@ionic/vue';
import { useI18n } from "vue-i18n";

enum Languages {
  EN = "en",
  JP = "jp",
  ZH = "zh"
}
export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonToggle, IonLabel, IonSelect, IonSelectOption },
  setup() {
    const { t, availableLocales, locale } = useI18n()

    // 現在設定されている言語文字列
    const currentLang: string = localStorage.getItem("locale") ?? 'en'
    // 特に意味もなくEnumに変換
    const lang: Languages = Object.values(Languages).find(lang => lang === currentLang) || Languages.EN

    console.log(`Current: ${currentLang}, Locale: ${locale.value},  Available: ${availableLocales.join(', ')}`)
    const toggleValue: boolean = (() => {
      console.log("Local", localStorage.getItem("color-scheme"))
      // ローカルに保存されていなければ現在のデバイスの設定を取得
      const colorScheme: string = localStorage.getItem("color-scheme") ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      console.log(colorScheme)
      return colorScheme === 'dark'
    })()

    return { t, toggleValue, availableLocales, lang, locale, currentLang }
  },
  methods: {
    onChangeTheme(event: CustomEvent) {
      localStorage.setItem("color-scheme", event.detail.checked ? 'dark' : 'light');
      // ダークモードとライトモード切り替え
      document.body.classList.toggle('dark', event.detail.checked);
      document.body.classList.toggle('light', !event.detail.checked);
    },
    onChange(event: CustomEvent) {
      // 指定された値に言語切替
      this.locale = event.detail.value
      localStorage.setItem("locale", event.detail.value)
    }
  }
});
</script>

<template>
  <ion-list-header>{{ t("app.appearances") }}</ion-list-header>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("appearances.dark_mode") }}</ion-label>
    <ion-toggle slot="end" v-on:ion-change="onChangeTheme($event)" :checked="toggleValue">{{ t('app.version')
    }}</ion-toggle>
  </ion-item>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("appearances.languages") }}</ion-label>
    <ion-select slot="end" interface="action-sheet" :placeholder="t(`languages.${currentLang}`)" mode="ios"
      :cancel-text="t('messages.cancel')" v-on:ion-change="onChange($event)">
      <template v-for="lang in availableLocales" :key="lang">
        <ion-select-option :value="lang">{{ t(`languages.${lang}`) }}</ion-select-option>
      </template>
    </ion-select>
  </ion-item>
</template>
