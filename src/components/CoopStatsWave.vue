<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { TotalStats, TotalStatsType, WaveStats, WaveStatsType } from './@types/response';
import { useI18n } from 'vue-i18n';
import { EventType, WaterLevel } from './@types/splatnet2';

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonProgressBar,
    IonListHeader
  },
  setup() {
    const { t } = useI18n()
    return { EventType, WaterLevel, t };
  },
  props: {
    'stats': Object as () => WaveStats,
    'total': Object as () => TotalStats
  },
  methods: {
    getEventScore(water_level: number, event_type: number): { golden_ikura_num: number, ikura_num: number, count: number, prob: number } {
      if (this.stats === undefined) {
        return { golden_ikura_num: 0, ikura_num: 0, count: 0, prob: 0 }
      }
      const wave: WaveStatsType = this.stats.global.filter((wave: WaveStatsType) => wave.water_level === water_level && wave.event_type === event_type)[0]
      if (wave === undefined) {
        return { golden_ikura_num: 0, ikura_num: 0, count: 0, prob: 0 }
      }
      const count: number = this.stats.global.map((value: WaveStatsType) => value.count).reduce((a, b) => a + b);
      return { golden_ikura_num: wave.max.golden_ikura_num, ikura_num: wave.max.ikura_num, count: wave.count, prob: wave.count / count }
    },
    getTotalScore(nightLess: boolean): { golden_ikura_num: number, ikura_num: number, count: number, prob: number } {
      if (this.total === undefined) {
        return { golden_ikura_num: 0, ikura_num: 0, count: 0, prob: 0 }
      }
      const index: number = nightLess ? 0 : 1
      const count: number = this.total.global.map((value: TotalStatsType) => value.count).reduce((a, b) => a + b);
      return {
        golden_ikura_num: this.total.global[index].max.golden_ikura_num,
        ikura_num: this.total.global[index].max.ikura_num,
        count: this.total.global[index].count,
        prob: this.total.global[index].count / count
      }
    },
    isAvailable(waterId: number, eventId: number): boolean {
      if (waterId !== 0 && eventId === 6) {
        return false
      }
      if (waterId == 0 && eventId <= 3 && eventId >= 1) {
        return false
      }
      return true
    }
  },
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.GLOBAL") }}</ion-list-header>
    <template v-for="nightLess in [true, false]" :key="nightLess">
      <ion-item>
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ nightLess ? t("total.night_less") : t("total.night") }}</ion-label>
            <ion-progress-bar :value="getTotalScore(nightLess).prob">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ (getTotalScore(nightLess).prob * 100).toFixed(3) }}</ion-label>
          </div>
          <div class="coop-stats-value-list">
            <ion-label class="coop-stats-value num golden-ikura">{{ getTotalScore(nightLess).golden_ikura_num }}
            </ion-label>
            <ion-label class="coop-stats-value num ikura">{{ getTotalScore(nightLess).ikura_num }}</ion-label>
          </div>
        </section>
      </ion-item>
    </template>
    <template v-for="(waterLevel, waterId) in Object.values(WaterLevel)" :key="waterId">
      <ion-list-header>{{ t(`water_level.${waterLevel}`) }}</ion-list-header>
      <template v-for="(eventType, eventId) in Object.values(EventType)" :key="eventId">
        <ion-item v-if="isAvailable(waterId, eventId)">
          <section>
            <div class="coop-stats-progress-bar">
              <ion-label class="coop-stats-key">{{ t(`event_type.${eventType}`) }}</ion-label>
              <ion-label class="coop-stats-key prob">{{ (getEventScore(waterId, eventId).prob * 100).toFixed(3) }}
              </ion-label>
            </div>
            <div class="coop-stats-value-list">
              <ion-label class="coop-stats-value num golden-ikura">{{ getEventScore(waterId, eventId).golden_ikura_num
              }}</ion-label>
              <ion-label class="coop-stats-value num ikura">{{ getEventScore(waterId, eventId).ikura_num }}</ion-label>
            </div>
          </section>
        </ion-item>
      </template>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;

  .coop-stats-key {
    width: 70%;
    margin-left: 4px !important;
  }

  .coop-stats-progress-bar {
    width: 70%;
  }

  .coop-stats-value-list {
    margin-top: auto !important;
    margin-bottom: auto !important;
    margin-right: 0 !important;
    height: 100% !important;
    width: 30%;
    text-align: right;
  }

  .coop-stats-value {
    margin-top: auto !important;
    margin-bottom: auto !important;
    margin-right: 0 !important;
    height: 100% !important;
    font-size: 1rem !important;
  }
}

ion-list {
  padding: 0 !important;
}
</style>

