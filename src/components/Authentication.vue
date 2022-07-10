<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel, IonItem, IonListHeader, IonAvatar } from '@ionic/vue';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { useI18n } from "vue-i18n";
import dayjs from 'dayjs';

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel, IonAvatar },
  setup() {
    const { t } = useI18n()

    return { t }
  },
  methods: {
    signIn: () => {
      const provider = new TwitterAuthProvider();
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })
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
    <ion-label slot="end" class="version">1.0.6</ion-label>
  </ion-item>
</template>
