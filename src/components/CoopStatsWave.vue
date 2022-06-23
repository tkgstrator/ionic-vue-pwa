<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonListHeader } from '@ionic/vue';
import { WaveStatsType } from './@types/response';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    IonListHeader,
    IonItem,
    IonLabel
  },
  setup() {
    const { t } = useI18n()
    return { t };
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

<template>
  <ion-list-header>{{ t(`event_type.${eventType}`) }}</ion-list-header>
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

ion-list-header {
  font-size: 14px !important;
  min-height: 20px;
  max-width: 440px;
  margin: 0 auto;
}

ion-label {
  font-size: 15px !important;
}
</style>
