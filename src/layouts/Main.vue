<template>
    <div>
      <b-card 
        bg-variant="light" 
        header="Welcome to the Game Picker!" 
        class="app--card"
      >
        <p>Want to play a game but can't decide which one?</p>
        <p>Enter your BGG username and you can randomly select
            a game to play from your collection.</p>
        <p>No idea what any of this nonsense is about? <a class="app--card-link" @click="showHelpModal()">Click for help</a>.</p>
      </b-card>
      <choose-collection-card :updateGames="updateGames()" />
      <b-card 
        bg-variant="light" 
        :header="username + '\'s collection'" 
        class="app--card mt-4" 
        v-if="games"
      >
        <p>Number of games: {{ games.length }}</p>
        <b-button @click="pickAGame()">
          <span v-if="pickedGame.name === null">Pick a game</span>
          <span v-else>Pick different game</span>
        </b-button>
        <b-button class="mx-3" v-b-toggle.collapse-1>Advanced settings</b-button>
      </b-card>

      <!-- <b-collapse id="collapse-1">
        <b-card class="mt-4">
          <h2>Advanced settings</h2>
          <b-form-checkbox
            v-model="filters.excludeExpansions"
          >
            Exclude expansions
          </b-form-checkbox>      
          <b-button>Update results</b-button>
        </b-card>
      </b-collapse> -->

      <b-card 
        class="app--card mt-4 mb-4" 
        v-if="pickedGameData"
        :header="'Selected game: ' + pickedGame.name"   
      >
        <div class="d-flex flex-column flex-md-row justify-content-center">
          <img class="result--image" :src="pickedGame.imageUrl">
          <div class="result--details">            
            <div class="row">
              <div class="col-sm">
                <strong>Play time</strong>
              </div>
              <div class="col-sm">
                {{ pickedGame.playtime }} minutes
              </div>
            </div>

            <div class="row">
              <div class="col-sm">
                <strong>BGG average rating</strong>
              </div>
              <div class="col-sm">
                {{ pickedGame.rating }}
              </div>
            </div>

            <div class="row">
              <div class="col-sm">
                <strong>Number of players</strong>
              </div>
              <div class="col-sm">
                {{ pickedGame.playerCount }}
              </div>
            </div>
          </div>
        </div>
      </b-card>   
      <help-modal v-on:loadDevelopersCollection="loadDevelopersCollection()"/> 
    </div>
</template>

<script>
const axios = require('axios');
const convert = require('xml-js');
import { mapActions, mapGetters } from 'vuex';

import HelpModal from '@/components/HelpModal.vue';
import ChooseCollectionCard from '@/components/ChooseCollectionCard.vue';
import Games from '@/mixins/games.js';

export default {
  name: 'App',
  components: {
    ChooseCollectionCard,
    HelpModal
  },
  mixins: [
    Games
  ],
  data: function () {
    return {
      data: null,
      filters: {
        excludeExpansions: false
      },
      games: null,
      haveUsername: false,
      inputtedUsername: null,
      pickedGame: {
        imageUrl: null,
        name: null,
        playerCount: '',
        playtime: null,
        rating: null
      },
      pickedGameData: null,
      pickedGameRating: null,
      result: null,
      username: null
    }
  },
  computed: {
    ...mapGetters([
      'getGames',
      'getUsername'
    ])
  },
  mounted() {
    this.updateGames();
  },
  methods: {
    ...mapActions({
      setGames: 'setGames',
      setUsername: 'setUsername'
    }),
    applyFilters() {
      if(this.filters.excludeExpansions) {
        this.games.filter(game => {
          console.log(game);
        });
      }
    },
    loadDevelopersCollection() {
      this.inputtedUsername = 'jammymonkey';
      this.getData();
    },
    pickAGame(){
      let gameNumber = Math.floor(Math.random() * this.games.length);
      let gameId = this.games[gameNumber]._attributes.objectid;
    
      let url = `https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`;
      axios.get(url).then((response) => {
        let jsonResult = convert.xml2json(response.data, {compact: true, spaces: 4});

        let data = JSON.parse(jsonResult);
        this.pickedGameData = data.items.item;
        if(this.pickedGameData.name._attributes) {
          this.pickedGame.name = this.pickedGameData.name._attributes.value;
        } else {
          this.pickedGame.name = this.pickedGameData.name[0]._attributes.value;
        }
        this.pickedGame.imageUrl = this.pickedGameData.image._text;
        this.pickedGame.playtime = this.pickedGameData.playingtime._attributes.value;
        let rating = this.pickedGameData.statistics.ratings.average._attributes.value;
        this.pickedGame.rating = (Math.ceil( rating * 10 ) / 10).toFixed(1);
        this.pickedGame.playerCount = `${this.pickedGameData.minplayers._attributes.value} - 
        ${this.pickedGameData.maxplayers._attributes.value}`;
      });
    },
    showHelpModal() {
      this.$bvModal.show('help-modal');
    },
    updateGames() {
      this.games = this.getGames;
      this.username = this.getUsername;
    }
  }
}
</script>

<style>
.app-container {
  min-height: 100vh;
}

.navbar {
  padding: 1rem;
  margin-bottom: 2rem;
}

.navbar-brand {
  padding-right: 4rem;
}

input {
  max-width: 25rem;
}

.selector--button {
  margin-left: 1.5rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.app--card {
  width: 100%;
  max-width: 60rem;
}

.app--card-link {
  color: #2c3e50;
  cursor: pointer;
  text-decoration: underline;
}

/* Result card */

.result--image {
  width: 100%;
}

@media only screen and (min-width: 400px) {
  .result--image {
    max-width: 20rem;
    width: 50%;
    margin-right: 5rem;
  }  
}

.result--details {
  text-align: left;
  color: #3b4753;
  min-width: 20rem;
}
</style>
