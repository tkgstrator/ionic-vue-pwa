<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonListHeader, IonProgressBar } from '@ionic/vue';
import { BossCount } from './@types/response';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    IonListHeader,
    IonItem,
    IonLabel,
    IonProgressBar
  },
  setup() {
    const { t } = useI18n()
    return { t };
  },
  props: {
    'salmonid': String,
    'data': Object as () => BossCount
  },
  methods: {},
});
</script>

<template>
  <ion-list-header>{{ t(`salmonid.${salmonid}`) }}</ion-list-header>
  <ion-item>
    <div class="coop-stats-salmonid-list">
      <section>
        <div class="coop-stats-defeated-rate">
          <ion-progress-bar :value="data?.defeated / data?.appearances" buffer="1.0">
          </ion-progress-bar>
          <ion-label class="prob">{{ (data?.defeated / data?.appearances * 100).toFixed(3) }}</ion-label>
        </div>
        <ul>
          <li class="coop-stats-salmonid-list-item">
            <ion-label class="num">{{ data?.defeated }}</ion-label>
          </li>
          <li class="coop-stats-salmonid-list-item">
            <ion-label class="num">{{ data?.appearances }}</ion-label>
          </li>
        </ul>
      </section>
    </div>
  </ion-item>
</template>

<style lang="scss" scoped>
section {
  display: flex;
}

.coop-stats-salmonid-list {
  width: 100%;

  ul {
    width: 40%;
    // display: block;
    // width: 100%;
    padding: 0;
    margin: 0 auto;
    // padding-left: 40%;
    // max-width: 200px;
    // right: 0; // justify-content: right;
  }
}

.coop-stats-defeated-rate {
  width: 60%;
  margin-top: 10px; // padding: 10 auto;

  ion-label {
    font-size: 0.8rem !important;
    color: grey;
  }

  // top: 16px;
}

li {
  &.coop-stats-salmonid-list-item {
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
