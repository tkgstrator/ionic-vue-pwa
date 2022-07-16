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
  IonAvatar,
  IonBadge,
  toastController
} from '@ionic/vue';
import Overview from './Users/Overview.vue';
import CoopResults from './CoopResults.vue';
import NotFound from './NotFound.vue';

interface User {
  nsaid: string
  shifts_worked: number
  is_clear: number
  is_failure: number
  is_friend_code_public: boolean
  is_imperial_scholars: boolean
  is_twitter_id_public: boolean
  is_verified: boolean
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
    IonSegmentButton,
    IonBadge,
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonImg,
    // IonCardSubtitle,
    // IonCardTitle
    CoopResults,
    NotFound
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter()
    const route = useRoute()
    const user: Ref<User | undefined> = ref<User>()
    const tabType: Ref<TabType> = ref<TabType>(TabType.OVERVIEW)
    const { nsaid } = route.params
    return { t, ionRouter, user, route, tabType, TabType, nsaid }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/players/${this.nsaid}`;
      fetch(url)
        .then(response => response.json())
        .then((response: User) => {
          this.user = response
          console.log("Response", this.user)
        })
        .catch((error) => {
          this.openToast()
          console.log(error)
        })
    },
    async openToast() {
      const toast = await toastController.create({
        message: this.t('message.forbidden'),
        duration: 5000
      });
      return toast.present();
    },
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    onChanged(event: CustomEvent) {
      this.tabType = event.detail.value as TabType
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
      <ion-item lines="none">
        <ion-avatar slot="start">
          <img :src="user.thumbnail_url" />
        </ion-avatar>
        <ion-label slot="start" class="nickname">{{ user.nickname }}
        </ion-label>
        <ion-label>
          <ul>
            <li>
              <ion-badge color="primary" class="user-label-item">{{ user.is_clear }}</ion-badge>
              <ion-badge color="danger" class="user-label-item">{{ user.is_failure }}</ion-badge>
            </li>
            <li>
              <ion-badge color="warning" class="user-label-item">{{ user.golden_ikura_num }}</ion-badge>
              <ion-badge color="danger" class="user-label-item">{{ user.ikura_num }}</ion-badge>
            </li>
          </ul>
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
    <NotFound v-if="tabType === TabType.OVERVIEW" />
    <CoopResults v-if="tabType === TabType.RESULTS" :nsaid="nsaid" />
    <NotFound v-if="tabType === TabType.SHIFTS" />
  </ion-content>
</template>
