<template>
    <div class="container my-5 py-5">
        <div class="row">
            <user-menu class="col-3" @changeComponent="$router.push($event)"></user-menu>
            <div class="col-9">
                <component :is="component[getRoute]"></component>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileDetails from '../user/ProfileDetails.vue';
import ChangePassword from '../user/ChangePassword.vue';
import TransactionHistory from '../user/TransactionHistory.vue';
import UserMenu from '../user/UserMenu.vue';
import UserProduct from '../user/UserProduct.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

const route = useRoute();

const component = {
    "profile-details": ProfileDetails,
    "change-password": ChangePassword,
    "transaction-history": TransactionHistory,
    "user-product": UserProduct
}

const getRoute = computed(() => {
    return route.params.component
})

const store = useStore()
const userData = computed(() => {
    return store.state.auth.userLogin
})
</script>