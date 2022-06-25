<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <CoopStatsRanking />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, } from '@ionic/vue';
import CoopStatsRanking from '@/components/CoopStatsRanking.vue';
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'RankingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, CoopStatsRanking },
  setup() {
    const route = useRoute();
    const { t } = useI18n()
    console.log(route.params)
    const title = JSON.parse(route.params.nightless.toString()) ? t("total.night_less") : t("total.night");

    return { title, t };
  },
});
</script>
