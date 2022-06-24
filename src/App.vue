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
  margin: 6px auto;
}

ion-label {
  font-size: 0.8rem !important;
  font-family: "Noto Sans JP" !important;
  margin: 0 auto !important;
}

* {
  font-family: "Noto Sans JP";
  color: #ccc;
}

.num {
  &::before {
    content: "x";
    padding-right: 2px;
  }
}

.prob {
  color: grey !important;

  &::after {
    content: "%";
    padding-left: 2px;
  }
}

ion-label {
  font-size: 0.8rem !important;

  &.ikura {
    color: #f5873f !important;
    font-weight: bold;
  }

  &.golden-ikura {
    color: #e5f100 !important;
    font-weight: bold;
  }
}
</style>
