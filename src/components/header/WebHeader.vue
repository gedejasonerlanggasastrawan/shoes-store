
<script setup>
import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <header
     class="shadow-sm container-fluid bg-white py-3 border-bottom fixed-top" style="font-family: sans-serif;">
        <div 
            class="container-md d-flex justify-content-between align-items-center">
            <div class="col-2">
                <router-link to="/" class="logo py-0 d-flex align-items-center text-decoration-none">
                    <img src="@/assets/images/running.png" width="60px">
                    <span class="mb-0 ms-2 fw-bold" style="color: teal">WearIT</span>
                </router-link>
            </div>
            <div class="col-10">
                <navigation-bar></navigation-bar>
            </div>
        </div>
    </header>
</template>
