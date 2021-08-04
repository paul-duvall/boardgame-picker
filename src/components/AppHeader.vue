<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Game Picker</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Game picker</b-nav-item>
            <b-nav-item href="#">Collection</b-nav-item>
            <b-nav-item href="#">Help</b-nav-item>
          </b-navbar-nav>       
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
