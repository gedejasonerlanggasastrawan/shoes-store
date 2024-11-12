<template>
    <div
      class="header__signup fw-semibold d-flex align-items-center text-decoration-none"
      style="text-align: right">
        <div class="d-flex justify-content-center col-12">
            <div class="col-12">
                <router-link 
                to="/login"
                type="button" 
                class=" btn btn-outline-primary my-1 me-2" id="login">
                Login
                </router-link>
                <router-link 
                to="/signup"
                type="button" 
                class="signup btn btn-primary my-1" id="signup">
                Sign Up
                </router-link>
            </div>
            <div style="border-left: 1px solid black; margin-left: 10px;"></div>
            <div class="col-6">
                <select name="language" id="language" class="form-select ms-2 my-1 border-1">
                    <option selected>EN</option>
                    <option value="1">ID</option>
                </select>
            </div>
        </div>
    </div>
</template>