<template>
  <div id="app">
    <div>
      <h1>Lazy Gamer</h1>
      <p>Want to play a game but can't be bother to decide which one? Enter your BGG username and you can randomly select
         a game that you have in your collection.
      </p>
    </div>
    <div>
      <input v-model="username" type="text">
      <button @click="getData()">Get collection</button>
      <div v-if="data">
          <h2>{{ username }}'s collection</h2>
          Number of games: {{ games.length }}
      </div>
    </div>
    <div v-if="games">
      <button @click="pickAGame()">Pick a game</button>
      <div v-if="result" class="result">{{ result }}</div>
    </div>    
    
  </div>
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
      this.result = this.gameNames[gameNumber];
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.result {
  margin-top: 30px;
}
</style>
