<template>
<div>
     <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
              <img :src="product.image" srcset="img/radio@2x.jpg 2x" :alt="product.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#">
                {{product.title}}
              </a>
            </h3>

            <span class="catalog__price">
              {{product.price | numberFormatter}}₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="(color) in product.colors" :key="color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                    type="radio" :value="color.id">
                  <span class="colors__value" :style="'background-color:' + color.code">
                  </span>
                </label>
              </li>
            </ul>
</div>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormatter from '@/helpers/numberFormatter';

export default {
  filters: {
    numberFormatter,
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>
