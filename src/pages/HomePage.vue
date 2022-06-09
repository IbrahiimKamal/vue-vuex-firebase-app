<template>
  <div>
    <app-hero />
    <exchange-list :exchanges="exchanges" />
    <exchange-pagination />
  </div>
</template>

<script>
import AppHero from '@/components/AppHero.vue';
import ExchangeList from '@/components/ExchangeList.vue';
import ExchangePagination from '@/components/ExchangePagination.vue';

export default {
  name: 'App',

  computed: {
    exchanges() {
      return this.$store.state.exchange.items;
    },
  },

  created() {
    this.$store.dispatch('exchange/getExchanges');
  },

  components: {
    AppHero,
    ExchangeList,
    ExchangePagination,
  },
};
</script>
