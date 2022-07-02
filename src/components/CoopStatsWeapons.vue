<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonList, IonItem, IonLabel, IonListHeader } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { LegacyStats, WeaponResult } from './@types/response';

export default defineComponent({
  components: {
    IonLabel,
    IonItem,
    IonList,
    IonListHeader
  },
  setup() {
    const { t } = useI18n()
    return { t };
  },
  mounted: function () {
    console.log("WeaponView Mounted")
  },
  created: function () {
    console.log("WeaponView Created")
  },
  props: {
    results: {
      type: Object as () => WeaponResult[],
      required: true,
      default: () => ({})
    }
  },
});
</script>

<template>
  <ion-list scrollable class="coop-result-list">
    <ion-list-header>{{ t("stats_type.WEAPONS") }}</ion-list-header>
    <ion-item v-for="result in results" :key="result.rank" class="coop-result">
      <ion-label>
        <section class="coop-ranking">
          <div class="coop-ranking-summary-rank">
            <ion-label>{{ result.rank }}</ion-label>
          </div>
          <div class="coop-ranking-summary-player">
            <ion-label class="player name">{{ result.name }}</ion-label>
            <ion-label class="count">{{ t(`text.shifts_worked`) }} {{ result.shifts_worked }}</ion-label>
          </div>
          <div class="coop-ranking-summary-score">
            <span class="golden-ikura num">{{ result.supplied_weapon_counts }}</span>
          </div>
        </section>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
