<template>
   <main class="content container">
    <BasePreloader v-if="productLoadStatus" class="item"/>
    <BaseError v-else-if="productLoadFailed" class="item"/>
    <div class="product-page-container" v-if="productData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
              {{category.title}}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{product.title}}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">{{product.id}}</span>
          <h2 class="item__title">
            {{product.title}}
          </h2>
          <div class="item__form" @submit.prevent="addToCart">
            <form class="form" action="#" method="POST">
              <b class="item__price">
                {{product.price | numberFormatter}} ₽
              </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item" v-for="(color) in product.colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio"
                      name="color-item" :value="color.code">
                      <span class="colors__value" :style="'background-color:' + color.code" style="border-color: #000">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio"
                      name="sizes-item" value="32">
                      <span class="sizes__value">
                        32gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio"
                      name="sizes-item" value="64">
                      <span class="sizes__value">
                        64gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio"
                      name="sizes-item" value="128" checked="">
                      <span class="sizes__value">
                        128gb
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button type="button" @click.prevent="productAmount--" aria-label="Убрать один товар">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" v-model.number="productAmount" name="count">

                  <button type="button" @click.prevent="productAmount++" aria-label="Добавить один товар">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <button class="button button--primery" type="submit" :disabled="productAdding || productAdded">
                  <span class="submit-animation" :hidden="productAdding || productAdded">В корзину</span>
                  <span class="loading-animation" :hidden="!productAdding"><i class="fa fa-refresh" id="loading-icon"></i></span>
                  <span class="checked-animation" :hidden="!productAdded"><i class="fa fa-check"></i></span>
                </button>
              </div>
                <div style="margin: 10px 0" v-if="productAddingFailed">
                  <i class="fa fa-exclamation"></i><span style="margin: 0 10px">Произошла ошибка добавления товара в корзину</span>
                </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>
            <a href="#">
              Все характеристики
            </a>
            <h3>Что это?</h3>
            <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
            </p>
            <h3>Дизайн</h3>
            <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { API_BASE_URL } from '@/config';
import gotoPage from '@/helpers/gotoPage';
import numberFormatter from '@/helpers/numberFormatter';
import BasePreloader from '../components/BasePreloader.vue';
import BaseError from '../components/BaseError.vue';

export default {
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoadStatus: false,
      productLoadFailed: false,

      productAdded: false,
      productAdding: false,
      productAddingFailed: false,
    };
  },

  components: { BasePreloader, BaseError },

  filters: {
    numberFormatter,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData ? this.productData.category : 1;
    },
  },
  methods: {
    ...mapActions(['addToProductCart']),
    gotoPage,

    loadProduct() {
      this.productLoadStatus = true;
      this.productLoadFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => { this.productData = response.data; })
        .catch(() => { this.productLoadFailed = true; })
        .then(() => { this.productLoadStatus = false; });
    },

    addToCart() {
      this.productAdded = false;
      this.productAdding = true;
      clearTimeout(this.addedTimer);

      this.addToProductCart({ productId: this.product.id, productQuantity: this.productAmount })
        .then(() => {
          this.productAdded = true;
        })
        .catch(() => {
          this.productAddingFailed = true;
        })
        .finally(() => {
          this.productAdding = false;
        });

      this.addedTimer = setTimeout(() => {
        this.productAdded = false;
        this.productAddingFailed = false;
      }, 3000);
    },
  },
  watch: {
    productAmount() {
      this.productAmount = Number.isNaN(this.productAmount) ? 1 : Math.max(1, this.productAmount);
    },
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
