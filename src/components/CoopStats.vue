<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonRefresher, IonContent, IonRefresherContent, IonLabel, useIonRouter, IonSegment, IonSegmentButton } from '@ionic/vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import { EventType, WaterLevel, SalmonidType } from './@types/splatnet2';
import { useI18n } from 'vue-i18n';
import CoopStatsGlobal from './CoopStatsGlobal.vue';
import CoopStatsBossType from './CoopStatsBossType.vue';
import CoopStatsWave from './CoopStatsWave.vue';
import CoopStatsWeapons from './CoopStatsWeapons.vue';
import CoopStatsGrade from './CoopStatsGrade.vue';

enum StatsType {
  GLOBAL = "GLOBAL",
  SALMONID = 'SALMONID',
  WEAPONS = 'WEAPONS',
  GRADE = 'GRADE',
  EGGS = 'EGGS'
}

export default defineComponent({
  components: {
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    CoopStatsGlobal,
    CoopStatsBossType,
    CoopStatsGrade,
    CoopStatsWave
  },
  setup() {
    const { t } = useI18n()
    const statsType: Ref<StatsType> = ref(StatsType.GLOBAL)
    const total: Ref<number> = ref(0)
    const waterLevel: Ref<WaterLevel> = ref<WaterLevel>(WaterLevel.NORMAL);

    return { statsType, StatsType, waterLevel, total, t };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    onStatsTypeChanged(event: CustomEvent) {
      console.log(event.detail.value)
      this.statsType = event.detail.value
    },
  },
});
</script>

<template>
  <ion-content fullscreen>
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-segment mode="md" @ionChange="onStatsTypeChanged($event)" :value="statsType" scrollable>
      <template v-for="statsType in Object.values(StatsType)" :key="statsType">
        <ion-segment-button :value="statsType">
          <ion-label>{{ t(`stats_type.${statsType}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
    <CoopStatsGlobal v-show="statsType == StatsType.GLOBAL" />
    <CoopStatsBossType v-show="statsType == StatsType.SALMONID" />
    <CoopStatsGrade v-show="statsType == StatsType.GRADE" />
    <!-- <CoopStatsWeapons v-show="statsType == StatsType.WEAPONS" /> -->
    <CoopStatsWave v-show="statsType == StatsType.EGGS" />
  </ion-content>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
