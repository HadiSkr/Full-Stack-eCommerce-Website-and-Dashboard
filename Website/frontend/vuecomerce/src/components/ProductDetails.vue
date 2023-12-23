<template>
    <div>
      <div class="product">
        <div class="product-image">
          <swiper
            :slidesPerView="1"
            :spaceBetween="30"
            :keyboard="{
              enabled: true,
            }"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(image, index) in product.images" :key="index">
              <img :src="`/src/assets/images/${image}`" :alt="Image" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="product-details">
          <div class="details-container">
            <div class="details-content">
              <p class="product-name">Name: {{ product.name }}</p>
              <p class="product-description">Description: {{ product.description }}</p>
              <div class="product-price">
                <span class="currency">$</span>
                <span class="amount">{{ product.price }}</span>
              </div>
              <div v-if="product.amount > 0" class="label in-stock">In Stock</div>
              <div v-else class="label out-of-stock">Out of Stock</div>
            </div>
            <v-btn class="add-to-cart-btn" variant="elevated" color="indigo-lighten-3" @click="handleAddToCart">Add to cart</v-btn>   
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import axios from 'axios';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import { mapActions } from 'vuex';
  import { Keyboard, Pagination, Navigation } from 'swiper/modules';


  export default {
    data() {
      return {
        product: '',
      };
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Keyboard, Pagination, Navigation],
      };
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchProductData(id);
    },
  
    methods: {
      ...mapActions('cart', ['addToCart']),
      fetchProductData(id) {
        axios
          .get(`http://localhost/backend/GetProdutinfo.php?id=${id}`)
          .then((response) => {
            this.product = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      handleAddToCart() {
    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.images,
    };
    this.addToCart(cartItem);
  },
    },
  };
  </script>
  
  <style scoped>
  .product-title {
    text-align:center;
    margin-top: 50px;
  }
  
  .product {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .product-image {
    width: 30%;
    margin-right: 24px;
    margin-top: 120px;

  }
  
  .product-details {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .details-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-right: 200px;

  }
  
  .details-content {
    text-align: center;
  }
  
  .product-name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-description {
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .currency {
    font-weight: bold;
  }
  
  .amount {
    font-weight: bold;
  }
  
  .label {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  
  .in-stock {
    background-color: green;
    color: white;
  }
  
  .out-of-stock {
    background-color: red;
    color: white;
  }
  
  .add-to-cart-btn {
  padding: 10px 20px;
  background-color: #5c6bc0;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
}

  body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  </style>