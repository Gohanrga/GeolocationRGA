import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    googleMapApi: {},
    key: 'AIzaSyD04kaxs68gHGPrIrZw_uYruaRnXvfVYm8',
    progress: false,
    token: '',
    userData: {
      name: '',
      email:''
    },
    snackBar: {
      color: '',
      text: '',
      snackBar: false,
      timeout: 4000
    },
  },
  mutations: {
    saveGoogleMapApi(state, googleMapApi) {
      console.log(googleMapApi)
      state.googleMapApi = googleMapApi;
    },
    setProgress (state, value) {
      state.progress = value;
    },
    saveToken(state, value) {
      state.token = value;
    },
    saveUserData(state, value) {
      state.userData.name = value.name;
      state.userData.email = value.email;
    },
    saveSnackBar (state, snackBar) {
      state.snackBar.color = snackBar.color;
      state.snackBar.text = snackBar.text;
      state.snackBar.snackBar = true;
    },
    cleanSnackBar(state) {
      state.snackBar.color = ''
      state.snackBar.text = '';
      state.snackBar.snackBar = false;
    }
  },
  actions: {
    setGoogleMapApi({ commit }, googleMapApi) {
      commit('saveGoogleMapApi', googleMapApi);
    },
    onProgress({ commit }) {
      commit('setProgress', true);
    },
    offProgress({ commit }) {
      commit('setProgress', false);
    },
    setToken({ commit }, token) {
      commit('saveToken', token);
    },
    setUserData({ commit }, userData) {
      commit('saveUserData', userData);
    },
    setSnackBar({ commit }, snackBar) {
      commit('saveSnackBar', snackBar);
    },
    setCleanSnackBar({ commit }) {
      commit('cleanSnackBar');
    },
    closeSession({ commit }) {
      commit('saveToken', '');
      let user = {
        name: '',
        email:''
      }
      commit('saveUserData', user);
    }
  },
  getters: {
    getGoogleMapApi: (state) => () => {
      return state.googleMapApi;
    },
    getKeyGoogleMapApi: (state) => () => {
      return state.key;
    },
    getToken: (state) => () => {
      return state.token;
    },
    getUserData: (state) => () => {
      return state.userData;
    }

  },
  modules: {
  }
})
