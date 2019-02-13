

import Vue from 'vue';
import Vuex from 'vuex';

import products from './products';
import user from './user'; 
import shared from './shared'; 

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        products,
        user,
        shared,
    }
    
});
