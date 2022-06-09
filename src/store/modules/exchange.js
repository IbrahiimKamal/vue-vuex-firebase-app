import { getDocs, query, collectionGroup } from 'firebase/firestore';

import { db } from '@/db';

export default {
  namespaced: true,

  state() {
    return {
      items: [],
    };
  },

  mutations: {
    setExchanges(state, exchanges) {
      state.items = exchanges;
    },
  },

  actions: {
    async getExchanges({ commit }) {
      const exchangeQuery = query(collectionGroup(db, 'exchanges'));
      const snapshot = await getDocs(exchangeQuery);
      const exchanges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      commit('setExchanges', exchanges);
    },
  },
};
