<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Salmon Stats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <CoopResults />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
// import ExploreContainer from '@/components/ExploreContainer.vue';
import CoopResults from '@/components/CoopResults.vue';

export default defineComponent({
  name: 'HomeView',
  components: { CoopResults, IonHeader, IonToolbar, IonTitle, IonPage }
});
</script>
