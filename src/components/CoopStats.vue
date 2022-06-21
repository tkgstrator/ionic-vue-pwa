<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, useIonRouter, IonSegment, IonSegmentButton, IonListHeader } from '@ionic/vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
import { EventType, WaterLevel } from 'types/enum.d';
import { ShiftStats, WaveStatsType } from 'types/response.d';
import CoopStatsWave from './CoopStatsWave.vue';

const StageType: { [name: number]: string } = {
  5000: "https://app.splatoon2.nintendo.net/images/coop_stage/65c68c6f0641cc5654434b78a6f10b0ad32ccdee.png",
  5001: "https://app.splatoon2.nintendo.net/images/coop_stage/e07d73b7d9f0c64e552b34a2e6c29b8564c63388.png",
  5002: "https://app.splatoon2.nintendo.net/images/coop_stage/6d68f5baa75f3a94e5e9bfb89b82e7377e3ecd2c.png",
  5003: "https://app.splatoon2.nintendo.net/images/coop_stage/e9f7c7b35e6d46778cd3cbc0d89bd7e1bc3be493.png",
  5004: "https://app.splatoon2.nintendo.net/images/coop_stage/50064ec6e97aac91e70df5fc2cfecf61ad8615fd.png",
};

export default defineComponent({
  components: {
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    CoopStatsWave,
  },
  setup() {
    const ionRouter = useIonRouter();
    const route = useRoute();
    const { start_time } = route.params;
    const stats: Ref<ShiftStats> = ref<ShiftStats>();
    const waterLevel: Ref<WaterLevel> = ref<WaterLevel>(WaterLevel.NORMAL);
    console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
    console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/stats/${start_time}`;
    fetch(url).then(response => response.json()).then(response => {
      stats.value = response;
    });

    return { stats, StageType, StageName, WeaponType, ionRouter, WaterLevel, EventType, waterLevel };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    weaponURL(weapon_id: number): string {
      return `https://app.splatoon2.nintendo.net/images/weapons/${weapon_id}`;
    },
    navigation(start_time: string) {
      const schedule_id = dayjs(start_time).unix();
      this.ionRouter.push(`/schedules/${schedule_id}`)
    },
    changeWaterLevel(event: CustomEvent) {
      console.log(event);
    },
    score(eventType: EventType, waterLevel: WaterLevel): WaveStatsType | null {
      const eventId: number = Object.values(EventType).indexOf(eventType);
      const waterId: number = Object.values(WaterLevel).indexOf(waterLevel);
      // const stats: WaveStatsType | undefined = this.stats.waves.global.find((value) {
      //   return value.water_level == waterId && value.event_type == eventId;
      // })
      // console.log(stats);
      return null;
    }
  },
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-segment mode="md" @ionChange="changeWaterLevel($event)" :value="waterLevel" v-model="waterLevel">
      <ion-segment-button :value="WaterLevel.HIGH">
        <ion-label>High</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="WaterLevel.NORMAL">
        <ion-label>Normal</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="WaterLevel.LOW">
        <ion-label>Low</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-list scrollable mode="ios" v-if="stats !== undefined">
      <CoopStatsWave />
      <!-- <template v-for="eventType in Object.values(EventType)">
</template> -->
    </ion-list>
  </ion-content>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

ion-label {
  margin: 4px 0;
}

#app {
  font-family: 'Noto Sans JP' !important;
}

h2,
h3 {
  font-family: 'Noto Sans JP' !important;
}

h2 {
  font-size: 12px;
}

h3 {
  font-size: 11px;
}

label {
  font-family: 'Noto Sans JP' !important;
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
