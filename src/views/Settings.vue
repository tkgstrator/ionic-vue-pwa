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
          <ion-input class="nsaid" :value="nsaid" :model="nsaid" :placeholder="nsaid" :readonly="!editable"
            maxlength="16" minlength="16" v-on:ion-change="onChange($event)" @keyup.enter="onEnter($event)">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Editable</ion-label>
          <ion-toggle slot="end" v-bind:model-value="editable" name="toggle" v-on:ion-change="toggleChanged($event)">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonToggle, IonList, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'SettingView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, IonInput, IonLabel, IonItem, IonToggle, IonList, IonContent },
  setup() {
    const nsaid: Ref<string> = ref(localStorage.getItem("nsaid") ?? "0000000000000000");
    const editable: Ref<boolean> = ref(false);

    return { editable, nsaid }
  },
  methods: {
    toggleChanged(event: CustomEvent) {
      this.editable = event.detail.checked
    },
    onChange(event: CustomEvent) {
      this.nsaid = event.detail.value
    },
    onEnter(event: CustomEvent) {
      const pattern = "/^[0-9a-f]{16}$/"
      if (this.nsaid.match(pattern) !== undefined) {
        localStorage.setItem("nsaid", this.nsaid)
      } else {
        console.log("Invalid value.")
      }
    }
  }
});
</script>

<style lang="scss" scoped>
* {
  font-family: "Noto Sans JP" !important;
}

ion-label {
  font-family: "Noto Sans JP" !important;
}
</style>
