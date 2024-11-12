<template>
    <div class="img1 align-items-center d-flex">
        <div class="card ms-5" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">Ready to Find Your Dream Shoes?</h5>
                <a href="#" class="btn btn mt-3 w-100 fw-bold text-light" style="background-color: teal;">Explore Now</a>
            </div>
        </div>
    </div>
    <div class="container-md my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title">
                <h2>Popular items</h2>
            </div>
            <div>
                <router-link to="/product-list-all" style="color: teal; text-decoration: none;">See all</router-link>
            </div>
        </div>
        <product-list
        :products="productList"
        v-if="productListStatus">
        </product-list>
    </div>
    <!-- Tambahkan Section untuk Shop by Category -->
    <div class="container-md my-5">
        <div class="d-flex flex-wrap mb-3">
            <div>
                <h2>Shop by Category</h2>
            </div>
        </div>
        <product-category
        :products="productList"
        v-if="productListStatus">
        </product-category>
    </div>
    <div class="container-md my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title">
                <h2>New Product</h2>
            </div>
            <div>
                <router-link to="/product-list-all" style="color: teal; text-decoration: none;">See all</router-link>
            </div>
        </div>
        <product-list
        :products="productList"
        v-if="productListStatus">
        </product-list>
    </div>
</template>

<script setup>
import ProductList from '../product/ProductList.vue';
import ProductCategory from '../product/ProductCategory.vue';
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData");
        productListStatus.value = true;
        productList.value = store.state.product.products;
    } catch (error) {
        console.log(error);
    }
});
</script>