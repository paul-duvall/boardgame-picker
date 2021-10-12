<template>
    <b-card 
        bg-variant="light" 
        header="Choose collection" 
        class="app--card mt-4"
      >
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
          <b-form-input v-model="inputtedUsername" placeholder="Enter BGG username"></b-form-input>
          <b-button class="selector--button mt-3 mt-md-0" @click="getData()">
            <span v-if="haveUsername">Get a different collection</span>
            <span v-else>Get collection</span>
          </b-button>
        </div>
      </b-card>
</template>

<script>
import { mapActions } from 'vuex';
import Games from '@/mixins/games.js';

export default {
  name: 'CollectionCard',
  mixins: [
    Games
  ],
  data() {
      return {
          haveUsername: false,
          inputtedUsername: null
      }
  },
  methods: {
        ...mapActions({
        setGames: 'setGames',
        setUsername: 'setUsername'
        }),
  }
}
</script>