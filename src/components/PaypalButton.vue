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
</template>
