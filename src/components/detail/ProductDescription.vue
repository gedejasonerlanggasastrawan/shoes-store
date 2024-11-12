<script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const loading = ref(true);
  const showModal = ref(false);
  
  const productDetail = computed(() => store.state.product.productDetail);
  const productInfo = computed(() => ({
    Category: productDetail.value.category,
    Size: productDetail.value.size,
    Condition: "Very Good",
    Color: productDetail.value.color,
    Uploaded: "5 hours ago",
    Shipping: `Rp.${productDetail.value.shipping}`
  }));
  
  const fetchProductDetail = async () => {
    loading.value = true;
    await store.dispatch("product/getProductDetail", route.params.id);
    loading.value = false;
  };
  
  onMounted(fetchProductDetail);
  watch(() => route.params.id, fetchProductDetail);
  
  const addToCart = async (product) => {
    try {
      const productToAdd = {
        ...product,
        id: product.id || Date.now(),
        quantity: 1
      };
      await store.dispatch("cart/addProductToCart", productToAdd);
      showModal.value = true;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
  const continueShopping = () => {
    showModal.value = false;
  };
  </script>
  


<template>
    <div class="container" style="font-family: sans-serif;">
      <div class="row my-5">
        <div class="col-8">
          <img :src="productDetail.image" alt="Product Image" class="border" style="width: 100%;">
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">Rp.{{ productDetail.price }}</h5>
                <i class="fa-regular fa-heart" style="color: #000;"></i>
              </div>
              <h6>{{ productDetail.name }}</h6>
              <div class="d-flex" style="font-size: 15px;">
                <p>{{ productDetail.size }}/{{ productDetail.color }}</p>
                <ul class="d-flex">
                  <li class="p-0">Very Good</li>
                </ul>
                <ul>
                  <li class="p-0">Denpasar</li>
                </ul>
              </div>
              <hr>
              <p>Item Description</p>
              <h6>{{ productDetail.description }}</h6>
              <div class="d-flex">
                <div class="col-lg-12">
                  <ul type="none" style="margin-left: -30px;">
                    <div class="row" v-for="(value, key) in productInfo" :key="key">
                      <li class="col-6">{{ key }}</li>
                      <li class="col-6">{{ value }}</li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary w-100 mb-2" style="background-color: teal; border: 1px solid black;">Buy now</a>
              <button @click="addToCart(productDetail)" class="btn btn-outline-primary w-100" style="color: teal; border: 1px solid black; background-color: white">Add to Cart</button>
              <div class="d-flex align-items-center my-3">
                <i class="fas fa-user-circle me-2" style="font-size: 40px; color: teal;"></i>
                <div>
                  <h6 class="mb-0">Abdul Salman</h6>
                  <div class="d-flex align-items-center" style="font-size: 14px; color: #f39c12;">
                    <i class="fas fa-star" v-for="n in 5" :key="n"></i>
                    <span class="text-muted ms-1">(999)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="showModal" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-body text-center">
              <i class="fas fa-shopping-cart mb-3" style="font-size: 100px; color: teal;"></i>
              <h5 class="mb-3">Product successfully added to cart</h5>
              <p>"{{ productDetail.name }}" successfully added to cart. Check now on the cart or continue shopping.</p>
              <div class="mt-4">
                <button @click="continueShopping" class="btn btn-outline-primary w-100 my-1 btn-continue" style="color: teal; border: 1px solid black;">Continue shopping</button>
                <router-link to="/cart" class="btn btn-primary w-100 my-1" style="background-color:teal; border: 1px solid black;">Go to cart</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .btn-continue:hover {
    background-color: teal;
    color: white !important;
  }
  </style>
  