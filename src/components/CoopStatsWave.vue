<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader, useIonRouter } from '@ionic/vue';
import { Ranking, TotalRank, TotalStats, TotalStatsType, WaveStats, WaveStatsType } from './@types/response';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
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
    const ionRouter = useIonRouter();
    const route = useRoute()
    const { start_time } = route.params
    const totals: Ref<TotalRank[][]> = ref<TotalRank[][]>([[], []]);
    const waves: Ref<TotalRank[][][]> = ref<TotalRank[][][]>([
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
      [[], [], [], [], [], [], []],
    ]);
    console.log(waves.value)
    return { EventType, WaterLevel, ionRouter, start_time, totals, waves, t };
  },
  beforeMount() {
    this.onReload();
  },
  methods: {
    onReload() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/waves/${this.start_time}`;
      fetch(url).then(response => response.json()).then((response: Ranking) => {
        this.totals = response.total;
        this.waves = response.waves
      });
    }
  }
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.GLOBAL") }}</ion-list-header>
    <template v-for="(type, index) in ['night', 'nightless']" :key="type">
      <ion-item button v-on:click="ionRouter.push(`${start_time}/${type}`)" mode="md" v-if="totals[index].length !== 0">
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ t(`total.${type}`) }}</ion-label>
            <ion-progress-bar :value="0">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ }}</ion-label>
          </div>
          <div class="coop-stats-value-list">
            <ion-label class="num golden-ikura">{{ totals[index][0].golden_ikura_num }}</ion-label>
            <ion-label class="num ikura">{{ }}</ion-label>
          </div>
        </section>
      </ion-item>
    </template>
    <template v-for="(waterLevel, waterId) in Object.values(WaterLevel)" :key="waterId">
      <ion-list-header>{{ t(`water_level.${waterLevel}`) }}</ion-list-header>
      <template v-for="(eventType, eventId) in Object.values(EventType)" :key="eventId">
        <ion-item button v-on:click="ionRouter.push(`${start_time}/waves?event_type=${eventId}&water_level=${waterId}`)"
          v-if="waves[waterId][eventId] !== null">
          <section>
            <div class="coop-stats-progress-bar">
              <ion-label class="coop-stats-key">{{ t(`event_type.${eventType}`) }}</ion-label>
              <ion-label class="coop-stats-key prob">{{ }}
              </ion-label>
            </div>
            <div class="coop-stats-value-list">
              <ion-label class="num golden-ikura">{{ waves[waterId][eventId] === null ? null :
                  waves[waterId][eventId][0].golden_ikura_num
              }}</ion-label>
              <ion-label class="num ikura">{{ }}</ion-label>
            </div>
          </section>
        </ion-item>
      </template>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>

