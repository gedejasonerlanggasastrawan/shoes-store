<script setup>
import { defineProps } from 'vue';
import ProductFormHeader from './ProductFormHeader.vue';
import ProductFormBody from './ProductFormBody.vue';

defineProps({
  isEdit: { type: Boolean, default: false }
});
</script>

<template>
    <ul class="list-group">
        <product-form-header></product-form-header>
        <product-form-body
            :isEdit="isEdit">
        </product-form-body>
    </ul>
</template>

