import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Vue from 'vue';
import Vuex from 'vuex';
import cartModule from './cart';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: cartModule
  },
  // ... Other store options if any
});

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
