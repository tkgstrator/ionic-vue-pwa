<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader, IonAvatar, useIonRouter, toastController } from '@ionic/vue';
import { getAuth, signInWithPopup, TwitterAuthProvider, UserCredential, UserInfo } from 'firebase/auth';
import { useI18n } from "vue-i18n";

interface Account {
  nsaid: string
  nickname: string
  thumbnail_url: string
  friend_code: string
}

interface User {
  uid: string
  name: string
  is_friend_code_public: boolean
  is_imperial_scholars: boolean
  is_twitter_id_public: boolean
  is_verified: boolean
  thumbnail_url: string
  accounts: Account[]
}

class Twitter {
  constructor(credential: UserCredential) {
    const user: UserInfo = credential.user.providerData[0]
    this.uid = user.uid
    this.display_name = user.displayName
    this.thumbnail_url = user.photoURL
    this.screen_name = ""
    this.accounts = []
  }
  screen_name: string
  display_name: string | null
  thumbnail_url: string | null
  uid: string
  accounts: Account[]
}

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel, IonAvatar },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter();
    const data: string = localStorage.getItem("user") ?? '{}'
    // アカウント情報取得
    const accounts: Ref<Account[]> = (() => {
      return ref<Account[]>((JSON.parse(data) as User).accounts)
    })()
    // ユーザー情報取得
    const user: Ref<User> = (() => {
      return ref<User>((JSON.parse(data) as User))
    })()
    console.log("User", user.value.uid)
    return { t, user, accounts, ionRouter }
  },
  methods: {
    async navigate(nsaid: string) {
      this.ionRouter.push(`/users/${nsaid}`)
    },
    async onLoad() {
      const data: string = localStorage.getItem("user") ?? '{}'
      // アカウント情報取得
      this.accounts = (JSON.parse(data) as User).accounts
      // ユーザー情報取得
      this.user = (JSON.parse(data) as User)
    },
    async signOut() {
      localStorage.setItem("user", "{}")
      this.onLoad()
      this.openToast(this.t('message.sign_out.success'))
    },
    async openToast(message: string) {
      const toast = await toastController.create({
        message: message,
        duration: 2500
      });
      return toast.present();
    },
    async subscription() {
      window.location.href = "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-5YR614358D8229313MAAAVNA"
    },
    async signIn() {
      try {
        const provider = new TwitterAuthProvider();
        const auth = getAuth()
        const user = new Twitter(await signInWithPopup(auth, provider))
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        const parameters = JSON.stringify(user)
        const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/users`;
        const response = (await (await fetch(url, {
          method: "POST",
          headers: headers,
          body: parameters
        })).json())
        // レスポンスを整形して保存
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response))
        this.onLoad()
        this.openToast(this.t('message.sign_in.success'))
      } catch (error) {
        console.log(error)
        this.openToast(this.t('message.sign_in.failure'))
      }
    }
  }
});
</script>

<template>
  <ion-list-header>{{ t("app.subscription") }}</ion-list-header>
  <ion-item button lines="full" v-on:click="subscription">
    <ion-avatar slot="start">
      <img src="assets/icon/paypal-logo.png" />
    </ion-avatar>
    <ion-label slot="start">Paypal</ion-label>
    <ion-label slot="end" class="version">{{ t("message.subscription") }}</ion-label>
  </ion-item>
  <ion-item>
    <p class="description">{{ t("message.subscription_description") }}</p>
  </ion-item>
  <ion-list-header>{{ t("app.authentication") }}</ion-list-header>
  <template v-if="user.uid === undefined">
    <ion-item button lines="full" v-on:click="signIn">
      <ion-avatar slot="start">
        <img src="assets/icon/twitter-logo.png" />
      </ion-avatar>
      <ion-label slot="start">Twitter</ion-label>
      <ion-label slot="end" class="version">{{
          t("authentication.sign_in")
      }}</ion-label>
    </ion-item>
  </template>
  <template v-if="user.uid !== undefined">
    <ion-item button lines="full" v-on:click="signOut">
      <ion-avatar slot="start">
        <img src="assets/icon/twitter-logo.png" />
      </ion-avatar>
      <ion-label slot="start">Twitter</ion-label>
      <ion-label slot="end" class="version">{{
          t("authentication.sign_out")
      }}</ion-label>
    </ion-item>
  </template>
  <template v-if="user.uid !== undefined">
    <ion-list-header>{{ t("app.accounts") }}</ion-list-header>
    <template v-for="account in accounts" :key="account.nsaid">
      <ion-item button v-on:click="navigate(account.nsaid)" lines="full">
        <ion-avatar slot="start">
          <img :src="account.thumbnail_url" />
        </ion-avatar>
        <ion-label slot="start" class="nickname">{{ account.nickname }}</ion-label>
        <ion-label slot="end" class="friend-code">{{ account.friend_code }}</ion-label>
      </ion-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
