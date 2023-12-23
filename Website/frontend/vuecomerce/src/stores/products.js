import { defineStore } from 'pinia'


export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
      cart: []
  }),

  actions: {
    

    addToCart(product) {
      this.cart.push(product)
    },

    removeFromCart(id) {
      console.log('>>>>> ID', id)
      this.cart = this.cart.filter((item) => item.id !== id)
    }
  }
})  