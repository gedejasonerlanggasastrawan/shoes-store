<template>
  <div class="container">
      <div class="row py-5">
          <div class="col-12">
              <h2 style="margin-bottom: 40px;">Settings</h2>
              <ul type="none" class="text-decoration-none">
                  <li style="margin-bottom: 20px;" @click="menuClicked('profile-details')">Profile Details</li>
                  <li style="margin-bottom: 20px;" @click="menuClicked('change-password')">Change Password</li>
                  <li style="margin-bottom: 20px;" @click="menuClicked('transaction-history')">Transaction History</li>
                  <li style="margin-bottom: 20px;" @click="menuClicked('user-product')">User Product</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['changeComponent'])

const menuClicked = option => {
  emit("changeComponent", option)
}
</script>