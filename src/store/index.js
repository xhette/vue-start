import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      if (amount > 0) {
        if (item) {
          item.amount += amount;
        } else {
          state.cartProducts.push({
            productId,
            amount,
          });
        }
      }
    },
    updateProductCartAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        if (amount > 0) {
          item.amount = amount;
        }
      }
    },
    deleteProductFromCart(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => (
        {
          ...item,
          product: products.find((p) => p.id === item.productId),
        }
      ));
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
