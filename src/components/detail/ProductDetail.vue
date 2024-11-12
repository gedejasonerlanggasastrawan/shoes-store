<script setup>
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  import ProductDescription from './ProductDescription.vue';
  import ProductListAll from "../product/ProductListAll.vue";
  import { onMounted, ref } from "vue";
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  
  const productListAllStatus = ref(false);
  const productListAll = ref();
  const selectedProductId = ref(route.params.id);
  
  onMounted(async () => {
    await store.dispatch("product/getProductDetail", route.params.id);
  });
  
  onMounted(async () => {
    try {
      await store.dispatch("product/getProductData");
      productListAllStatus.value = true;
      productListAll.value = store.state.product.products;
    } catch (error) {
      console.log(error);
    }
  });
  
  function handleProductSelected(productId) {
    router.push({ name: "detailPage", params: { id: productId } });
  }
  </script>
  

<template>
    <div class="col-12">
      <product-description :productId="selectedProductId"></product-description>
    </div>
    <div class="container-md py-5 my-5">
      <div class="d-flex justify-content-between align-items-center">
        <div class="popular__title">
          <h2>Other Products</h2>
        </div>
      </div>
      <product-list-all
        :products="productListAll"
        v-if="productListAllStatus"
        @product-selected="handleProductSelected"
      ></product-list-all>
    </div>
  </template>
  
  