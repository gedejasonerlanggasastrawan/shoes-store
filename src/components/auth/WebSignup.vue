<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: "",
  imageLink: ""
});

const showSuccessModal = ref(false);
const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const passwordCheck = () => {
  passwordStatusDisplay.value = signupData.password.length < 8 ? "block" : "none";
};

const confirmationPasswordCheck = () => {
  if (!signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
  } else {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "block";
  }
};

const checkImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (signupData.imageLink = reader.result);
  }
};

const store = useStore();
const router = useRouter();

const register = async () => {
  if (signupData.password !== signupData.confirmationPassword || signupData.password.length < 8) {
    signupData.confirmationPassword = "";
    signupData.password = "";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    showSuccessModal.value = true;
  }
};

const goToHomePage = () => {
  showSuccessModal.value = false;
  router.push("/");
};
</script>


<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div class="p-5 m-auto signup-form bg-white">
      <div class="form-container">
        <form class="px-4 py-3 form-loginsignup border" @submit.prevent="register">
          <div class="d-flex justify-content-between mb-3">
            <h5>Sign up</h5>
          </div>
          <p>Enter your details below</p>

          <div class="mb-3">
            <base-input
              type="text"
              identity="fullname"
              placeholder="Enter your fullname"
              label="Fullname"
              v-model="signupData.fullname"
            />
          </div>

          <div class="mb-3">
            <base-input
              type="text"
              identity="username"
              placeholder="Enter your username"
              label="Username"
              v-model="signupData.username"
            />
          </div>

          <div class="mb-3">
            <base-input
              type="email"
              identity="email"
              placeholder="Enter your email"
              label="Email"
              v-model="signupData.email"
            />
          </div>

          <div class="mb-3">
            <base-input
              type="password"
              identity="password"
              placeholder="Enter your password"
              label="Password"
              v-model="signupData.password"
              @keyInput="passwordCheck"
            />
            <p class="text-danger mt-1 fw-medium small-text" :style="{ display: passwordStatusDisplay }">
              The password field must be at least 8 characters
            </p>
          </div>

          <div class="mb-3">
            <base-input
              type="password"
              identity="confirmationPassword"
              placeholder="Confirm your password"
              label="Confirmation Password"
              v-model="signupData.confirmationPassword"
              @keyInput="confirmationPasswordCheck"
            />
            <p class="text-danger mt-1 fw-medium small-text" :style="{ display: confirmPasswordDoesNotMatch }">
              The Password confirmation does not match
            </p>
            <p class="text-success mt-1 fw-medium small-text" :style="{ display: confirmPasswordMatch }">
              The password confirmation does match
            </p>
          </div>

          <div class="my-4">
            <base-input
              type="file"
              identity="profileImage"
              label="Profile Photo"
              isImage="true"
              @change="checkImage"
            >
              <div class="image-preview">
                <img :src="signupData.imageLink" alt="Profile" class="rounded-circle img-fluid" />
                <div class="camera-icon">
                  <i class="fa-solid fa-camera fs-5 p-2 bg-white rounded-circle"></i>
                </div>
              </div>
            </base-input>
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="termsCheckbox" />
            <label class="form-check-label" for="termsCheckbox">
              By clicking sign up, I agree to the <a href="#" class="text-teal">Terms & Conditions</a> and confirm that I have read the <a href="#" class="text-teal">Privacy policy</a>.
            </label>
          </div>

          <base-button type="submit" class="btn btn-primary w-100" id="btn-signup">Sign up</base-button>
        </form>
      </div>
    </div>
  </div>

  <div v-if="showSuccessModal" class="custom-modal-overlay">
    <div class="custom-modal border">
      <i class="fa-solid fa-paper-plane my-5 text-teal icon-large"></i>
      <h5>Successfully Registered</h5>
      <p>Thank you for registering at WearIT. Start finding your favorite pre-loved products here.</p>
      <button @click="goToHomePage" class="btn btn-primary border">Go to Home Page</button>
    </div>
  </div>
</template>



<style scoped>
.container-fluid {
  background-color: #f5f5f5;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.small-text {
  font-size: 11px;
}

.text-teal {
  color: teal
}

.image-preview {
  position: relative;
  display: flex;
  justify-content: center;
}

.image-preview img {
  width: 140px;
  height: 150px;
  object-fit: cover;
}

.camera-icon {
  position: absolute;
  bottom: -12px;
  right: 10px;
  transform: translateY(-24px);
}

.icon-large {
  font-size: 150px;
}

.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-modal {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
