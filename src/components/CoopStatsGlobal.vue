<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { LegacyStats } from './@types/response';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    IonListHeader,
    IonProgressBar,
    IonLabel,
    IonItem,
    IonList
  },
  setup() {
    const { t } = useI18n()
    return { t };
  },
  props: {
    'stats': Object as () => LegacyStats
  },
  methods: {
    getJobClearRatio(): number {
      if (this.stats === undefined) {
        return 0;
      }
      const isClear: number = this.stats.job_result.is_clear.count
      const isFailure: number = this.stats.job_result.is_failure.count
      return isClear / (isClear + isFailure)
    },
    getJobCounts(): number {
      if (this.stats === undefined) {
        return 0;
      }
      const isClear: number = this.stats.job_result.is_clear.count
      const isFailure: number = this.stats.job_result.is_failure.count
      return (isClear + isFailure)
    },
    getJobFailureReason(wave_id: number): { total: number, time_limit: number, wipe_out: number, count: number } {
      if (this.stats === undefined) {
        return { total: 0, time_limit: 0, wipe_out: 0, count: 0 }
      }
      const time_limit: number = this.stats.job_result.is_failure.failure_reason.time_limit[wave_id]
      const wipe_out: number = this.stats.job_result.is_failure.failure_reason.wipe_out[wave_id]
      const count: number = time_limit + wipe_out

      return {
        total: (time_limit + wipe_out) / this.stats.job_result.is_failure.count,
        time_limit: time_limit / count,
        wipe_out: wipe_out / count,
        count: count
      }
    }
  },
});
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("total.total") }}</ion-list-header>
    <ion-item>
      <section>
        <div class="coop-stats-progress-bar">
          <ion-label class="coop-stats-key">{{ t("text.job_num") }}</ion-label>
          <ion-progress-bar :value="getJobClearRatio()">
          </ion-progress-bar>
          <ion-label class="coop-stats-key prob">{{ (getJobClearRatio() * 100).toFixed(3) }}</ion-label>
        </div>
        <ion-label class="coop-stats-value num">{{ getJobCounts() }}</ion-label>
      </section>
    </ion-item>
    <template v-for="wave in [0, 1, 2]" :key="wave">
      <ion-item>
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ t("text.failure_wave", { id: wave + 1 }) }}</ion-label>
            <ion-progress-bar :value="getJobFailureReason(wave).total">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ (getJobFailureReason(wave).total * 100).toFixed(3) }}
            </ion-label>
          </div>
          <ion-label class="coop-stats-value num">{{ getJobFailureReason(wave).count }}</ion-label>
        </section>
      </ion-item>
    </template>
    <ion-item>
      <section>
        <ion-label class="coop-stats-key">{{ t("text.ikura_num") }}</ion-label>
        <ion-label class="coop-stats-value num ikura">{{ stats?.job_result.ikura_num.sum }}</ion-label>
      </section>
    </ion-item>
    <ion-item>
      <section>
        <ion-label class="coop-stats-key">{{ t("text.golden_ikura_num") }}</ion-label>
        <ion-label class="coop-stats-value num golden-ikura">{{ stats?.job_result.golden_ikura_num.sum }}</ion-label>
      </section>
    </ion-item>
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
