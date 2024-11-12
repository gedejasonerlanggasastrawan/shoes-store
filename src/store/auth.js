import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        }
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },
        setUserLogout(state) {
            state.token = null;
            state.userLogin = {};
            state.isLogin = false;
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        },
        updateImageLink(state, newImageLink) {
            state.userLogin.imageLink = newImageLink;
          }
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyDifVSO-VvHozrip6z2lhXr_cWV134Cug8";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });
                const newUserData = {
                    userId: data.localId,
                    fullname: payload.fullname,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink,
                };
                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);
            } catch (err) {
                console.log(err);
            }
        },
        async addNewUser({ commit, state }, payload) {
            try {
                await axios.put(
                    `https://shoes-website-be357-default-rtdb.firebaseio.com/user/${payload.userId}.json?auth=${state.token}`,
                    payload
                );
                commit("setUserLogin", { userData: payload, loginStatus: true });
            } catch (err) {
                console.log(err);
            }
        },
        async getLoginData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyDifVSO-VvHozrip6z2lhXr_cWV134Cug8";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });
                
                await dispatch("cart/clearCart", null, { root: true }); // Kosongkan cart sebelum login
                await dispatch("getUser", data.localId); // Ambil data pengguna
                await dispatch("cart/fetchCartData", null, { root: true }); // Ambil data cart untuk pengguna yang baru login
            } catch (err) {
                console.log(err);
            }
        },        
        async uploadProfileImage({ state, commit }, file) {
            const userId = Cookies.get("UID");
            const storageRef = `https://shoes-website-be357-default-rtdb.firebaseio.com/user/${userId}/imageLink.json?auth=${state.token}`;
            
            try {
                const formData = new FormData();
                formData.append("file", file);

                // Upload the file and update user image link
                const { data } = await axios.post(storageRef, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                commit("setUserLogin", { userData: { ...state.userLogin, imageLink: data }, loginStatus: true });
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        },
        async updateUserData({ commit, state }, payload) {
            try {
                // Use userId directly from state to avoid creating a new record
                await axios.put(
                    `https://shoes-website-be357-default-rtdb.firebaseio.com/user/${state.userLogin.userId}.json?auth=${state.token}`,
                    payload
                );
                
                // Update userLogin data in Vuex with the latest payload
                commit("setUserLogin", { userData: payload, loginStatus: true });
            } catch (err) {
                console.error("Error updating user data:", err);
            }
        },
        
        async getUser({ commit }, userId) {
            try {
                const { data } = await axios.get(
                    `https://shoes-website-be357-default-rtdb.firebaseio.com/user/${userId}.json`
                );
                if (data) {
                    commit("setUserLogin", { userData: data, loginStatus: true });
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        },
        async changePassword({ state }, { oldPassword, newPassword }) {
            const APIkey = "AIzaSyDifVSO-VvHozrip6z2lhXr_cWV134Cug8";
            const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${APIkey}`;
            try {
                const { data: signInData } = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIkey}`,
                    {
                        email: state.userLogin.email,
                        password: oldPassword,
                        returnSecureToken: true,
                    }
                );
                await axios.post(authUrl, {
                    idToken: signInData.idToken,
                    password: newPassword,
                    returnSecureToken: true,
                });
                console.log("Password changed successfully!");
            } catch (err) {
                console.error("Error changing password:", err.response?.data || err);
            }
        },
        async logout({ commit, dispatch }) {
            // Lakukan logout pada auth dan kosongkan data cart
            commit("setUserLogout");
            await dispatch("cart/clearCart", null, { root: true }); // Panggil `clearCart` di modul `cart`
        }
    }
};
