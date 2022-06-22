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
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem, IonList, IonContent, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonItem, IonList, IonContent, IonSelect, IonSelectOption, IonLabel },
  setup() {
    const lang: string = localStorage.getItem("locale") ?? "en"
    const { t, availableLocales, locale } = useI18n()
    return {
      t, locale, lang, availableLocales
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
</style>
