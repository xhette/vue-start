<template>
<div>
     <a class="catalog__pic" href="#">
              <img :src="product.image" srcset="img/radio@2x.jpg 2x" :alt="product.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{product.title}}
              </a>
            </h3>

            <span class="catalog__price">
              {{product.price}}₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="(color) in product.colors" :key="color">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                    type="radio" :value="color">
                  <span class="colors__value" :style="'background-color:' + color" style="border-color: #000">
                  </span>
                </label>
              </li>
              <!--<li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" value="#8BE000" v-model="color">
                  <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                </label>
              </li>-->
            </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product'],
};
</script>
