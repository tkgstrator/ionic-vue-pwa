<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonItem, IonLabel, IonList, IonProgressBar, IonListHeader } from '@ionic/vue';
import { BossResult, LegacyStats } from './@types/response';
import { useI18n } from 'vue-i18n';
import { SalmonidType } from './@types/splatnet2';
import { useRoute } from 'vue-router';

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
    const results: Ref<BossResult[]> = ref<BossResult[]>([])
    return { SalmonidType, results, t };
  },
  mounted: function () {
    console.log("BossView Mounted")
    this.onLoad()
  },
  created: function () {
    console.log("BossView Created")
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
        this.results = response.boss_results;
        console.log(this.results)
      });
    },
    onRefresh(event: CustomEvent) {
      this.onLoad().then(() => event.detail.complete());
    },
  },
})
</script>

<template>
  <ion-list>
    <ion-list-header>{{ t("stats_type.SALMONID") }}</ion-list-header>
    <template v-for="(salmonId, index) in Object.values(SalmonidType)" :key="salmonId">
      <ion-item>
        <section>
          <template v-if="results[index]">
            <div class="coop-stats-progress-bar">
              <ion-label class="coop-stats-key">{{ t(`salmonid.${salmonId}`) }}</ion-label>
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

