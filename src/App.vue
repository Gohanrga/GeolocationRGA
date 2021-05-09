<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Portal</h1>
      </div>

      <v-spacer></v-spacer>
      <Menu/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <ProgressBar/>
    <SnackBar/>
  </v-app>
</template>

<script>
import Menu from './components/Menu'
import GoogleMapsApiLoader from 'google-maps-api-loader';
import {mapActions} from 'vuex'
import ProgressBar from './components/ProgressBar';
import SnackBar from './components/SnackBar';
export default {
  name: 'App',
  components:{
    Menu,
    ProgressBar,
    SnackBar
  },
  data: () => ({
    
  }),
  mounted() {
    this.inicializeGoogleMapApi();
    this.setCleanSnackBar();
  },
  methods: {
    ...mapActions(['setGoogleMapApi', 'setCleanSnackBar']),
    /**
     * Save GoogleMapsApiLoader in store
    */
    async inicializeGoogleMapApi(){
        await GoogleMapsApiLoader({
            apiKey: this.$store.getters.getKeyGoogleMapApi()
        })
        .then(async data=>{
            this.setGoogleMapApi(data);
        })
    },
  },
};
</script>
