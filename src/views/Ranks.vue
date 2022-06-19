<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ranking</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopRanking />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import CoopRanking from '@/components/CoopRanking.vue';

export default defineComponent({
  name: 'RankView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopRanking }
});
</script>
