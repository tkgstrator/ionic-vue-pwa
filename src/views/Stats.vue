<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Stats</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopStats />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import CoopStats from '@/components/CoopStats.vue';

export default defineComponent({
  name: 'CoopStatsView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopStats }
});
</script>
