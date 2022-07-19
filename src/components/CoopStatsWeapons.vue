<script lang="ts">
import { defineComponent } from 'vue';
import { IonList, IonItem, IonLabel, IonListHeader, IonImg, IonIcon, useIonRouter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { WeaponResult } from './@types/response';
import { ribbonSharp } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonImg,
    IonIcon,
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter();
    return { t, ionRouter, ribbonSharp };
  },
  mounted: function () {
    console.log("WeaponView Mounted")
  },
  created: function () {
    console.log("WeaponView Created")
  },
  methods: {
    navigate(nsaid: string) {
      this.ionRouter.push(`/users/${nsaid}`)
    }
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
  <ion-list class="coop-result-list">
    <ion-list-header>{{ t("stats_type.grade_point") }}</ion-list-header>
    <template v-for="player in results" :key="player.nsaid">
      <ion-item button class="coop-result" v-on:click="navigate(player.nsaid)">
        <ion-label>
          <section class="coop-ranking">
            <div class="coop-ranking-summary-rank">
              <ion-label>{{ player.rank }}</ion-label>
            </div>
            <div class="coop-ranking-summary-thumbnail">
              <ion-icon class="coop-player-verified" :icon="ribbonSharp">
              </ion-icon>
              <ion-img class="coop-player-thumbnail" :src="player.thumbnail_url"></ion-img>
            </div>
            <div class="coop-ranking-summary-player">
              <ion-label class="nsaid">{{ player.nsaid }}</ion-label>
              <ion-label>{{ player.name }}</ion-label>
            </div>
            <div class="coop-ranking-scores-list">
              <ul>
                <li class="coop-ranking-scores-list-item">
                  <ion-label>{{ player.supplied_weapon_counts }}</ion-label>
                </li>
                <li class="coop-ranking-scores-list-item">
                  <ion-label class="num">{{ player.shifts_worked }}</ion-label>
                </li>
              </ul>
            </div>
          </section>
        </ion-label>
      </ion-item>
    </template>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
