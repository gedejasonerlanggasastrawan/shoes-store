<script setup>
import product from '@/store/product';

defineProps({
    products: Array
})
</script>

<template>
    <div class="container">
        <div class="popular__list row d-flex">
            <div class="col-10 col-lg-2 col-md-3 col-sm-4" style="padding: 6px; padding-bottom: 12px;" v-for="(product, index) in products" :key="index"
            v-show="index < 5">
                <router-link
                :to="`product/${product.id}`" 
                class="card position-relative text-decoration-none" 
                style="height: 300px; color: black">
                    <img 
                    :src="product.image" class="card-img-top" 
                    :alt="product.name" 
                    style="height:150px; width:auto;">
                    <div class="card-body">
                        <div class="h-auto">
                            <h4 class="fs-5 mb-0" style="color: teal;">Rp.{{ product.price }}</h4>
                        </div>
                        <p class="mb-20">{{ product.name }}</p>
                        <div class="d-flex justify-content-between ">
                            <p>{{ product.size }}/{{ product.color }}</p>
                            <i class="fa-regular fa-heart" style="color: #000000;"> 12</i>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-10 col-lg-2 col-md-3 col-sm-4" style="padding: 6px; padding-bottom: 12px;">
                <router-link to="/product-list-all" class="card position-relative" style="height: 300px; background-color: #f5f5f5; text-decoration: none;">
                    <div class="card-body position-relative justify-content-center d-flex align-items-center">
                        <div style="color: teal;">
                            <p>See All Product</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

