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
    const results: Ref<WeaponResult[]> = ref<WeaponResult[]>([]);
    return { t, results };
  },
  mounted: function () {
    console.log("WeaponView Mounted")
    this.onLoad()
  },
  created: function () {
    console.log("WeaponView Created")
  },
  methods: {
    async onLoad() {
      const route = useRoute()
      const { start_time } = route.params
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/stats/${start_time}`;
      const headers = {
        "cache-control": "force-cache; max-age=600",
      }
      fetch(url, { headers: headers }).then(response => response.json()).then((response: LegacyStats) => {
        console.log(response)
        this.results = response.weapon_results
      });
    },
    onRefresh(event: CustomEvent) {
      this.onLoad().then(() => event.detail.complete());
    },
  },
});
</script>

<template>
  <ion-list scrollable class="coop-result-list">
    <ion-list-header>{{ t("stats_type.WEAPONS") }}</ion-list-header>
    <ion-item v-for="result in results" :key="result.rank" class="coop-result">
      <ion-label>
        <section class="coop-ranking">
          <div class="coop-ranking-summary-team-rank">
            <ion-label>{{ result.rank }}</ion-label>
          </div>
          <div class="coop-ranking-summary-team-members">
            <ion-label class="member name">{{ result.name }}</ion-label>
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

ion-label {
  .count {
    font-size: 0.8rem;
    color: var(--ion-color-primary);
  }
}

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
