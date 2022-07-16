<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import dayjs from 'dayjs';

interface SystemInfo {
  os: {
    dist: string,
    distversion: string
  }
  kernel: string
  arch: string
  client: string
  cpu: {
    cores: number,
    type: string
  }
}

interface SystemStatusValue {
  x: number
  y: number
}

interface SystemStatus {
  version: string
  data: {
    sys_info: SystemInfo
    network: {
      interface: {
        eth0: {
          rx_bytes: SystemStatusValue[]
          tx_bytes: SystemStatusValue[]
        }
      }
    }
    uptime: number
  }
}

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel },
  setup() {
    const { t } = useI18n()
    const sys_info: Ref<SystemInfo | undefined> = ref<SystemInfo>();
    const uptime: Ref<string | undefined> = ref<string>();
    const network: Ref<string | undefined> = ref<string>();
    return { t, dayjs, sys_info, uptime, network };
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/system`;
      fetch(url).then(response => response.json()).then((response: SystemStatus) => {
        this.sys_info = response.data.sys_info;
        this.uptime = dayjs.duration(response.data.uptime * 1000).format('DDTHH:mm:ss');
        console.log(response.data.network)
        const network_speed = (response.data.network.interface.eth0.rx_bytes[0].y + response.data.network.interface.eth0.tx_bytes[0].y) / 1024;
        this.network = `${network_speed.toFixed(3)} KB/s`;
      });
    }
  }
});
</script>

<template>
  <ion-list-header>{{ t("app.server") }}</ion-list-header>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("server.system.os") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.os.dist }} {{ sys_info?.os.distversion }}</ion-label>
  </ion-item>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("server.kernel") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.kernel }} </ion-label>
  </ion-item>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("server.cpu") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.cpu.type }}</ion-label>
  </ion-item>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("server.network") }}</ion-label>
    <ion-label slot="end" class="version">{{ network }}
    </ion-label>
  </ion-item>
  <ion-item lines="none">
    <ion-label slot="start">{{ t("server.uptime") }}</ion-label>
    <ion-label slot="end" class="version">{{ uptime }}
    </ion-label>
  </ion-item>
</template>
