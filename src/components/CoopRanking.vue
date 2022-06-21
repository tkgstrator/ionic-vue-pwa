<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, IonCheckbox, IonRadio, IonIcon, IonSegmentButton, IonSegment } from '@ionic/vue';
import { ribbonSharp } from 'ionicons/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

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
  GOLDEN = "GOLDEN",
  POWER = "POWER",
  WORKED = "WORKED"
}

enum RankMode {
  TOTAL = "TOTAL",
  BEST = "BEST",
  AVG = "AVG"
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
      players, ribbonSharp, RankType, RankMode, rankMode, rankType, dayjs, utc, duration,
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
    <ion-segment mode="md" @ionChange="segmentChanged($event)" :value="rankMode" v-model="rankMode">
      <ion-segment-button :value="RankMode.TOTAL">
        <ion-label>Total</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="RankMode.BEST">
        <ion-label>Best</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="RankMode.AVG">
        <ion-label>Avg</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-segment mode="md" @ionChange="segmentChanged($event)" :value="rankType" v-model="rankType">
      <ion-segment-button :value="RankType.WORKED">
        <ion-label>Worked</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="RankType.GOLDEN">
        <ion-label>Golden</ion-label>
      </ion-segment-button>
      <ion-segment-button :value="RankType.POWER">
        <ion-label>Power</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-list scrollable>
      <ion-item v-for="(player, index) in players" :key="player.nsaid">
        <ion-label>
          <section class="coop-ranking">
            <div class="coop-ranking-summary-player-rank">
              <ion-label>{{ index + 1 }}</ion-label>
            </div>
            <div class="coop-ranking-summary-thumbnail">
              <ion-icon class="coop-player-verified" :icon="ribbonSharp" v-if="player.max.grade_point != null">
              </ion-icon>
              <ion-img class="coop-player-thumbnail" :src="player.thumbnail_url"></ion-img>
            </div>
            <div class="coop-ranking-summary-player">
              <h3>{{ player.nsaid }}</h3>
              <h2>{{ player.nickname }}</h2>
            </div>
            <div class="coop-ranking-scores-list" v-if="!(rankMode == RankMode.BEST && rankType == RankType.WORKED)">
              <ul>
                <li class="coop-ranking-scores-list-item">
                  <label class="golden-ikura"></label>
                  <span class="num">{{ rankMode == RankMode.AVG ?
                      value(player).golden_ikura_num.toFixed(3) : value(player).golden_ikura_num
                  }}</span>
                </li>
                <li class="coop-ranking-scores-list-item">
                  <label class="ikura"></label>
                  <span class="num">{{ rankMode == RankMode.AVG ? value(player).ikura_num.toFixed(3) :
                      value(player).ikura_num
                  }}</span>
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
        <!-- <ion-label>{{ result.salmon_id }}</ion-label> -->
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<style lang="scss" scoped>
ion-label {
  margin: 4px 0;
}

h2 {
  font-size: 12px;
}

h3 {
  color: gray;
  font-size: 11px;
}

span {
  font-size: 14px;

  &.num {
    &::before {
      content: 'x';
      padding-right: 2px;
    }
  }
}


label {
  font-size: 12px;

  &.golden-ikura {
    position: relative;
    box-sizing: border-box;
    color: #ffd700;
    width: 100%;

  }

  &.ikura {
    color: #00ff00;
  }
}

.coop-ranking {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.coop-ranking-summary-player-rank {
  width: 10%;
  font-weight: bold;
}

.coop-ranking-summary-thumbnail {
  width: 18%;
}

.coop-ranking-summary-player {
  width: 30%;
}

ion-img {
  &.coop-player-thumbnail {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    clip-path: circle(50%);
  }
}

.coop-player-verified {
  position: absolute;
  color: yellow;
  z-index: 1;
}

.coop-ranking-scores-list {
  width: 52%;

  ul {
    padding: 0;
    margin: 0;
    // text-align: right;
    width: 100%;
  }
}

li {
  list-style: none;

  &.coop-ranking-scores-list-item {
    text-align: right;
    list-style: none;
    display: block;
  }
}
</style>
