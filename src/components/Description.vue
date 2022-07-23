<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel, IonItem, IonListHeader, IonAvatar } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import dayjs from 'dayjs';

export default defineComponent({
  name: 'DescriptionView',
  components: { IonListHeader, IonItem, IonLabel, IonAvatar },
  setup() {
    const { t } = useI18n()
    return { t, dayjs };
  },
  methods: {
  }
});
</script>

<template>
  <ion-list-header>{{ t("app.uploader") }}</ion-list-header>
  <ion-item>
    <p class="description">{{ t("message.uploader_description") }}</p>
  </ion-item>
  <ion-item button lines="none">
    <ion-avatar slot="start">
      <img
        src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
    </ion-avatar>
    <ion-label slot="start" color="danger"><a href="itms-beta://testflight.apple.com/join/dVMPIN8o">Salmonia3/iOS</a>
    </ion-label>
    <ion-label slot="end" class="version">1.0.6</ion-label>
  </ion-item>
  <ion-item button lines="none">
    <ion-avatar slot="start">
      <img
        src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
    </ion-avatar>
    <ion-label slot="start" color="danger"><a
        href="https://github.com/SalmonStats/sinclair/releases">Sinclair/Android</a></ion-label>
    <ion-label slot="end" class="version">0.0.5</ion-label>
  </ion-item>
  <ion-item>
    <p class="description">Salmon Stats is an open-source Splatoon 2 Salmon Run statistics website developed by
      <a href="https://twitter.com/tkgling">@tkgling</a>. All of
      source code including Website, server, client are fully public on <a
        href="https://github.com/SalmonStats">GitHub</a>. Moreover, the documents of API is
      published in <a href="https://salmonstats.github.io/api">GitHub pages</a>, you could build own
      applications, website, tool as long as they are based on <a href="https://choosealicense.com/licenses/mit">MIT
        License</a>.
    </p>
  </ion-item>
</template>
