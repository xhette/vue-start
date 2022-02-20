<template>
      <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
       <svg width="30" height="21" fill="currentColor"><use xlink:href="#icon-cart"></use></svg>
        <span class="header__count" aria-label="Количество товаров" v-if="loadStatus"><i class="fa fa-refresh" id="loading-icon"></i></span>
        <span class="header__count" aria-label="Количество товаров" v-else>{{totalAmount}}</span>
      </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ totalAmount: 'cartTotalAmount', loadStatus: 'cartAmountLoad' }),
  },
};
</script>
