

import * as firebase from 'firebase';
import { error } from '@firebase/database/dist/esm/src/core/util/util';



export default {
    state: {
        loadedMagazines: []
    },
    mutations: {
        setLoadedMagazines(state, payload) {
            state.loadedMagazines = payload;
        },
        
        createMagazine(state, payload) {
            state.loadedMagazines.push(payload);
        },
        
        updateMagazine(state, payload) {
            const magazine = state.loadedMagazines.find(magazine => magazine.id === payload.id);
            if (payload.product_title) {
                magazine.product_title = payload.product_title;
                magazine.Digital_id = payload.Digital_id;
                magazine.Print_id = payload.Print_id;
                magazine.product_desc = payload.product_desc;
                magazine.issue_no = payload.issue_no;
                magazine.magcode = payload.magcode;
                magazine.product_image = payload.product_image;
                magazine.Magazine = payload.Magazine;
                magazine.Showme = payload.Showme;
                magazine.Available = payload.Available;
                magazine.premium = payload.premium;
                magazine.pattern = payload.pattern;
                magazine.project = payload.project;
                magazine.premiumdownload = payload.premiumdownload;
                magazine.etsy = payload.etsy;
                magazine.etsylink = payload.etsylink;
            }
        },
        
        removeMagazine(state, payload) {
            const magazines = state.loadedMagazines;
            magazines.splice(magazines.findIndex(magazine => magazine.id === payload.id), 1);
        }
    },
    actions: {
        
        loadMagazines({ commit }) {
            commit('setLoading', true);
            firebase.database().ref('items').once('value')
                .then((data) => {
                    const magazines = [];
                    const obj = data.val();
                    for (const key in obj) {
                        // parseInt(obj[key].Magazine); parse any strings to number
                        if (obj[key].product_title) {
                            magazines.push({
                                id: key,
                                creatorId: obj[key].creatorId,
                                product_title: obj[key].product_title,
                                Digital_id: obj[key].Digital_id,
                                Print_id: obj[key].Print_id,
                                product_desc: obj[key].product_desc,
                                issue_no: obj[key].issue_no,
                                magcode: obj[key].magcode,
                                product_image: obj[key].product_image,
                                Magazine: obj[key].Magazine,
                                Showme: obj[key].Showme,
                                Available: obj[key].Available,
                                premium: obj[key].premium,
                                project: obj[key].project,
                                etsy: obj[key].etsy,
                                etsylink: obj[key].etsylink,
                                pattern: obj[key].pattern,
                                premiumdownload: obj[key].premiumdownload,
                            })
                        }
                    }
                    commit('setLoadedMagazines', magazines);
                    commit('setLoading', false);
                })
                .catch((err) => {
                    console.log(err);
                    commit('setLoading', false);
                })
        },
        loadProducts({ commit }) {
            commit('setLoading', true);
            firebase.database().ref('items').once('value')
                .then((data) => {
                    const products = [];
                    const obj = data.val();
                    for(const key in obj) {
                        if (parseInt(obj[key].Magazine) !== 1) { 
                            products.push({
                                id: key, 
                                creatorId: obj[key].creatorId,
                                product_title: obj[key].product_title,
                                Digital_id: obj[key].Digital_id,
                                Print_id: obj[key].Print_id,
                                product_desc: obj[key].product_desc,
                                issue_no: obj[key].issue_no,
                                magcode: obj[key].magcode,
                                product_image: obj[key].product_image,
                                Magazine: obj[key].Magazine,
                                Available: obj[key].Available,
                                Showme: obj[key].Showme,
                                premium: obj[key].premium,
                                premiumdownload: obj[key].premiumdownload,
                                project: obj[key].project,
                                etsy: obj[key].etsy,
                                etsylink: obj[key].etsylink,
                                pattern: obj[key].pattern
                            })
                        }
                    }
                    commit('setLoadedMagazines', magazines);
                    commit('setLoading', false);
                })
                .catch((err) => {
                    console.log(err);
                    commit('setLoading', false);
                })
        },
        createMagazine({ commit, getters }, payload) {
            const magazine = {
                product_title: payload.product_title,
                Digital_id: payload.Digital_id,
                Print_id: payload.Print_id,
                product_desc: payload.product_desc,
                issue_no: payload.issue_no,
                magcode: payload.magcode,
                product_image: payload.product_image,
                Magazine: payload.Magazine,
                Showme: payload.Showme,
                Available: payload.Available,
                premium: 0,
                pattern: 0,
                project: 0,
                premiumdownload: "",
                etsy: 0,
                etsylink: "",
                
            }
            firebase.database().ref('items').push(magazine)
                .then((data) => {
                    const key = data.key;
                    commit('createMagazine', {
                        ...magazine,
                        id: key
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

        },
        createProduct({ commit, getters }, payload) {
            const product = {
                product_title: payload.product_title,
                Digital_id: payload.Digital_id,
                Print_id: payload.Print_id,
                product_desc: payload.product_desc,
                product_image: payload.product_image,
                issue_no: payload.issue_no,
                magcode: payload.magcode,
                Showme: payload.Showme,
                Available: payload.Available,
                Magazine: payload.Magazine,
                premium: payload.premium,
                pattern: payload.pattern,
                project: payload.project,
                premiumdownload: payload.premiumdownload,
                etsy: payload.etsy,
                etsylink: payload.etsylink,
            }
            let productImage;
            let key;
            firebase.database().ref('items').push(product)
                .then((data) => {
                    key = data.key;
                    return key;
                })
                .then(key => {
                    const filename = payload.product_image.name;
                    const fileExtension = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref(`items/${ key }.${ fileExtension }`).put(payload.product_image);
                })
                .then(fileData => {
                    productImage = fileData.metadata.downloadURLs[0];
                    return firebase.database().ref('items').child(key).update({ product_image: productImage });
                })
                .then(() => {
                    commit('createMagazine', {
                        ...product,
                        product_image: productImage,
                        id: key
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        updateMagazineData({ commit }, payload) {
            commit('setLoading', true);
            const updateObj = {};
            if (payload.product_title) {
                updateObj.product_title = payload.product_title;
                updateObj.Digital_id = payload.Digital_id;
                updateObj.Print_id = payload.Print_id;
                updateObj.product_desc = payload.product_desc;
                updateObj.issue_no = payload.issue_no;
                updateObj.magcode = payload.magcode;
                updateObj.product_image = payload.product_image;
                updateObj.Showme = payload.Showme;
                updateObj.Magazine = payload.Magazine;
                updateObj.Available = payload.Available;
                updateObj.premium = 0;
                updateObj.pattern = 0;
                updateObj.project = 0;
                updateObj.premiumdownload = "";
                updateObj.etsy = 0;
                updateObj.etsylink = "";
            }
            firebase.database().ref('items').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false);
                    commit('updateMagazine', payload);
                })
                .catch((error) => {
                    console.log(error);
                    commit('setLoading', false);
                })
        },
        updateProductData({ commit }, payload) {
            commit('setLoading', true);
            const updateObjProd = {};
            if (payload.product_title) {
                updateObjProd.product_title = payload.product_title;
                updateObjProd.Digital_id = payload.Digital_id;
                updateObjProd.Print_id = payload.Print_id;
                updateObjProd.product_desc = payload.product_desc;
                updateObjProd.issue_no = payload.issue_no;
                updateObjProd.magcode = payload.magcode;
                updateObjProd.Showme = payload.Showme;
                updateObjProd.premium = payload.premium;
                updateObjProd.pattern = payload.pattern;
                updateObjProd.project = payload.project;
                updateObjProd.premiumdownload = payload.premiumdownload;
                updateObjProd.etsy = payload.etsy;
                updateObjProd.etsylink = payload.etsylink;
            }
            firebase.database().ref('items').child(payload.id).update(updateObjProd)
                .then(() => {
                    commit('setLoading', false);
                    commit('updateMagazine', payload);
                })
                .catch((error) => {
                    console.log(error);
                    commit('setLoading', false);
                })
        },
        removeMagazineData({ commit }, payload) {
            commit('setLoading', true);
            firebase.database().ref('items').child(payload.id).remove()
                .then(() => {
                    commit('setLoading', false);
                    commit('removeMagazine', payload);
                    commit('updateMagazine', payload);
                })
                .catch((error) => {
                    console.log(error);
                    commit('setLoading', false); 
                })
        }
    },
    getters: {
        loadedMagazines(state) {
            return state.loadedMagazines.sort((magazineA, magazineB) => magazineA.issue_no > magazineB.issue_no);
        },
        loadedMagazine(state) {
            return (magazineId) => state.loadedMagazines.find((magazine) => magazine.id === magazineId);
        }
    },
};
