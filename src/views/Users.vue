<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import CoopUsers from '@/components/CoopUsers.vue';

export default defineComponent({
  name: 'UsersView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopUsers, IonContent }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Salmon Stats</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <CoopUsers />
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
