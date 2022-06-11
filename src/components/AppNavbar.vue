<template>
  <header class="header">
    <nav :class="isHome" class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item has-text-white is-size-2 has-text-weight-bold"
            href="#"
          >
            {{ title }}
          </a>
          <span
            role="button"
            tabindex="0"
            class="navbar-burger burger has-text-white"
            data-target="navbar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbar-menu" class="navbar-menu">
          <div class="navbar-end">
            <div v-if="isAuthenticated" class="navbar-item">
              {{ user.email }}
            </div>
            <router-link
              v-for="item in menuItems"
              :key="item"
              :to="item.link"
              class="navbar-item nav-web"
            >
              {{ item.text }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import useAuth from '@/compositions/useAuth';

export default {
  props: {
    title: {
      type: String,
      default: 'Exchangario',
    },
    menuItems: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { user, isAuthenticated } = useAuth();

    return {
      user,
      isAuthenticated,
    };
  },

  computed: {
    isHome() {
      return this.$route.path === '/' ? '' : 'with-background';
    },
  },
};
</script>
