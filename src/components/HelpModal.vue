<template>
    <div>
        <b-modal 
            id="help-modal" 
            title="About the Game Picker app" 
            cancel-disabled
            hide-header-close
        >
            <p class="my-4">People who are crazy enough to own enough boardgames that they need
                to use an online service to keep track of them use Boardgamegeek. This application
                allows someone who has such a list of games to randomly select one to play.
            </p>
            <p>If you do not have an Boardgamegeek account, but would like to see this application
                in action, you can <a class="modal--link" @click="requestDevelopersCollection()">select my collection</a>. Ask nicely, and I might even lend you
                the game you randomly select.
            </p>
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="outline-secondary" @click="ok()">
                    OK
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'HelpModal',
    methods: {
        requestDevelopersCollection() {
            console.log('hi from help modal');
            this.$emit('loadDevelopersCollection');
            this.$bvModal.hide('help-modal');
        }
    }
}
</script>

<style scoped>
.modal--link {
  color: #2c3e50;
  cursor: pointer;
  text-decoration: underline;
}
</style>