<template>
  <div>
    <app-navbar :menuItems="menuItems" />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';

export default {
  name: 'App',

  data() {
    return {
      menuItems: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'FAQ', link: '/faq' },
        { text: 'Login', link: '/login' },
        { text: 'Register', link: '/register' },
      ],
    };
  },

  components: {
    AppNavbar,
  },
};
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
@import 'assets/styles/main.scss';
</style>
