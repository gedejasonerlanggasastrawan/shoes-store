<script setup>
import product from '@/store/product';

defineProps({
    products: Array
})
</script>

<template>
    <div class="container">
        <div class="d-flex flex-wrap brand-list">
        <button class="btn btn-category btn-outline-secondary me-2">Adidas</button>
        <button class="btn btn-category btn-outline-secondary me-2">Nike</button>
        <button class="btn btn-category btn-outline-secondary me-2">Converse</button>
        <button class="btn btn-category btn-outline-secondary me-2">Reebok</button>
        <button class="btn btn-category btn-outline-secondary me-2">Skechers</button>
        <button class="btn btn-category btn-outline-secondary me-2">Aerostreet</button>
        <button class="btn btn-category btn-outline-secondary me-2">Puma</button>
        <button class="btn btn-category btn-outline-secondary me-2">New Balance</button>
        <button class="btn btn-category btn-outline-secondary me-2">Asics</button>
        <button class="btn btn-category btn-outline-secondary me-2">CAT</button>
        <button class="btn btn-category btn-outline-secondary me-2">Bata</button>
        <button class="btn btn-category btn-outline-secondary me-2">Kasogi</button>  
      </div>
    </div>
</template>



<style scoped>
.btn-category {
    color: teal
}

.btn-category:hover {
    background-color: teal;
    color: white;
}
</style>