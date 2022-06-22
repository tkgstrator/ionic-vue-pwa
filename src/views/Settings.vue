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
          <ion-label>{{ t("languages.lang") }}</ion-label>
          <ion-toggle slot="end" v-bind:model-value="langToggle" name="langToggle"
            v-on:ion-change="toggleLocale($event)">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem, IonToggle, IonList, IonContent } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonLabel, IonItem, IonToggle, IonList, IonContent },
  setup() {
    const localeText: string = localStorage.getItem("locale") ?? "en"
    const langToggle: Ref<boolean> = ref(localeText == "en");
    const { t, availableLocales, locale } = useI18n()
    return { langToggle, t, locale }
  },
  mounted() {
    console.log("mounted")
  },
  methods: {
    toggleLocale(event: CustomEvent) {
      this.locale = event.detail.checked ? "en" : "ja"
      localStorage.setItem("locale", this.locale);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
