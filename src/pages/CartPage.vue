<template>
   <main class="content container">
      <BasePreloader v-if="loadStatus"/>
      <BaseError v-else-if="loadFailed"/>
      <div v-else>
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link" href="index.html">
                Каталог
              </a>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                Корзина
              </a>
            </li>
          </ul>

          <h1 class="content__title">
            Корзина
          </h1>
          <span class="content__info">
            {{ products.length }} товара
          </span>
        </div>

        <section class="cart">
          <form class="cart__form form" action="#" method="POST">
            <div class="cart__field">
              <ul class="cart__list">
              <CartItem v-for="item in products" :key="item.productId" :item="item" />
              </ul>
            </div>

            <div class="cart__block">
              <p class="cart__desc">
                Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
              </p>
              <p class="cart__price">
                Итого: <span>{{ totalPrice | numberFormatter }} ₽</span>
              </p>

              <router-link tag="button" :to="{name : 'order'}" class="cart__button button button--primery" type="submit" :disabled="products.length === 0">
                Оформить заказ
              </router-link>
            </div>
          </form>
        </section>
      </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormatter from '@/helpers/numberFormatter';
import CartItem from '@/components/CartItem.vue';
import BasePreloader from '../components/BasePreloader.vue';
import BaseError from '../components/BaseError.vue';

export default {
  components: { CartItem, BasePreloader, BaseError },
  computed: {
    ...mapGetters({
      products: 'cartDetailsProducts', totalPrice: 'cartTotalPrice', loadStatus: 'cartLoadStatus', loadFailed: 'cartLoadFailed',
    }),
  },
  filters: {
    numberFormatter,
  },
};
</script>
