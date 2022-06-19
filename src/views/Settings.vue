<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage }
});
</script>
