<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { BossResult } from './@types/response';
import { useI18n } from 'vue-i18n';
import { SalmonIdType } from './@types/splatnet2';

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
    return { SalmonIdType, t };
  },
  mounted: function () {
    console.log("BossView Mounted")
  },
  created: function () {
    console.log("BossView Created")
  },
  props: {
    results: {
      type: Object as () => BossResult[],
      required: true,
      default: () => ({})
    }
  },
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.salmon_id") }}</ion-list-header>
    <template v-for="(salmonId, index) in Object.values(SalmonIdType)" :key="salmonId">
      <ion-item>
        <section>
          <template v-if="results[index]">
            <div class="coop-stats-progress-bar">
              <ion-label class="coop-stats-key">{{ t(`salmon_id.${salmonId}`) }}</ion-label>
              <ion-progress-bar :value="results[index].boss_kill_counts / results[index].boss_counts">
              </ion-progress-bar>
              <ion-label class="coop-stats-key prob">{{ (100 * results[index].boss_kill_counts /
                  results[index].boss_counts).toFixed(3)
              }}
              </ion-label>
            </div>
            <div class="coop-stats-value-list">
              <ion-label class="num">{{ results[index].boss_kill_counts }}</ion-label>
              <ion-label class="num">{{ results[index].boss_counts }}</ion-label>
            </div>
          </template>
        </section>
      </ion-item>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>

