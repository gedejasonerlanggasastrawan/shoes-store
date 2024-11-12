<script setup>
import SearchMenu from './SearchMenu.vue';
import SignupMenu from './SignupMenu.vue';
import ProfileMenu from './ProfileMenu.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const menuComponent = ref("signup-menu");
const store = useStore();

const components = {
    'signup-menu': SignupMenu,
    'profile-menu': ProfileMenu
}

const getToken = computed(() => {
    return store.state.auth.token;
});

if (!getToken.value) {
    menuComponent.value = "signup-menu";
} else {
    menuComponent.value = "profile-menu";
}

watch(getToken, (newValue, oldValue) => {
    if (!newValue) {
        menuComponent.value = "signup-menu";
    } else {
        menuComponent.value = "profile-menu";
    }
});
</script>


<template>
    <div class="header__navbar row col-11 d-flex justify-content-between align-items-center row">
        <div
            class="header__navbar justify-content-between align-items-center col-8">
            <search-menu></search-menu>
        </div>
        <div
            class="header__navbar justify-content-between align-items-center col-3">
            <component :is="components[menuComponent]"></component>
        </div>
    </div>
</template>

