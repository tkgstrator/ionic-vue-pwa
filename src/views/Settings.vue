<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonTitle } from '@ionic/vue';
import Version from '@/components/Version.vue';
import ServerInfo from '../components/ServerInfo.vue';
import Appearances from '@/components/Appearances.vue';
import Description from '@/components/Description.vue';

export default defineComponent({
  name: 'SettingView',
  components: { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonTitle, Version, ServerInfo, Appearances, Description },
  setup() {
    return {}
  },
  methods: {
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
        <Appearances />
        <Description />
        <Version />
        <ServerInfo />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
