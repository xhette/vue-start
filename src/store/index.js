import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],

    cartProductsLoad: false,
    cartProductsLoadFailed: false,
    cartAmountLoad: false,

    orderInfo: null,
    orderProductsLoad: false,
    orderProductsLoadFailed: false,
  },
  mutations: {
    updateOrderInfo(state, order) {
      state.orderInfo = order;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
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

    updateUserKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateProductCartData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    orderInfo(state) {
      return state.orderInfo;
    },

    orderProductsAmount(state, getters) {
      return getters.orderInfo.basket.items.reduce((acc, item) => (item.quantity + acc), 0);
    },

    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },

    orderLoadStatus(state) {
      return state.orderProductsLoad;
    },

    orderLoadFailed(state) {
      return state.orderProductsLoadFailed;
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },

    cartTotalAmount(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => (item.amount + acc), 0);
    },

    cartLoadStatus(state) {
      return state.cartProductsLoad;
    },

    cartLoadFailed(state) {
      return state.cartProductsLoadFailed;
    },

    cartAmountLoad(state) {
      return state.cartAmountLoad;
    },
  },

  actions: {
    loadOrderInfo(context, orderId) {
      context.state.orderLoadStatus = true;
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        })
        .catch(() => {
          context.state.orderProductsLoadFailed = true;
        })
        .finally(() => {
          context.state.orderProductsLoad = false;
        });
    },

    loadCart(context) {
      context.state.cartProductsLoad = true;
      return (new Promise((resolve) => setTimeout(resolve, 2)))
        .then(() => {
          return axios.get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserKey', response.data.user.accessKey);
              }
              context.commit('updateProductCartData', response.data.items);
              context.commit('syncCartProducts');
            })
            .catch(() => {
              context.state.cartProductsLoadFailed = true;
            })
            .finally(() => {
              context.state.cartProductsLoad = false;
            });
        });
    },

    addToProductCart(context, { productId, productQuantity }) {
      context.state.cartProductsLoad = true;
      context.state.cartAmountLoad = true;

      return (new Promise((resolve) => setTimeout(resolve, 2)))
        .then(() => {
          return axios.post(`${API_BASE_URL}/api/baskets/products`, {
            productId: productId,
            quantity: productQuantity,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              context.commit('updateProductCartData', response.data.items);
              context.commit('syncCartProducts');
            })
            .finally(() => {
              context.state.cartProductsLoad = false;
              context.state.cartAmountLoad = false;
            });
        });
    },

    updateProductAmount(context, { productId, productQuantity }) {
      context.state.cartAmountLoad = true;

      if (productQuantity < 1) {
        return;
      }

      return (new Promise((resolve) => setTimeout(resolve, 2)))
        .then(() => {
          context.commit('updateProductCartAmount', { productId: productId, amount: productQuantity });
          return axios.put(`${API_BASE_URL}/api/baskets/products`, {
            productId: productId,
            quantity: productQuantity,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              context.commit('updateProductCartData', response.data.items);
            })
            .catch(() => {
              context.commit('syncCartProducts');
            })
            .finally(() => {
              context.state.cartAmountLoad = false;
            });
        });
    },

    deleteFromCart(context, productId) {
      context.state.cartProductsLoad = true;
      context.state.cartAmountLoad = true;

      return axios.delete(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
        {
          data: {
            productId: productId,
          },
        })
        .then((response) => {
          context.commit('updateProductCartData', response.data.items);
          context.commit('syncCartProducts');
        })
        .finally(() => {
          context.state.cartProductsLoad = false;
          context.state.cartAmountLoad = false;
        });
    },
  },
});
