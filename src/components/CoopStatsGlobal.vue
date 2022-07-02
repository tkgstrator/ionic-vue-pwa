<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { JobResult, LegacyStats } from './@types/response';
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
    return { t }
  },
  mounted: function () {
    console.log("GlobalView Mounted")
  },
  created: function () {
    console.log("GlobalView Created")
  },
  props: {
    results: {
      type: Object as () => JobResult,
      required: true,
      default: () => ({})
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
          <ion-progress-bar :value="results?.is_clear / (results?.is_clear +
          results?.is_failure)">
          </ion-progress-bar>
          <ion-label class="coop-stats-key prob">{{ (100 * results?.is_clear / (results?.is_clear +
              results?.is_failure)).toFixed(3)
          }}</ion-label>
        </div>
        <ion-label class="coop-stats-value num">{{ results?.is_clear + results?.is_failure }}</ion-label>
      </section>
    </ion-item>
    <template v-for="wave in results?.failure_waves" :key="wave">
      <ion-item>
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ t("text.failure_wave", { id: wave.failure_wave }) }}</ion-label>
            <ion-progress-bar :value="((wave.time_limit + wave.wipe_out) / results?.is_failure)">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ (100 * (wave.time_limit + wave.wipe_out) /
                results?.is_failure).toFixed(3)
            }}
            </ion-label>
          </div>
          <ion-label class="coop-stats-value num">{{ wave.time_limit + wave.wipe_out }}</ion-label>
        </section>
      </ion-item>
    </template>
    <ion-item>
      <section>
        <ion-label class="coop-stats-key">{{ t("text.ikura_num") }}</ion-label>
        <ion-label class="coop-stats-value num ikura">{{ }}</ion-label>
      </section>
    </ion-item>
    <ion-item>
      <section>
        <ion-label class="coop-stats-key">{{ t("text.golden_ikura_num") }}</ion-label>
        <ion-label class="coop-stats-value num golden-ikura">{{ }}</ion-label>
      </section>
    </ion-item>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
