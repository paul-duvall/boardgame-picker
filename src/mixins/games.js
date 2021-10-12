const axios = require('axios');
const convert = require('xml-js');

export default {
  methods: {
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
        // this.games = this.data.items.item;
        this.setGames(this.data.items.item);
        // manage username (set to state and data)
        this.setUsername(this.inputtedUsername);
        this.username = this.inputtedUsername;
        this.inputtedUsername = null;
        this.haveUsername = true;
        this.vm.$emit('updateGames');
        });
    }
    }
 }