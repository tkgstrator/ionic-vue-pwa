<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import CoopPlayers from '@/components/CoopPlayers.vue';

export default defineComponent({
  name: 'ResultView',
  components: { CoopPlayers, IonHeader, IonToolbar, IonTitle, IonPage }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Player</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopPlayers />
  </ion-page>
</template>
