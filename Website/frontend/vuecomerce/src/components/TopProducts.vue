<template>
  <div class="container">
    <h1 class="text-center p-5">Top Products</h1>
    <swiper
      :slidesPerView="5"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
    <swiper-slide v-for="category in categories" :key="category.id" @click="goToProductPage(category.id)">
  <div class="slide-content">
    <div class="slide-image">
      <img :src="`/src/assets/images/${category.filename}`" :alt="category.name" />
    </div>
  </div>
</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default {
  data() {
    return {
      categories: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    goToProductPage(id) {
      this.$router.push({ name: 'ProductView', params: { id } });
    },
    fetchCategories() {
      axios 
        .get('http://localhost/backend/GetSortProducts.php')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    
  },
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 100%;
}

.mySwiper {
  width: 100%;
  height: 400px; 
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
}

.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>