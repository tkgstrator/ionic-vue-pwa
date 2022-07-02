<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { TotalRank, Ranking, WaveResult } from './@types/response';

export default defineComponent({
  components: {
    IonLabel,
    IonItem,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
  },
  setup() {
    const { t } = useI18n()
    const results: Ref<WaveResult[]> = ref<WaveResult[]>([]);
    return { t, results };
  },
  mounted: function () {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      const route = useRoute()
      const { start_time } = route.params
      const waterLevel: number = (() => {
        if (route.query.water_level === null) {
          return 0
        }
        return parseInt(route.query.water_level as string)
      })()
      const eventType: number = (() => {
        if (route.query.event_type === null) {
          return 0
        }
        return parseInt(route.query.event_type as string)
      })()
      const nightless: boolean | null = (() => {
        if (route.params.nightless === undefined) {
          return null
        }
        return route.params.nightless === 'nightless'
      })()
      console.log(eventType, waterLevel, nightless);
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/waves/${start_time}?water_level=${waterLevel}&event_type=${eventType}`;
      const headers = {
        "cache-control": "force-cache; max-age=600",
      }
      fetch(url, { headers: headers }).then(response => response.json()).then((response: WaveResult[]) => {
        this.results = response;
      });
    },
    onRefresh(event: CustomEvent) {
      this.onLoad().then(() => event.detail.complete());
    },
  },
});
</script>

<template>
  <ion-content fullscreen>
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list scrollable class="coop-result-list">
      <ion-item v-for="result in results" :key="result.rank" class="coop-result">
        <ion-label>
          <section class="coop-ranking">
            <div class="coop-ranking-summary-rank">
              <ion-label>{{ result.rank }}</ion-label>
            </div>
            <div class="coop-ranking-summary-team-members">
              <ul class="coop-ranking-members">
                <li v-for="member in result.names" :key="member">
                  <ion-label class="member">{{ member }}</ion-label>
                </li>
              </ul>
            </div>
            <div class="coop-ranking-summary-score">
              <span class="golden-ikura num golden-ikura">{{ result.golden_ikura_num }}</span>
            </div>
          </section>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
