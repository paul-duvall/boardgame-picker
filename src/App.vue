<template>
  <div class="app-container d-flex flex-column justify-content-between">
    <app-header />
    <b-container id="app" class="d-flex flex-column align-items-center">
      <router-view></router-view> 
    </b-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: {
    AppFooter,
    AppHeader
  },
}
</script>