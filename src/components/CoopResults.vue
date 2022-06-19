<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel } from '@ionic/vue';

interface JobResult {
  failure_reason?: string
  failure_wave?: number
  is_clear: boolean
}

interface Player {
  nsaid: string
  name: string
  grade_point?: number
}

interface Result {
  salmon_id: number
  job_results: JobResult
  danger_rate: number
  play_time: string
  players: Player[]
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
    IonLabel
    // IonRadio,
    // IonToggle
  },
  setup() {
    const results: Ref<Result[]> = ref<Result[]>([]);

    console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
    console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results`;
    fetch(url).then(response => response.json()).then(response => {
      results.value = response.results;
    });

    return { results };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results`;
      fetch(url).then(response => response.json()).then(response => {
        this.results = response.results;
        event.detail.complete();
      });
    }
  },
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list class="coop-result-list">
      <ion-item v-for="result in results" :key="result.salmon_id" class="coop-result">
        <ion-label>
          <section class="coop-result-summary">
            <div class="coop-result-job-result">
              <h3>{{ result.salmon_id }}</h3>
              <h2>{{ result.danger_rate }}%</h2>
            </div>
            <div class="coop-result-player-list">
              <ul>
                <li class="coop-result-player-list-item" v-for="player in result.players" :key="player.nsaid">
                  <label>{{ player.name }}</label>
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

ion-label {
  margin: 4px 0;
}

#app {
  font-family: 'Noto Sans JP' !important;
}

h2,
h3 {
  font-family: 'Noto Sans JP' !important;
}

h2 {
  font-size: 12px;
}

h3 {
  color: gray;
  font-size: 11px;
}

label {
  font-family: 'Noto Sans JP' !important;
  font-size: 12px;
}

.coop-result {
  max-width: 440px;
  margin: 0 auto;
}

.coop-result-summary {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.coop-result-job-result {
  width: 20%;
  max-width: 80px;
  padding: 2px 4px;

  // &::before {
  //     position: absolute;
  //     display: block;
  // }
}

.coop-result-player-list {
  display: block;
  width: 80%;
  max-width: 340px;
  // list-style: none;

  // &::before {
  //     position: absolute;
  // }

  ul {
    display: block;
    max-width: 320px;
    margin: 0 auto;
    margin-right: 10px;
    right: 0;
    column-count: 2;
    // justify-content: right;
    // align-items: right;
    text-align: left;
  }
}

.coop-result-player-list-item {
  list-style: none;
  display: block;
  // display: flex;

  // &li {
  //     text-align: left;
  // }

  // &::before {
  //     position: absolute;
  // }
}
</style>
