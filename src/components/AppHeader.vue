<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Game Picker</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Game picker</router-link></b-nav-item>
            <b-nav-item><router-link to="/collection">Collection</router-link></b-nav-item>
          </b-navbar-nav>       
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
