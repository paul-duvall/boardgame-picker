import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        games: null,
        username: null
    },
    mutations: {
        SET_GAMES(state, payload) {
            state.games = payload;
        },
        SET_USERNAME(state, payload) {
            state.username = payload;
        }
    },
    actions: {
        setGames({ commit }, games) {
            commit('SET_GAMES', games);
        },
        setUsername({ commit }, username) {
            commit('SET_USERNAME', username);
        }
    },
    getters: {
        getGames(state) {
            return state.games;
        },
        getUsername(state) {
            return state.username;
        }
    }
});