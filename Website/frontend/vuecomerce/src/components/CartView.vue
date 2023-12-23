    <template>
        <div v-if="!cartItems.length" style="text-align: center">
        <h1>Empty Cart ...</h1>
        </div>
        <div class="cart-items" v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <div class="item-details">
            <img :src="`/src/assets/images/${item.image[0]}.jpg`"  alt="">
            <span>Name: {{ item.name }}</span>
            <span>Price: {{ item.price }}</span>

            <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
        </div>
    </template>
    
    <script>
import { defineComponent } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: 'CartView',
  setup() {
    const router = useRouter();
    const store = useStore();
  
    const removeFromCart = (id) => {
  store.commit('cart/removeCartItem', id);
};
    const cartItems = computed(() => store.state.cart.cartItems);
    return {
      router,
      cartItems,
      removeFromCart,
    };
  }
});
    </script>
    
    <style scoped>
    .item-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        box-shadow: 0 0 17px 6px #e7e7e7;
        border-radius: 8px;
        padding: 16px;
    }
    
    .item-details img {
        width: 20%;
    }
    </style>