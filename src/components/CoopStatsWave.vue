<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader, useIonRouter } from '@ionic/vue';
import { LegacyStats, Ranking, TotalRank, WaveResult } from './@types/response';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { EventType, WaterLevel } from './@types/splatnet2';

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    // IonProgressBar,
    IonListHeader
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter();
    const route = useRoute()
    const { start_time } = route.params
    const waves: Ref<WaveResult[][]> = ref<WaveResult[][]>([])
    return { EventType, WaterLevel, ionRouter, start_time, waves, t };
  },
  mounted: function () {
    console.log("WaveView Mounted")
    this.onLoad()
  },
  created: function () {
    console.log("WaveView Created")
  },
  methods: {
    onLoad() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/stats/${this.start_time}`;
      fetch(url).then(response => response.json()).then((response: LegacyStats) => {
        this.waves = response.wave_results
        console.log(this.waves)
      });
    }
  }
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.EGGS") }}</ion-list-header>
    <!-- <template v-for="(type, index) in ['night', 'nightless']" :key="type">
      <ion-item button v-on:click="ionRouter.push(`${start_time}/${type}`)" mode="md">
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ t(`total.${type}`) }}</ion-label>
            <ion-progress-bar :value="0">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ }}</ion-label>
          </div>
          <div class="coop-stats-value-list">
            <ion-label class="num golden-ikura">{{ index }}</ion-label>
            <ion-label class="num ikura">{{ }}</ion-label>
          </div>
        </section>
      </ion-item>
    </template> -->
    <template v-for="(waterLevel, waterId) in Object.values(WaterLevel).reverse()" :key="waterId">
      <template v-if="waves[waterId]">
        <ion-list-header>{{ t(`water_level.${waterLevel}`) }}</ion-list-header>
        <template v-for="(eventType, eventId) in Object.values(EventType)" :key="eventId">
          <template v-if="waves[2 - waterId][eventId]">
            <ion-item button
              v-on:click="ionRouter.push(`${start_time}/waves?event_type=${eventId}&water_level=${waterId}`)">
              <section>
                <div class="coop-stats-progress-bar">
                  <ion-label class="coop-stats-key">{{ t(`event_type.${eventType}`) }}</ion-label>
                  <ion-label class="coop-stats-key prob">{{ }}
                  </ion-label>
                </div>
                <div class="coop-stats-value-list">
                  <ion-label class="num golden-ikura">{{ waves[2 - waterId][eventId].golden_ikura_num }}</ion-label>
                  <ion-label class="num ikura">{{ waves[2 - waterId][eventId].ikura_num }}</ion-label>
                </div>
              </section>
            </ion-item>
          </template>
        </template>
      </template>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>

