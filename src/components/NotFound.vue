<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingView',
  components: { IonLabel },
  setup() {
    const { t } = useI18n()
    return { t };
  },
});
</script>

<template>
  <ion-label>
    {{ t('message.not_found') }}
  </ion-label>
</template>
