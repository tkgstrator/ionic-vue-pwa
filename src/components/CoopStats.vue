<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, useIonRouter, IonSegment, IonSegmentButton, IonListHeader } from '@ionic/vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import { EventType, WaterLevel, SalmonidType } from './@types/splatnet2';
import { BossCount, ShiftStats, WaveStatsType } from './@types/response.d';
import CoopStatsWave from './CoopStatsWave.vue';
import { useI18n } from 'vue-i18n';
import CoopStatsBossType from './CoopStatsBossType.vue';
import CoopStatsGlobal from './CoopStatsGlobal.vue';

enum StatsType {
  GLOBAL = "GLOBAL",
  SALMONID = 'SALMONID',
  EGGS = 'EGGS'
}

export default defineComponent({
  components: {
    // IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    CoopStatsGlobal
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter();
    const route = useRoute();
    const { start_time } = route.params;
    const shiftstats: Ref<ShiftStats | undefined> = ref();
    const total: Ref<number> = ref(0)
    const waterLevel: Ref<WaterLevel> = ref<WaterLevel>(WaterLevel.NORMAL);
    console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
    console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/stats/${start_time}`;
    fetch(url).then(response => response.json()).then((response: ShiftStats) => {
      console.log(response)
      shiftstats.value = response;
      total.value = response.waves.global.map((value: WaveStatsType) => value.count).reduce((a, b) => a + b);
    });

    return { shiftstats, ionRouter, WaterLevel, EventType, SalmonidType, StatsType, waterLevel, total, t };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    navigation(start_time: string) {
      const schedule_id = dayjs(start_time).unix();
      this.ionRouter.push(`/schedules/${schedule_id}`)
    },
    changeWaterLevel(event: CustomEvent) {
      console.log(event.detail);
    },
    score(eventType: EventType, waterLevel: WaterLevel): WaveStatsType | undefined {
      if (this.shiftstats === undefined) {
        return undefined;
      }
      const eventId: number = Object.values(EventType).indexOf(eventType);
      const waterId: number = Object.values(WaterLevel).indexOf(waterLevel);
      const stats: WaveStatsType | undefined = this.shiftstats.waves.global.find((value) => {
        return value.water_level == waterId && value.event_type == eventId;
      })

      return stats;
    },
    isAvailable(eventType: EventType) {
      if (eventType == EventType.MISSILE && this.waterLevel != WaterLevel.LOW) {
        return false;
      }
      if (eventType == EventType.RUSH && this.waterLevel == WaterLevel.LOW) {
        return false;
      }
      if (eventType == EventType.GEYSER && this.waterLevel == WaterLevel.LOW) {
        return false;
      }
      if (eventType == EventType.GRILLER && this.waterLevel == WaterLevel.LOW) {
        return false;
      }
      return true;
    }
  },
});
</script>

<template>
  <ion-content fullscreen>
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-segment mode="md">
      <template v-for="statsType in Object.values(StatsType)" :key="statsType">
        <ion-segment-button :value="statsType">
          <ion-label>{{ t(`stats_type.${statsType}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
    <CoopStatsGlobal :stats="shiftstats?.stats" />
  </ion-content>
</template>

<style lang="scss" scoped>
ion-label {
  margin: 4px 0;
}

h2 {
  font-size: 12px;
}

h3 {
  font-size: 11px;
}

label {
  font-size: 12px;
}

.coop-schedule {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.coop-schedule-summary {
  width: 40%;
}

.coop-schedule-weapon-list {
  width: 60%;
  max-width: 240px;

  ul {
    display: flex;
    justify-content: right;
    // align-items: right;
    margin: 8px auto;
    width: 100%;
  }
}

li {
  &.coop-schedule-weapon-list-item {
    list-style: none;
    display: inline;
    width: 25%;
    max-width: 60px;

    &:not(:last-child) {
      margin-right: 3px;
    }
  }

}
</style>
