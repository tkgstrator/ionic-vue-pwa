<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/results" href="/results">
          <ion-icon :icon="planet" />
          <ion-label>{{ t("tabs.results") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="schedules" href="/schedules">
          <ion-icon :icon="list" />
          <ion-label>{{ t("tabs.schedules") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="ranking" href="/ranking">
          <ion-icon :icon="diamond" />
          <ion-label>{{ t("tabs.ranking") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/settings">
          <ion-icon :icon="cog" />
          <ion-label>{{ t("tabs.settings") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { planet, search, diamond, cog, list } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    const { t } = useI18n()
    return {
      planet,
      search,
      diamond,
      cog,
      list,
      t
    }
  }
});
</script>
