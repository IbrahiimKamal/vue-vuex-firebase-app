import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '@/db';

export default {
  namespaced: true,

  state() {
    return {
      data: null,
      auth: {
        isProcessing: false,
        error: '',
      },
    };
  },

  mutations: {
    setAuthIsProcessing(state, isProcessing) {
      state.auth.isProcessing = isProcessing;
    },

    setAuthError(state, error) {
      state.auth.error = error;
    },

    setUser(state, user) {
      state.data = user;
      console.log(user);
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.data;
    },
  },

  actions: {
    onAuthChange({ dispatch, commit }, callback) {
      commit('setAuthIsProcessing', true);
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          await dispatch('getUserProfile', user);
          commit('setAuthIsProcessing', false);
          callback(user);
        } else {
          console.log('User is signed out');
          commit('setAuthIsProcessing', false);
          callback(null);
        }
      });
    },

    async getUserProfile({ commit }, user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const userProfile = docSnap.data();
      const userWithProfile = {
        id: user.uid,
        email: user.email,
        ...userProfile,
      };
      commit('setUser', userWithProfile);
    },

    async register({ commit, dispatch }, { email, password, username }) {
      commit('setAuthIsProcessing', true);
      commit('setAuthError', '');

      try {
        const { user } = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );

        await dispatch('createUserProfile', {
          id: user.uid,
          username,
          avatar:
            'https://www.countries-ofthe-world.com/flags-normal/flag-of-Brazil.png',
          credite: 0,
          exchanges: [],
        });
      } catch (e) {
        commit('setAuthError', e.message);
        dispatch('toast/error', e.message, { root: true });
      } finally {
        commit('setAuthIsProcessing', false);
      }
    },

    async login({ commit, dispatch }, { email, password }) {
      commit('setAuthIsProcessing', true);
      commit('setAuthError', '');

      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit('setAuthError', e.message);
        dispatch('toast/error', e.message, { root: true });
      } finally {
        commit('setAuthIsProcessing', false);
      }
    },

    async logout({ commit }) {
      try {
        await signOut(getAuth());
        commit('setUser', null);
      } catch (error) {
        console.log('Can not logout', error);
      }
    },

    async createUserProfile(_, { id, ...profile }) {
      await setDoc(doc(db, 'users', id), profile);
    },
  },
};
