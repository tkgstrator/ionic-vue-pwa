<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import {
  IonList,
  IonItem,
  IonRefresher,
  IonContent,
  IonRefresherContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  useIonRouter,
  IonAvatar
} from '@ionic/vue';
import { IonNavCustomEvent } from '@ionic/core';

interface User {
  shifts_worked: number
  golden_ikura_num: number
  ikura_num: number
  kuma_point: number
  grade_point: number
  nickname: string
  thumbnail_url: string
}

enum TabType {
  OVERVIEW = 'overview',
  RESULTS = 'results',
  SHIFTS = 'shifts'
}

const StageType: { [name: number]: string } = {
  5000: "https://app.splatoon2.nintendo.net/images/coop_stage/65c68c6f0641cc5654434b78a6f10b0ad32ccdee.png",
  5001: "https://app.splatoon2.nintendo.net/images/coop_stage/e07d73b7d9f0c64e552b34a2e6c29b8564c63388.png",
  5002: "https://app.splatoon2.nintendo.net/images/coop_stage/6d68f5baa75f3a94e5e9bfb89b82e7377e3ecd2c.png",
  5003: "https://app.splatoon2.nintendo.net/images/coop_stage/e9f7c7b35e6d46778cd3cbc0d89bd7e1bc3be493.png",
  5004: "https://app.splatoon2.nintendo.net/images/coop_stage/50064ec6e97aac91e70df5fc2cfecf61ad8615fd.png",
};

export default defineComponent({
  name: 'UsersView',
  components: {
    // IonList,
    IonRefresherContent,
    IonRefresher,
    IonContent,
    IonAvatar,
    IonLabel,
    IonItem,
    IonSegment,
    IonSegmentButton
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonImg,
    // IonCardSubtitle,
    // IonCardTitle
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter()
    const route = useRoute()
    const user: Ref<User | undefined> = ref<User>()
    const tabType: TabType = TabType.OVERVIEW
    return { t, ionRouter, user, route, tabType, TabType }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      const { nsaid } = this.route.params
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/players/${nsaid}`;
      fetch(url).then(response => response.json()).then((response: User) => {
        this.user = response
        console.log(this.user)
      });

    },
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    onChanged(event: CustomEvent) {
      console.log(event)
    }
  }
});
</script>

<template>
  <ion-content>
    <ion-refresher slot="fixed" pull-factor=0.5 @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <template v-if="user !== undefined">
      <ion-item>
        <ion-avatar slot="start">
          <img :src="user.thumbnail_url" />
        </ion-avatar>
        <ion-label slot="start">{{ user.nickname }}
        </ion-label>
        <ion-label slot="end">
          <p>Eggs</p>
          <ion-badge color="warning" class="user-label-item">{{ user.golden_ikura_num }}</ion-badge>
          <ion-badge color="danger" class="user-label-item">{{ user.ikura_num }}</ion-badge>
        </ion-label>
      </ion-item>
    </template>
    <ion-segment mode="md" @ionChange="onChanged($event)" :value="tabType" scrollable>
      <template v-for="tabType in Object.values(TabType)" :key="tabType">
        <ion-segment-button :value="tabType">
          <ion-label>{{ t(`tab_type.${tabType}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
  </ion-content>
</template>


<style lang="scss">
@import "../theme/styles.scss";
</style>
