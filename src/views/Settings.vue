<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>{{ t('languages.lang') }}</ion-label>
          <ion-select interface="action-sheet" :placeholder="t(`languages.${lang}`)" mode="ios"
            :cancel-text="t('text.cancel')" v-on:ion-change="onChange($event)">
            <template v-for="locale in availableLocales" :key="locale">
              <ion-select-option :value="locale">{{ t(`languages.${locale}`) }}</ion-select-option>
            </template>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label slot="start">{{ t('text.version.app') }}</ion-label>
          <ion-label slot="end" class="version">{{ appVersion }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label slot="start">{{ t('text.version.api') }}</ion-label>
          <ion-label slot="end" class="version">{{ apiVersion }}</ion-label>
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

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem, IonList, IonContent, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

interface Version {
  version: string
  author: string
}

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonItem, IonList, IonContent, IonSelect, IonSelectOption, IonLabel },
  setup() {
    const apiVersion: Ref<string> = ref("")
    const appVersion: string = process.env.VUE_APP_VERSION
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/versions`;
    fetch(url).then(response => response.json()).then((response: Version) => {
      apiVersion.value = response.version
    });
    const lang: string = localStorage.getItem("locale") ?? "en"
    const { t, availableLocales, locale } = useI18n()
    return {
      t, locale, lang, availableLocales, apiVersion, appVersion
    }
  },
  methods: {
    onChange(event: CustomEvent) {
      this.locale = event.detail.value
      localStorage.setItem("locale", this.locale);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../theme/styles.scss";

.version {
  font-size: 1.0rem !important;
}
</style>
