<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem, IonList, IonContent, IonSelect, IonToggle, IonSelectOption, IonListHeader, IonAvatar } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

interface Version {
  version: string
  author: string
}

interface Result {
  version: string
}

interface Lookup {
  results: Result[]
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonToggle, IonItem, IonList, IonContent, IonSelect, IonSelectOption, IonLabel, IonAvatar, IonListHeader },
  setup() {
    const apiVersion: Ref<string> = ref("")
    const appiOSVersion: Ref<string> = ref("1.0.6")
    const appMdVersion: Ref<string> = ref("")
    const appVersion: string = process.env.VUE_APP_VERSION
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/versions`;
    fetch(url).then(response => response.json()).then((response: Version) => {
      apiVersion.value = response.version
    });
    const lang: string = localStorage.getItem("locale") ?? "en"
    const { t, availableLocales, locale } = useI18n()

    const toggleValue: boolean = (() => {
      console.log("Local", localStorage.getItem("color-scheme"))
      // ローカルに保存されていなければ現在のデバイスの設定を取得
      const colorScheme: string = localStorage.getItem("color-scheme") ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      console.log(colorScheme)
      return colorScheme === 'dark'
    })()

    return {
      t, locale, lang, availableLocales, apiVersion, appVersion, appiOSVersion, appMdVersion, toggleValue
    }
  },
  methods: {
    onChange(event: CustomEvent) {
      this.locale = event.detail.value
      localStorage.setItem("locale", this.locale);
    },
    onChangeTheme(event: CustomEvent) {
      localStorage.setItem("color-scheme", event.detail.checked ? 'dark' : 'light');
      // ダークモードとライトモード切り替え
      document.body.classList.toggle('dark', event.detail.checked);
      document.body.classList.toggle('light', !event.detail.checked);
    },
  }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>{{ t("text.appearances") }}</ion-list-header>
        <ion-item>
          <ion-label slot="start">{{ t("appearances.darkMode") }}</ion-label>
          <ion-toggle slot="end" v-on:ion-change="onChangeTheme($event)" :checked="toggleValue">{{ t('text.version.app')
          }}</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label slot="start">{{ t('languages.lang') }}</ion-label>
          <ion-select slot="end" interface="action-sheet" :placeholder="t(`languages.${lang}`)" mode="ios"
            :cancel-text="t('text.cancel')" v-on:ion-change="onChange($event)">
            <template v-for="locale in availableLocales" :key="locale">
              <ion-select-option :value="locale">{{ t(`languages.${locale}`) }}</ion-select-option>
            </template>
          </ion-select>
        </ion-item>
        <ion-list-header>{{ t("text.version.version") }}</ion-list-header>
        <ion-item>
          <ion-label slot="start">{{ t('text.version.app') }}</ion-label>
          <ion-label slot="end" class="version">{{ appVersion }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label slot="start">{{ t('text.version.api') }}</ion-label>
          <ion-label slot="end" class="version">{{ apiVersion }}</ion-label>
        </ion-item>
        <ion-list-header>{{ t("text.uploader") }}</ion-list-header>
        <ion-item>
          <p class="description">In order to upload results to Salmon Stats, you will need to use the following app,
            which is compatible with both iPhone and Android.
          </p>
        </ion-item>
        <ion-item button>
          <ion-avatar slot="start">
            <img
              src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
          </ion-avatar>
          <ion-label slot="start" color="danger"><a
              href="itms-beta://testflight.apple.com/join/dVMPIN8o">Salmonia3/iOS</a></ion-label>
          <ion-label slot="end" class="version">{{ appiOSVersion }}</ion-label>
        </ion-item>
        <ion-item button>
          <ion-avatar slot="start">
            <img
              src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
          </ion-avatar>
          <ion-label slot="start" color="danger"><a
              href="https://github.com/SalmonStats/sinclair/releases">Sinclair/Android</a></ion-label>
          <ion-label slot="end" class="version">0.0.4</ion-label>
        </ion-item>
        <ion-item>
          <p class="description">Salmon Stats is an open-source Splatoon 2 Salmon Run statistics website developed by
            <a href="https://twitter.com/tkgling">@tkgling</a>. All of
            source code including Website, server, client are fully public on <a
              href="https://github.com/SalmonStats">GitHub</a>. Moreover, the documents of API is
            published in <a href="https://salmonstats.github.io/api">GitHub pages</a>, you could build own
            applications, website, tool as long as they are based on <a
              href="https://choosealicense.com/licenses/mit">MIT License</a>.
          </p>

        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";

.version {
  font-size: 1.0rem !important;
}
</style>
