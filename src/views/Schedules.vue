<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Schedules</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopSchedules />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import CoopSchedules from '@/components/CoopSchedules.vue';

export default defineComponent({
  name: 'ScheduleView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopSchedules }
});
</script>
