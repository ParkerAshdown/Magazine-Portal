


import * as firebase from 'firebase';
import { error } from '@firebase/database/dist/esm/src/core/util/util';



export default{
    state: {
        user: null
    },
    mutations: {
        
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        signUserUp({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setLoading', false);
                    const newUser = {
                        id: user.uid,
                        registeredMagazines: []
                    }
                    commit('setUser', newUser)
                }
                )
                .catch(
                error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                }
                )
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setLoading', false);
                    const newUser = {
                        id: user.uid,
                        registeredMagazines: [],
                    }
                    commit('setUser', newUser)
                }

                )
                .catch(
                err => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(err);
                }
                )
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', {
                id: payload.uid,
                registeredMagazines: [],
            })
        },
        logout({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
};
