<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const isDarkMode: boolean = (() => {
      // ローカルに保存されていなければ現在のデバイスの設定を取得
      const colorScheme: string = localStorage.getItem("color-scheme") ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      return colorScheme === 'dark'
    })()
    document.body.classList.toggle(isDarkMode ? 'dark' : 'light', true);
    return {}
  }
});
</script>

<style lang="scss">
@import "theme/styles.scss";
</style>
