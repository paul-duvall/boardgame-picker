<template>
  <b-container id="app">
    <div>
      <h1>Lazy Gamer</h1>
      <p>Want to play a game but can't be bother to decide which one? Enter your BGG username and you can randomly select
         a game that you have in your collection.
      </p>
    </div>
    <div>
      <b-form-input v-model="inputtedUsername" placeholder="Enter BGG username"></b-form-input>
      <b-button class="mt-4" @click="getData()">
        <span v-if="haveUsername">Get a different collection</span>
        <span v-else>Get collection</span>
      </b-button>
    </div>
    <b-card class="mt-4" v-if="data">
          <h2>{{ username }}'s collection</h2>
          <p>Number of games: {{ games.length }}</p>
          <b-button @click="pickAGame()">
            <span v-if="pickedGame">Pick different game</span>
            <span v-else>Pick a game</span>
          </b-button>
          <b-button class="mx-3" v-b-toggle.collapse-1>Advanced settings</b-button>
    </b-card>
    <b-collapse id="collapse-1">
      <b-card class="mt-4">
        <h2>Advanced settings</h2>
        <b-form-checkbox
          v-model="filters.excludeExpansions"
        >
          Exclude expansions
        </b-form-checkbox>
        
        <b-button>Update results</b-button>
      </b-card>
    </b-collapse>
    <b-card class="mt-4 mb-4" v-if="pickedGameData">
      <div class="d-flex">
        <img class="result--image" :src="pickedGame.imageUrl">
        <div>
          <h2 class="result--name">{{ pickedGame.name }}</h2>
          <ul class="result--details">
            <li>Play time: {{ pickedGame.playtime }} minutes</li>
            <li>BGG average rating: {{ pickedGame.rating }}</li>
            <li>Number of players: {{ pickedGame.playerCount }}
            </li>
          </ul>
        </div>
      </div>
    </b-card>
    <app-footer />    
  </b-container>
</template>

<script>
const axios = require('axios');
const convert = require('xml-js');

import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppFooter
  },
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
  methods: {
    applyFilters() {
      if(this.filters.excludeExpansions) {
        this.games.filter(game => {
          console.log(game);
        });
      }
    },
    getData() {
      let url = `https://www.boardgamegeek.com/xmlapi2/collection?username=${this.inputtedUsername}&own=1`;
      this.$toast.open({
        message: 'This may take a moment!',
        duration: 2000,
        position: 'bottom',
        type: 'info'
      });
      axios.get(url).then((response) => {
        let jsonResult = convert.xml2json(response.data, {compact: true, spaces: 4});
      
        this.data = JSON.parse(jsonResult);
        this.games = this.data.items.item;
        this.username = this.inputtedUsername;
        this.inputtedUsername = null;
        this.haveUsername = true;
      });
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
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.result--name {
  margin-top: 30px;
}
.result--image {
  max-width: 350px;
  width: 100%;
}

.result--details {
  list-style: none;
  text-align: left;
  color: #3b4753;
}
</style>
