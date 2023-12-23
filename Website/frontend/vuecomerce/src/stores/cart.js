const state = {
    cartItems: []
  };
  
  const mutations = {
    removeCartItem(state, id) {
      state.cartItems = state.cartItems.filter(item => item.id !== id);
      saveCartItemsToLocalStorage(state.cartItems);
    },
    addToCart(state, cartItem) {
      state.cartItems.push(cartItem);
      saveCartItemsToLocalStorage(state.cartItems);
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    }
  };
  
  const actions = {
    addToCart({ commit }, cartItem) {
      commit('addToCart', cartItem);
    },
    loadCartItems({ commit }) {
      const cartItems = getCartItemsFromLocalStorage();
      commit('setCartItems', cartItems);
    },
    removeCartItem({ commit }, id) {
      commit('removeCartItem', id);
    }
  };
  
  const getters = {
    getCartItemCount: state => state.cartItems.length
  };
  
  function getCartItemsFromLocalStorage() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }
  
  function saveCartItemsToLocalStorage(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };