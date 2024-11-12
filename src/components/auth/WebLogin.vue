<script setup>
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const store = useStore();
const router = useRouter();

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true
});

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/");
};
</script>

<template>
  <div class="container-fluid py-5 bg-light-gray">
    <div class="p-5 m-auto login-form bg-white">
      <div class="form-container">
        <form class="px-4 py-3 form-loginsignup border bg-light-gray" @submit.prevent="login">
          <div class="d-flex justify-content-between mb-3">
            <h5>Login to WearIT</h5>
          </div>
          <p>Enter your details below</p>

          <div class="mb-3">
            <base-input
              type="email"
              identity="email"
              placeholder="Enter your email"
              label="Email"
              v-model="loginData.email"
            />
          </div>

          <div class="mb-3">
            <base-input
              type="password"
              identity="password"
              placeholder="Enter your password"
              label="Password"
              @keyInput="passwordCheck"
              v-model="loginData.password"
            />
          </div>

          <base-button type="submit" class="btn btn-primary w-100" id="btn-login">Continue</base-button>
        </form>
      </div>
    </div>
  </div>
</template>



<style scoped>
.bg-light-gray {
  background-color: #f5f5f5;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.text-black {
  color: #000;
}

.btn-primary {
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:active {
  opacity: 0.9;
}
</style>
