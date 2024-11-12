<template>
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div>
                    <p>Edit Profile</p>
                </div>
                <div class="d-flex">
                    <div class="col-4">
                        <h6>Photo</h6>
                    </div>
                    <div class="d-flex align-items-center justify-content-between col-8">
                        <div class="d-flex align-items-center">
                            <base-input 
                                class="bg-white"
                                style="border: 0px;"
                                type="file" 
                                identity="profileImage"
                                label="Profile Photo"
                                isImage="true"
                                @change="handleImageChange">
                                <div class="border p-1 mt-2 rounded-circle">
                                    <img :src="userData.imageLink" 
                                         alt=""
                                         class="rounded-circle" 
                                         width="140" 
                                         height="150" 
                                         style="object-fit: cover;">
                                </div>
                                <div class="text-center" style="transform: translateY(-24px);">
                                    <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                                </div>
                            </base-input>
                            <p class="mt-3">JPG, JPEG or PNG, 1MB max.</p>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash-can" style="color: #000000;"></i>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <form @submit.prevent="updateProfile">
                        <div class="mb-3">
                            <base-input type="text" id="editfullname" label="Full Name" v-model="userData.fullname">
                            </base-input>
                        </div>
                        <div class="mb-3">
                            <base-input type="text" id="editusername" label="Username" v-model="userData.username">
                            </base-input>
                        </div>
                        <div>
                            <base-input type="email" id="editemail" label="Email" v-model="userData.email">
                            </base-input>
                        </div>
                    </form>
                </div>
                <div class="col-12 justify-content-end d-flex">
                    <button type="button" class="btn btn-primary mt-3" 
                            style="background-color: teal; border: 1px solid black;"
                            @click="updateProfile">
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '../ui/BaseInput.vue';

export default {
    components: { BaseInput },
    setup() {
        const store = useStore();
        const userData = computed(() => store.state.auth.userLogin);

        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener("load", () => {
                userData.value.imageLink = reader.result;
            });
        };
        const updateProfile = () => {
            store.dispatch('auth/updateUserData', userData.value)
                .then(() => alert("Profile updated successfully"))
                .catch(err => console.error("Error updating profile:", err));
        };

        return {
            userData,
            handleImageChange,
            updateProfile
        };
    }
};
</script>