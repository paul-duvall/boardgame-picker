<template>
  <div id="app">
    
      <input v-model="username" type="text">
      <button @click="getData()">Set username</button>
    
    
    <button @click="pickAGame()">Pick a game</button>
    <div v-if="result" class="result">{{ result }}</div>
  </div>
</template>

<script>
const axios = require('axios');
const convert = require('xml-js');

export default {
  name: 'App',
  data: function () {
    return {
      games: null,
      gameNames: [],
      result: null,
      username: null
    }
  },
  methods: {
    getData() {
      let url = `https://www.boardgamegeek.com/xmlapi/collection/${this.username}?own=1`;
      axios.get(url)
      .then((response) => {
        var result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
      
        let results = JSON.parse(result1);
        this.games = results.items.item;
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
