<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, IonIcon, IonSegmentButton, IonSegment } from '@ionic/vue';
import { ribbonSharp } from 'ionicons/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { useI18n } from 'vue-i18n';

interface Player {
  nsaid: string
  nickname: string
  thumbnail_url: string
  max: Rank
  avg: Rank
  sum: Rank
  count: number
  fastest999Time: number
}

interface Rank {
  golden_ikura_num: number
  ikura_num: number
  dead_count?: number
  help_count?: number
  grade_point?: number
}

enum RankType {
  GOLDEN = "golden",
  POWER = "power",
  WORKED = "worked"
}

enum RankMode {
  TOTAL = "sum",
  BEST = "max",
  AVG = "avg"
}


export default defineComponent({
  components: {
    // IonCheckbox,
    // IonInput,
    IonItem,
    // IonItemOption,
    // IonItemOptions,
    // IonItemSliding,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonImg,
    IonIcon,
    IonSegmentButton,
    IonSegment,
    // IonRadio
    // IonToggle
  },
  setup() {
    const { t } = useI18n()
    const players: Ref<Player[]> = ref<Player[]>([]);
    const rankType: Ref<RankType> = ref<RankType>(RankType.WORKED);
    const rankMode: Ref<RankMode> = ref<RankMode>(RankMode.TOTAL);

    console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
    console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/ranks`;
    fetch(url).then(response => response.json()).then(response => {
      players.value = response
    });

    dayjs.extend(duration);
    dayjs.extend(utc)

    return {
      players, ribbonSharp, RankType, RankMode, rankMode, rankType, dayjs, utc, duration, t
    };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/ranks`;
      fetch(url).then(response => response.json()).then(response => {
        this.players = response
      });
      event.detail.complete();
    },
    segmentChanged(event: CustomEvent) {
      // ここでソートする
      this.players.sort((a, b) => {
        if (this.rankMode == RankMode.BEST && this.rankType == RankType.WORKED) {
          return this.score(a) - this.score(b);
        } else {
          return this.score(b) - this.score(a);
        }
      });
    },
    score(player: Player): number {
      switch (this.rankType) {
        case RankType.GOLDEN:
          return this.value(player).golden_ikura_num;
        case RankType.POWER:
          return this.value(player).ikura_num;
        case RankType.WORKED:
          return this.rankMode == RankMode.BEST ? player.fastest999Time ?? Number.MAX_SAFE_INTEGER : player.count;
      }
    },
    value(player: Player): Rank {
      switch (this.rankMode) {
        case RankMode.TOTAL:
          return player.sum;
        case RankMode.BEST:
          return player.max;
        case RankMode.AVG:
          return player.avg;
      }
    },
    elapsedTime(player: Player): string {
      if (player.fastest999Time == null) {
        return "99:99:99";
      }
      const hours = ("00" + Math.floor(player.fastest999Time / 3600)).slice(-2);
      const minutes = ("00" + Math.floor((player.fastest999Time % 3600) / 60)).slice(-2);
      const seconds = ("00" + Math.floor(player.fastest999Time % 60)).slice(-2);
      return `${hours}:${minutes}:${seconds}`;
    },
  }
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-segment mode="md" v-on:ion-change="segmentChanged($event)" :value="rankMode" v-model="rankMode">
      <template v-for="mode in Object.values(RankMode)" :key="mode">
        <ion-segment-button :value="mode">
          <ion-label>{{ t(`rank.mode.${mode}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
    <ion-segment mode="md" v-on:ion-change="segmentChanged($event)" :value="rankType" v-model="rankType">
      <template v-for="type in Object.values(RankType)" :key="type">
        <ion-segment-button :value="type">
          <ion-label>{{ t(`rank.type.${type}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
    <ion-list scrollable>
      <ion-item v-for="(player, index) in players" :key="player.nsaid">
        <ion-label>
          <section class="coop-ranking">
            <div class="coop-ranking-summary-rank">
              <ion-label>{{ index + 1 }}</ion-label>
            </div>
            <div class="coop-ranking-summary-thumbnail">
              <ion-icon class="coop-player-verified" :icon="ribbonSharp" v-if="player.max.grade_point != null">
              </ion-icon>
              <ion-img class="coop-player-thumbnail" :src="player.thumbnail_url"></ion-img>
            </div>
            <div class="coop-ranking-summary-player">
              <ion-label class="nsaid">{{ player.nsaid }}</ion-label>
              <ion-label>{{ player.nickname }}</ion-label>
            </div>
            <div class="coop-ranking-scores-list" v-if="!(rankMode == RankMode.BEST && rankType == RankType.WORKED)">
              <ul>
                <li class="coop-ranking-scores-list-item">
                  <ion-label class="golden-ikura"></ion-label>
                  <ion-label class="num">{{ rankMode == RankMode.AVG ?
                      value(player).golden_ikura_num.toFixed(3) : value(player).golden_ikura_num
                  }}</ion-label>
                </li>
                <li class="coop-ranking-scores-list-item">
                  <ion-label class="ikura"></ion-label>
                  <ion-label class="num">{{ rankMode == RankMode.AVG ? value(player).ikura_num.toFixed(3) :
                      value(player).ikura_num
                  }}</ion-label>
                </li>
              </ul>
            </div>
            <div class="coop-ranking-scores-list" v-if="(rankMode == RankMode.BEST && rankType == RankType.WORKED)">
              <ul>
                <li class="coop-ranking-scores-list-item">
                  <label class="golden-ikura"></label>
                  <span class="num">{{ player.count }}</span>
                </li>
                <li class="coop-ranking-scores-list-item">
                  <label class="ikura"></label>
                  <span class="time">{{ elapsedTime(player) }}</span>

                </li>
              </ul>
            </div>
          </section>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<style lang="scss">
@import "../theme/styles.scss";
</style>
