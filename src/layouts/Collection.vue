<template>
    <div v-if="games === null">
        <choose-collection-card :updateGames="updateGames()" />
    </div>
    <b-card-group v-else class="d-flex flex-wrap" deck>
        <b-card
            v-for="game in games"
            v-bind:key="game.name._text"
            :title="game.name._text"
            :img-src="game.image._text"
            img-alt="Image"
            img-top
            tag="article"
            style="width: 20rem;"
            class="mb-2 mx-2"
            >
            <b-card no-body>
                <b-card-img-lazy />
            </b-card>
        </b-card>
    </b-card-group>
</template>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
</style>

<script>
import { mapGetters } from 'vuex';

import ChooseCollectionCard from '@/components/ChooseCollectionCard.vue';

export default {
    name: 'App',
    components: {
        ChooseCollectionCard
    },
    data() {
        return {
            games: null
        }
    },
    computed: {
        ...mapGetters([
        'getGames',
        ])
    },
    mounted() {
        this.updateGames();
    },
    methods: {
        updateGames() {
            this.games = this.getGames;
        }
    }
}
</script>