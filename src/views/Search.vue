<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <SearchPlayer />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, } from '@ionic/vue';
import SearchPlayer from '@/components/SearchPlayer.vue';

export default defineComponent({
  name: 'SearchView',
  components: { IonHeader, IonToolbar, IonTitle, IonPage, SearchPlayer }
});
</script>
