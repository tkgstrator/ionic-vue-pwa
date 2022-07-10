<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader, IonAvatar } from '@ionic/vue';
import { getAuth, signInWithPopup, TwitterAuthProvider, UserCredential } from 'firebase/auth';
import { useI18n } from "vue-i18n";

class Twitter {
  constructor(credential: UserCredential) {
    this.display_name = credential.user.displayName
    this.photoURL = credential.user.photoURL
    this.uid = credential.user.uid
  }

  display_name: string | null
  photoURL: string | null
  uid: string
}

interface Account {
  nsaid: string
  name: string
  thumbnailURL: string
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
      this.user = new Twitter(await signInWithPopup(auth, provider))
      console.log(JSON.stringify(this.user))
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
