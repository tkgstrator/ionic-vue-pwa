<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style lang="scss">
ion-item {
  min-width: 340px;
  max-width: 440px !important;
  margin: 0 auto;
}

ion-label {
  font-size: 0.8rem !important;
  font-family: "Noto Sans JP" !important;
  margin: 0 auto !important;
}

* {
  font-family: "Noto Sans JP";
}
</style>
