<template>
    <main class="content container">
    <BasePreloader v-if="orderLoadStatus"/>
    <BaseError v-else-if="orderLoadFailed"/>
    <div v-else class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormInput v-model="formData.name" placeholder="Введите ваше полное имя" title="ФИО" :error="formError.name"/>
            <BaseFormInput v-model="formData.address" placeholder="Введите ваш адрес" title="Адрес доставки" :error="formError.address"/>
            <BaseFormInput v-model="formData.phone" placeholder="Введите ваш телефон" title="Телефон" :error="formError.phone" type="tel"/>
            <BaseFormInput v-model="formData.email" placeholder="Введи ваш Email" title="Email" :error="formError.email" type="email"/>
            <BaseFormText v-model="formData.comments" placeholder="Комментарий к заказу" title="Ваши пожелания" :error="formError.comments"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
            <OrderProductList :cartProducts="cartDetailsProducts" :cartTotalPrice="cartTotalPrice" :cartProductsAmount="cartTotalAmount" />
            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '../config';
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormText from '@/components/BaseFormTextArea.vue';
import OrderProductList from '@/components/OrderProductList.vue';
import BasePreloader from '../components/BasePreloader.vue';
import BaseError from '../components/BaseError.vue';

export default {
  components: {
    BaseFormInput, BaseFormText, OrderProductList, BasePreloader, BaseError,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['cartDetailsProducts', 'cartTotalAmount', 'cartTotalPrice', 'orderLoadStatus', 'orderLoadFailed']),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((err) => {
          this.formError = err.response.data.error.request || {};
          this.formErrorMessage = err.response.data.error.message;
        });
    },
  },
};
</script>
