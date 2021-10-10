<template>
    <div>
        <div v-for="game in games" v-bind:key="game.name._text"> 
            {{ game.name._text }}
        </div>
    </div>
</template>

<script>
// const axios = require('axios');
// const convert = require('xml-js');
import { mapGetters } from 'vuex';

export default {
    name: 'App',
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
        this.games = this.getGames;
    }
}
</script>