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
          <ion-label>{{ 0 }}</ion-label>
          <ion-toggle slot="end" v-bind:model-value="toggle" name="toggle" v-on:ion-change="toggleLocale($event)">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem, IonToggle, IonList, IonContent } from '@ionic/vue';

enum LocaleType {
  en = "en",
  ja = "ja"
}

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonLabel, IonItem, IonToggle, IonList, IonContent },
  setup() {
    const index: number = Object.keys(LocaleType).indexOf(localStorage.getItem("locale") ?? LocaleType.en)
    const toggle: Ref<boolean> = ref<boolean>(index == 0)
    // const locale: Ref<LocaleType> = ref(Object.values(LocaleType)[index]);

    return { toggle }
  },
  mounted() {
    console.log("mounted")
  },
  methods: {
    toggleLocale(event: CustomEvent) {
      localStorage.setItem("locale", event.detail.checked ? "en" : "ja")
      this.toggle = event.detail.checked
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
