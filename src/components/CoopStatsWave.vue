<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, useIonRouter, IonSegment, IonSegmentButton, IonListHeader } from '@ionic/vue';
import { EventType } from './@types/splatnet2';
import { StatsIkura, WaveStatsType } from './@types/response';

export default defineComponent({
  components: {
    IonListHeader,
    IonItem,
    IonLabel
  },
  setup() {
    return {};
  },
  props: {
    'eventType': String,
    'score': {
      type: Object as () => WaveStatsType
    },
    'total': Number
  },
  methods: {},
});
</script>

<template v-if="true">
  <ion-list-header>{{ eventType }}</ion-list-header>
  <ion-item>
    <div class="coop-stats-wave-list">
      <ul>
        <li class="coop-stats-wave-list-item">
          <ion-label class="num">{{ score?.count }}</ion-label>
          <ion-label class="prob">{{ (score?.count / total * 100).toFixed(3) }}</ion-label>
          <ion-label class="num golden-ikura">{{ score?.max.golden_ikura_num }}</ion-label>
          <ion-label class="num ikura">{{ score?.max.ikura_num }}</ion-label>
        </li>
      </ul>
    </div>
    <!-- <ion-img></ion-img> -->
  </ion-item>
</template>

<style lang="scss" scoped>
.coop-stats-wave-list {
  width: 100%;

  ul {
    // display: block;
    // width: 100%;
    // padding: 0;
    margin: 0 0 0 auto;
    // padding-left: 40%;
    max-width: 200px;
    column-count: 2;
    right: 0; // justify-content: right;
  }
}

li {
  &.coop-stats-wave-list-item {
    // display: inline;
    list-style: none;
    text-align: right;
    width: 100%;
    justify-content: right;
  }
}

.num {
  &::before {
    content: "x";
    padding-right: 2px;
  }
}

.prob {
  &::after {
    content: "%";
    padding-left: 2px;
  }
}

ion-label {
  &.ikura {
    color: red;
    font-weight: bold;
  }

  &.golden-ikura {
    color: yellow;
    font-weight: bold;
  }
}
</style>
