<script lang="ts">
import { defineComponent } from 'vue';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage, IonicSlides } from '@ionic/vue';

import 'swiper/css';
import 'swiper/css/effect-fade';
import '@ionic/vue/css/ionic-swiper.css';
import CoopSchedules from '@/components/CoopSchedules.vue';

export default defineComponent({
  name: 'IonSlider',
  components: { Swiper, SwiperSlide, IonContent, IonPage, CoopSchedules },
  setup() {
    return {
      modules: [EffectFade, IonicSlides],
    };
  },
});
</script>

<template>
  <ion-page>
    <ion-content>
      <swiper :modules="modules" effect="slide">
        <swiper-slide>
          <CoopSchedules />
        </swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
.swiper {
  overflow: visible;
}
</style>
