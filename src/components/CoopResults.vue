<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel } from '@ionic/vue';
import { useI18n } from 'vue-i18n'

interface JobResult {
  failure_reason?: string
  failure_wave?: number
  is_clear: boolean
}

interface Player {
  nsaid: string
  name: string
  grade_point?: number
}

interface Wave {
  event_type: number
  water_level: number
  golden_ikura_num: number
  golden_ikura_pop_num: number
  ikura_num: number
  quota_num: number
}

interface Result {
  salmon_id: number
  job_result: JobResult
  golden_ikura_num: number
  ikura_num: number
  no_night_waves: boolean
  danger_rate: number
  play_time: string
  waves: Wave[]
}

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
  },
  setup() {
    // const locale = localStorage.getItem("locale") ?? "ja"

    // const { t } = useI18n({
    //   locale: locale, messages: {
    //     en: {
    //       water_level: {
    //         HT: "HT",
    //         NT: "NT",
    //         LT: "LT",
    //       },
    //       event_type: {
    //         WATER_LEVELS: "-",
    //         RUSH: "Rush",
    //         GEYSER: "Goldie Seeking",
    //         GRILLER: "Griller",
    //         RALLY: "The Mothership",
    //         FOG: "Fog",
    //         MISSILE: "Cohock Charge",
    //       },
    //     },
    //     ja: {
    //       water_level: {
    //         HT: "満潮",
    //         NT: "通常",
    //         LT: "干潮",
    //       },
    //       event_type: {
    //         WATER_LEVELS: "-",
    //         RUSH: "ラッシュ",
    //         GEYSER: "キンシャケ探し",
    //         GRILLER: "グリル発進",
    //         RALLY: "ハコビヤ襲来",
    //         FOG: "霧",
    //         MISSILE: "ドスコイ大量発生",
    //       },
    //     },
    //   }
    // })
    const { t } = useI18n()
    const results: Ref<Result[]> = ref<Result[]>([]);
    return { results, t };
  },
  mounted: function () {
    this.onReload();
  },
  methods: {
    async onReload() {
      const parameters = {
        "offset": "0",
        "limit": "200",
        "include_details": false.toString(),
        "order": false.toString()
      }
      const query = new URLSearchParams(parameters);
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results?${query}`;
      fetch(url).then(response => response.json()).then(response => {
        this.results = response.results;
        console.log(this.results)
      });
    },
    onRefresh(event: CustomEvent) {
      this.onReload().then(() => event.detail.complete());
    },
    getWaterLevel(water_level: number): string {
      switch (water_level) {
        case 0:
          return this.t("water_level.LT")
        case 1:
          return this.t("water_level.NT")
        case 2:
          return this.t("water_level.HT")
        default:
          return "NT"
      }
    },
    getEventType(event_type: number): string {
      switch (event_type) {
        case 0:
          return this.t("event_type.WATER_LEVELS")
        case 1:
          return this.t("event_type.RUSH")
        case 2:
          return this.t("event_type.GEYSER")
        case 3:
          return this.t("event_type.GRILLER")
        case 4:
          return this.t("event_type.RALLY")
        case 5:
          return this.t("event_type.FOG")
        case 6:
          return this.t("event_type.MISSILE")
        default:
          return "-"
      }
    }
  },
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list class="coop-result-list">
      <ion-item v-for="result in results" :key="result.salmon_id" class="coop-result">
        <ion-label>
          <section class="coop-result-summary">
            <div class="coop-result-job-result">
              <ion-label class="salmon_id">{{ result.salmon_id }}</ion-label>
              <ion-label :class="result.job_result.is_clear ? 'job_clear' : 'job_failure'">{{ result.job_result.is_clear
                  ?
                  "Clear" : "Failure"
              }}</ion-label>
              <ion-label class="danger_rate">{{ result.danger_rate.toFixed(1) }}</ion-label>
            </div>
            <div class="coop-result-job-waves">
              <div class="coop-result-job-waves-golden-ikura">
                <template v-for="wave in result.waves" :key="wave">
                  <ion-label>{{
                      ("00" + wave.golden_ikura_num).slice(-2)
                  }}/{{ wave.quota_num }}</ion-label>
                </template>
              </div>
              <div class="coop-result-job-waves-information">
                <template v-for="wave in result.waves" :key="wave">
                  <ion-label class="wave-information">{{ getWaterLevel(wave.water_level) }} {{
                      getEventType(wave.event_type)
                  }}</ion-label>
                </template>
              </div>
            </div>
            <div class="coop-result-job-detail">
              <ion-label class="num golden_ikura_num">{{ result.golden_ikura_num }}</ion-label>
              <ion-label class="num ikura_num">{{ result.ikura_num }}</ion-label>
            </div>
          </section>
        </ion-label>
        <!-- <ion-label>{{ result.salmon_id }}</ion-label> -->
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<style lang="scss" scoped>
ion-label {
  &.salmon_id {
    color: grey;
    font-size: 12px !important;
  }

  &.job_clear {
    color: #39e464;
    font-weight: bold;
  }

  &.job_failure {
    color: #ff7500;
    font-weight: bold;
  }

  &.danger_rate {
    font-size: 0.75rem !important;

    &::after {
      content: "%";
    }
  }

  &.golden_ikura_num {
    font-size: 0.9rem !important;
    color: #e5f100;
    font-weight: bold;
  }

  &.ikura_num {
    font-size: 0.9rem !important;
    color: #f5873f;
    font-weight: bold;
  }

  &.num {
    &::before {
      content: "x";
    }
  }
}


.coop-result {
  margin: 0 auto;
}

.coop-result-summary {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.coop-result-job-result {
  width: 20%;
  min-width: 60px;
  padding: 2px 4px;
}

.coop-result-job-waves {
  width: 100%;
  display: flex;
  padding: 2px 4px;

  .coop-result-job-waves-golden-ikura {
    // width: 100%;
    padding-right: 10px;
    text-align: right;
  }
}

.coop-result-job-detail {
  width: 14%;
  padding: 2px 4px;
  text-align: right;
}

.wave-information {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
