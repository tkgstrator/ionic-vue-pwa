<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonContent, IonLabel, IonSearchbar } from '@ionic/vue';

interface Player {
    nsaid: string
    name: string
}

export default defineComponent({
    components: {
        // IonCheckbox,
        IonItem,
        IonSearchbar,
        // IonItemOption,
        // IonItemOptions,
        // IonItemSliding,
        IonList,
        IonContent,
        IonLabel
        // IonRadio,
        // IonToggle
    },
    setup() {
        const players: Ref<Player[]> = ref<Player[]>([]);
        const inputText: Ref<string> = ref<string>('');
        return { inputText, players };
    },
    methods: {
        onSubmit(event: CustomEvent) {
            this.inputText = event.detail.value;
        },
        onEnter() {
            console.log(this.inputText);
            console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
            console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
            const query = new URLSearchParams({ offset: "0", limit: "25", nickname: this.inputText });
            const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/users?${query}`;

            fetch(url).then(response => response.json()).then(response => {
                this.players = response
            });
        },
        onRefresh(event: CustomEvent) {
            setTimeout(() => {
                console.log('Async operation has ended');
                event.detail.complete();
            }, 1500);
        }
    },
});
</script>

<template>
    <ion-content fullscreen="true" clear-icon="true" mode="ios">
        <ion-item>
            <ion-searchbar v-model="inputText" @keyup.enter="onEnter()"></ion-searchbar>
        </ion-item>
        <ion-list>
            <ion-item v-for="player in players" :key="player.nsaid">
                <ion-label>
                    <div class="coop-result-job-result">
                        <h3>{{ player.nsaid }}</h3>
                        <h2>{{ player.name }}</h2>
                    </div>
                </ion-label>
                <!-- <ion-label>{{ result.salmon_id }}</ion-label> -->
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

ion-label {
    margin: 4px 0;
}

#app {
    font-family: 'Noto Sans JP' !important;
}

h2,
h3 {
    font-family: 'Noto Sans JP' !important;
}

h2 {
    font-size: 12px;
}

h3 {
    color: gray;
    font-size: 11px;
}

label {
    font-family: 'Noto Sans JP' !important;
    font-size: 12px;
}

.coop-result-summary {
    position: relative;
    display: flex;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
}

.coop-result-job-result {
    width: 20%;
    max-width: 80px;
    padding: 2px 4px;

    // &::before {
    //     position: absolute;
    //     display: block;
    // }
}

.coop-result-player-list {
    width: 80%;
    max-width: 300px;
    // list-style: none;

    // &::before {
    //     position: absolute;
    // }

    ul {
        margin: 0 auto;
        padding: 4px;
        column-count: 2;
    }
}

.coop-result-player-list-item {
    list-style: none;
    display: block;
    // display: flex;
    width: 40%;

    // &li {
    //     text-align: left;
    // }

    // &::before {
    //     position: absolute;
    // }
}
</style>
