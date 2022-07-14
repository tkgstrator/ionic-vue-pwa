<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader, IonAvatar } from '@ionic/vue';
import { getAuth, signInWithPopup, TwitterAuthProvider, UserCredential, UserInfo } from 'firebase/auth';
import { useI18n } from "vue-i18n";

interface Account {
  nsaid: string
  name: string
  thumbnailURL: string
}

class Twitter {
  constructor(credential: UserCredential) {
    console.log(credential)
    const user: UserInfo = credential.user.providerData[0]
    this.uid = user.uid
    this.display_name = user.displayName
    this.photoURL = user.photoURL
    this.screen_name = ""
    this.accounts = []
  }
  screen_name: string
  display_name: string | null
  photoURL: string | null
  uid: string
  accounts: Account[]
}

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel, IonAvatar },
  setup() {
    const { t } = useI18n()
    const user: Ref<Twitter | undefined> = ref<Twitter>()

    return { t, user }
  },
  methods: {
    async signIn() {
      const provider = new TwitterAuthProvider();
      const auth = getAuth()
      console.log(auth)
      try {
        this.user = new Twitter(await signInWithPopup(auth, provider))
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        const parameters = JSON.stringify(this.user)
        const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/users`;
        const response = (await (await fetch(url, {
          method: "POST",
          headers: headers,
          body: parameters
        })).json())
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
});
</script>

<template>
  <ion-list-header>{{ t("app.authentication") }}</ion-list-header>
  <ion-item button v-on:click="signIn">
    <ion-avatar slot="start">
      <img src="assets/icon/twitter-logo.png" />
    </ion-avatar>
    <ion-label slot="start">Twitter</ion-label>
    <ion-label slot="end" class="version">{{ t("authentication.sign_in") }}</ion-label>
  </ion-item>
</template>
