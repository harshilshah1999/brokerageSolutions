// ~/store/index.js

import Vuex from 'vuex'
import { auth } from '~/plugins/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: '',
        },

        getters: {
            user(state) {
                return state.user
            },

            isAuthenticated(state) {
                return !!state.user
            }
        },

        mutations: {
            setUser(state, payload) {
                state.user = payload
            }
        },

        actions: {
            signUp({ commit }, { email, password }) {
                return createUserWithEmailAndPassword(auth, email, password)
            },

            signInWithEmail({ commit }, { email, password }) {
                return signInWithEmailAndPassword(auth, email, password)
            },

            signOut() {
                return signOut(auth)
            }
        }
    })
}


export default createStore