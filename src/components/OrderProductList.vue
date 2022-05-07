<template>
<div>
   <ul class="cart__orders">
            <li class="cart__order" v-for="orderItem in cartProducts" :key="orderItem.productId">
              <h3>{{orderItem.product.title}}</h3>
              <b>{{orderItem.product.price | numberFormatter}}₽</b>
              <span>Артикул: {{orderItem.product.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{cartProductsAmount}}</b> товара на сумму <b>{{cartTotalPrice | numberFormatter}}₽</b></p>
          </div>
</div>
</template>
<script>
import numberFormatter from '@/helpers/numberFormatter';

export default {
  filters: {
    numberFormatter,
  },
  props: ['cartProducts', 'cartTotalPrice', 'cartProductsAmount'],
};
</script>
