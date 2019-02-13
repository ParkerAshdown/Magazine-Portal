/* eslint-disable */

import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import * as firebase from 'firebase';
import App from './App';
import router from './router';
import { store } from './store/';
import alertCmp from './components/Shared/alert';
import EditMagazineDetails from './components/Magazine/Edit/EditMagazineDetails.vue';
import EditItemDetails from './components/Product/Edit/EditItemDetails.vue';
import RemoveMagazine from './components/Magazine/Delete/RemoveMagazine.vue';
import VueTruncate from 'vue-truncate-filter';

Vue.use(Vuetify);
Vue.use(VueTruncate);

Vue.config.productionTip = false;
Vue.component('app-alert', alertCmp);
Vue.component('app-edit-magazine-details', EditMagazineDetails);
Vue.component('app-edit-item-details', EditItemDetails);
Vue.component('app-remove-magazine', RemoveMagazine);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
    apiKey: "AIzaSyDYei49vtDGq9uRdPPpAJTvxLSU0aig_pI",
    authDomain: "magazine-portal-d65c4.firebaseapp.com",
    databaseURL: "https://magazine-portal-d65c4.firebaseio.com",
    projectId: "magazine-portal-d65c4",
    storageBucket: "magazine-portal-d65c4.appspot.com",
      //gs://magazine2018-a74ab.appspot.com or magazine2018-a74ab.appspot.com
    });
    // check user logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.$store.dispatch('autoSignIn', user); 
      }
    });
    // load magazines
    this.$store.dispatch('loadMagazines');
   
  }
});
