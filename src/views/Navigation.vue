<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/home" href="/home">
          <ion-icon :icon="planet" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="schedules" href="/schedules">
          <ion-icon :icon="list" />
          <ion-label>Schedules</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="ranking" href="/ranking">
          <ion-icon :icon="diamond" />
          <ion-label>Ranking</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon :icon="cog" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { planet, search, diamond, cog, list } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      planet,
      search,
      diamond,
      cog,
      list
    }
  }
});
</script>
