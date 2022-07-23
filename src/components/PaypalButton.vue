<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel, IonItem } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingView',
  components: { IonItem, IonLabel },
  setup() {
    const { t } = useI18n()
    return { t };
  },
});
</script>

<template>
  <ion-item button color="tertiary" lines="none" fill="outline">
    <ion-label>
      {{ t("message.subscription") }}
    </ion-label>
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
