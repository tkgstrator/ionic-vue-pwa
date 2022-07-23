<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, toastController } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonLabel,
  },
  setup() {
    const { t } = useI18n()
    const results: Ref<Result[]> = ref<Result[]>([]);
    return { results, t };
  },
  mounted: function () {
    this.onReload();
  },
  props: {
    nsaid: {
      type: String,
      required: false
    },
  },
  methods: {
    async onReload() {
      console.log("Results: =>", this.nsaid)
      const url: string = (() => {
        return this.nsaid === undefined
          ? `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results`
          : `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results?nsaid=${this.nsaid}`
      })()
      fetch(url).then(response => response.json()).then(response => {
        if (this.results.length !== 0) {
          const currentSalmonId: number = this.results[0].salmon_id
          this.openToast(this.results[0].salmon_id - currentSalmonId);
        }
        this.results = response.results;
      });
    },
    async openToast(diff: number) {
      const toast = await toastController.create({
        message: this.t('message.new_results', { salmon_id: diff }),
        duration: 2500
      });
      return toast.present();
    },
    onRefresh(event: CustomEvent) {
      this.onReload().then(() => event.detail.complete());
    },
    getWaterLevel(water_level: number): string {
      switch (water_level) {
        case 0:
          return this.t("water_level.low")
        case 1:
          return this.t("water_level.normal")
        case 2:
          return this.t("water_level.high")
        default:
          return this.t("water_level.normal")
      }
    },
    getEventType(event_type: number): string {
      switch (event_type) {
        case 0:
          return this.t("event_type.water_levels")
        case 1:
          return this.t("event_type.rush")
        case 2:
          return this.t("event_type.goldie_seeking")
        case 3:
          return this.t("event_type.griller")
        case 4:
          return this.t("event_type.the_mothership")
        case 5:
          return this.t("event_type.fog")
        case 6:
          return this.t("event_type.cohock_charge")
        default:
          return this.t("event_type.water_levels")
      }
    }
  },
});
</script>

<template>
  <ion-refresher slot="fixed" :pull-factor="0.5" @ionRefresh="onRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-list class="coop-result-list">
    <ion-item v-for="result in results" :key="result.salmon_id" class="coop-result">
      <ion-label>
        <section class="coop-result-summary">
          <div class="coop-result-job-result">
            <ion-label class="salmon_id">{{ result.salmon_id }}</ion-label>
            <ion-label :class="result.job_result.is_clear ? 'job_clear' : 'job_failure'">
              {{ result.job_result.is_clear
                  ?
                  t("result.is_clear") : t("result.is_failure")
              }}</ion-label>
            <ion-label class="danger_rate">
              {{ result.danger_rate.toFixed(1) }}
            </ion-label>
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
            <ion-label class="num golden_ikura_num">
              {{ result.golden_ikura_num }}
            </ion-label>
            <ion-label class="num ikura_num">
              {{ result.ikura_num }}
            </ion-label>
          </div>
        </section>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<style lang="scss">
@import "../theme/styles.scss";
</style>
