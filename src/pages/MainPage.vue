<template>
 <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom"
      :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategoryId"
      :colorValue.sync="filterColor"/>
      <section class="catalog">
        <BasePreloader v-if="productsLoadStatus"/>
        <BaseError v-else-if="productsLoadFailed"/>
        <ProductList v-else :products="products"/>
        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<style>
  #loading-icon {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePreloader from '../components/BasePreloader.vue';
import BaseError from '../components/BaseError.vue';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, BasePreloader, BaseError,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '0',

      page: 1,
      productsPerPage: 9,

      productsData: null,
      productsLoadStatus: false,
      productsLoadFailed: false,
    };
  },
  watch: {
    page() {
      this.loadProducts();
    },

    filterPriceFrom() {
      this.loadProducts();
    },

    filterPriceTo() {
      this.loadProducts();
    },

    filterCategoryId() {
      this.loadProducts();
    },

    filterColor() {
      this.loadProducts();
    },
  },
  computed: {

    productsOnPage() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },

    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            image: product.image.file.url,
          };
        }) : [];
    },
  },

  methods: {
    loadProducts() {
      this.productsLoadStatus = true;
      this.productsLoadFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          },
        }).then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadFailed = true; })
          .then(() => { this.productsLoadStatus = false; });
      }, 500);
    },
  },

  created() {
    this.loadProducts();
  },
};

</script>
