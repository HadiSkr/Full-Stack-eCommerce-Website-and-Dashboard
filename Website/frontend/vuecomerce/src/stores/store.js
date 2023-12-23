import { createStore } from 'vuex'
const cartModule = {
  namespaced: true,
  state: {
    cartItems: []
  },
  mutations: {
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
    removeCartItem(state, id) {
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    }
  },
  actions: {
    loadCartItems({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      commit('setCartItems', cartItems);
    },
    saveCartItems({ state }) {
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  }
};

export default cartModule;