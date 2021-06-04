<template>
  <b-container id="app">
    <div>
      <h1>Lazy Gamer</h1>
      <p>Want to play a game but can't be bother to decide which one? Enter your BGG username and you can randomly select
         a game that you have in your collection.
      </p>
    </div>
    <div>
      <b-form-input v-model="username" placeholder="Enter your username"></b-form-input>
      <b-button class="mt-4" @click="getData()">Get collection</b-button>
    </div>
    <b-card class="mt-4" v-if="data">
          <h2>{{ username }}'s collection</h2>
          <p>Number of games: {{ games.length }}</p>
          <b-button @click="pickAGame()">Pick a game</b-button>
    </b-card>
    <b-card class="mt-4" v-if="pickedGame">
      <div class="result">{{ pickedGame.name._text }}</div>
    </b-card>    
    
  </b-container>
</template>

<script>
const axios = require('axios');
const convert = require('xml-js');

export default {
  name: 'App',
  data: function () {
    return {
      data: null,
      games: null,
      gameNames: [],
      pickedGame: null,
      result: null,
      username: null
    }
  },
  methods: {
    getData() {
      let url = `https://www.boardgamegeek.com/xmlapi/collection/${this.username}?own=1`;
      this.$toast.open({
        message: 'This may take a moment!',
        duration: 2000,
        position: 'bottom',
        type: 'info'
      });
      axios.get(url).then((response) => {
        var jsonResult = convert.xml2json(response.data, {compact: true, spaces: 4});
      
        this.data = JSON.parse(jsonResult);
        this.games = this.data.items.item;
        this.games.forEach(game => {
          this.gameNames.push(game.name._text);
        });
      });
    },
    pickAGame(){
      let gameNumber = Math.floor(Math.random() * this.gameNames.length);
      this.pickedGame = this.games[gameNumber];
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
.result {
  margin-top: 30px;
}
</style>
