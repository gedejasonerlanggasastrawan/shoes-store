<template>
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="handleChangePassword">
                    <div class="mb-3">
                        <base-input
                            type="password" 
                            identity="oldPassword" 
                            placeholder="Old password" 
                            label="Old Password"
                            v-model="oldPassword"
                        ></base-input>
                    </div>
                    <div class="mb-3">
                        <base-input
                            type="password" 
                            identity="newPassword" 
                            placeholder="New password" 
                            label="New Password"
                            v-model="newPassword"
                        ></base-input>
                    </div>
                    <div class="mb-3">
                        <base-input
                            type="password" 
                            identity="confirmationPassword" 
                            placeholder="Confirmation new password" 
                            label="Confirm New Password"
                            v-model="confirmationPassword"
                        ></base-input>
                    </div>
                    <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
                    <div class="col-12 justify-content-end d-flex">
                        <button type="submit" class="btn btn-primary mt-3" style="background-color: teal; border: 1px solid black;">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const oldPassword = ref("");
const newPassword = ref("");
const confirmationPassword = ref("");
const passwordError = ref("");

const handleChangePassword = async () => {
    if (newPassword.value !== confirmationPassword.value) {
        passwordError.value = "New password and confirmation do not match.";
        return;
    }

    passwordError.value = "";

    try {
        await store.dispatch("auth/changePassword", {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
        });
        alert("Password changed successfully.");
    } catch (error) {
        passwordError.value = "Failed to change password. Please check the old password.";
        console.error(error);
    }
};
</script>
