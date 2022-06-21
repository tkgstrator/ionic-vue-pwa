<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Player ID</ion-label>
          <ion-input class="nsaid" :placeholder="nsaid" :readonly="!editable" maxlength="16" minlength="16"
            v-on:ion-change="onChange($event)">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Editable</ion-label>
          <ion-toggle slot="end" v-bind:model-value="toggle" name="toggle" v-on:ion-change="changed($event)">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonToggle, IonList, IonContent } from '@ionic/vue';

const toggle = false

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonInput, IonLabel, IonItem, IonToggle, IonList, IonContent },
  setup() {
    const nsaid: Ref<string> = ref(localStorage.getItem("nsaid") ?? "0000000000000000");
    const editable: Ref<boolean> = ref(false);

    return { editable, toggle, nsaid }
  },
  methods: {
    changed(event: CustomEvent) {
      this.editable = event.detail.checked;
    },
    onChange(event: CustomEvent) {
      localStorage.setItem("nsaid", "ffffffffffffffff");
      console.log(event);
    },
  }
});
</script>

<style lang="scss" scoped>
</style>
