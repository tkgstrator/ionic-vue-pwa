<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ranking</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopStatsRanking />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, } from '@ionic/vue';
import CoopStatsRanking from '@/components/CoopStatsRanking.vue';

export default defineComponent({
  name: 'RankingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopStatsRanking },
});
</script>
