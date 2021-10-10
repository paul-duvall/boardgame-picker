import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        games: null
    },
    mutations: {
        SET_GAMES(state, payload) {
            state.games = payload;
        }
    },
    actions: {
        setGames({ commit}, games) {
            commit('SET_GAMES', games);
        }
    },
    getters: {
        getGames(state) {
            return state.games;
        },
        getTestThing(state) {
            return state.testThing;
        }
    }
});