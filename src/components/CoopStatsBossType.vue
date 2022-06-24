<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { BossCount, LegacyStats, ShiftStats } from './@types/response';
import { useI18n } from 'vue-i18n';
import { SalmonidType } from './@types/splatnet2';

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
    return { SalmonidType, t };
  },
  props: {
    'stats': Object as () => LegacyStats
  },
  methods: {
    getBossCount(boss_id: number): { appearance: number, defeated: number, prob: number } {
      if (this.stats === undefined) {
        return { appearance: 0, defeated: 0, prob: 0 }
      }
      return {
        appearance: this.stats.boss_counts[boss_id].appearances,
        defeated: this.stats.boss_counts[boss_id].defeated,
        prob: this.stats.boss_counts[boss_id].defeated / this.stats.boss_counts[boss_id].appearances
      }
    }
  },
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.SALMONID") }}</ion-list-header>
    <template v-for="(salmonId, index) in Object.values(SalmonidType)" :key="salmonId">
      <ion-item>
        <section>
          <div class="coop-stats-progress-bar">
            <ion-label class="coop-stats-key">{{ t(`salmonid.${salmonId}`) }}</ion-label>
            <ion-progress-bar :value="getBossCount(index).prob">
            </ion-progress-bar>
            <ion-label class="coop-stats-key prob">{{ (getBossCount(index).prob * 100).toFixed(3) }}</ion-label>
          </div>
          <div class="coop-stats-value-list">
            <ion-label class="num">{{ getBossCount(index).defeated }}</ion-label>
            <ion-label class="num">{{ getBossCount(index).appearance }}</ion-label>
          </div>
        </section>
      </ion-item>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>

