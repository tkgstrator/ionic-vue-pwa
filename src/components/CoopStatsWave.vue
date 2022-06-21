<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, useIonRouter, IonSegment, IonSegmentButton, IonListHeader } from '@ionic/vue';

export default defineComponent({
  components: {
  },
  setup() {
    return {};
  },
  props: {
    // 'result': WaveStatsType
  },
  methods: {},
});
</script>

<template>
  <!-- <ion-list-header>{{ eventType }}</ion-list-header> -->
  <ion-item>
    <!-- <ion-label>{{ score(eventType, waterLevel).max }}</ion-label> -->
    <ion-img></ion-img>
  </ion-item>
</template>
