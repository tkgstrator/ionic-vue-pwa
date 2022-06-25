<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, useIonRouter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { TotalRank, Ranking } from './@types/response';

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
    const results: Ref<TotalRank[]> = ref<TotalRank[]>([]);
    return { results, t };
  },
  mounted: function () {
    this.onReload();
  },
  methods: {
    async onReload() {
      const route = useRoute();
      const parameters = {
        "start_time": route.params.start_time.toString(),
        "golden_ikura_num": "120"
      }
      const nightless = Boolean(JSON.parse(route.params.nightless.toLocaleString()));

      const query = new URLSearchParams(parameters);
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/waves?${query}`;
      fetch(url).then(response => response.json()).then((response: Ranking) => {
        this.results = nightless ? response.total.nightless : response.total.night
        console.log(this.results)
      });
    },
    onRefresh(event: CustomEvent) {
      this.onReload().then(() => event.detail.complete());
    },
  },
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list scrollable class="coop-result-list">
      <ion-item v-for="result in results" :key="result.members.toString()" class="coop-result">
        <ion-label>
          <section class="coop-ranking">
            <div class="coop-ranking-summary-team-rank">
              <ion-label>{{ result.rank }}</ion-label>
            </div>
            <div class="coop-ranking-summary-team-members">
              <ul>
                <li v-for="member in result.members" :key="member">
                  <ion-label class="coop-stats-key member">{{ member }}</ion-label>
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

.coop-ranking-summary-team-rank {
  width: 10%;
  font-weight: bold;
}

.coop-ranking-summary-team-members {
  width: 80%;

  ul {
    // display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    column-count: 2
  }

  li {
    font-weight: bold;
  }
}

.coop-ranking-summary-score {
  text-align: right;
  width: 10%;
}

.coop-stats-key {
  margin: 0 !important;
  padding: 0 !important;
}

span {
  font-size: 14px;

  &.golden-ikura {
    color: #ffd700;
    font-weight: bold;
  }
}
</style>
