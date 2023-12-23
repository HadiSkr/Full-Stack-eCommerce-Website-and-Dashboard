<template>
  <div class="container">
    <h1 class="text-center p-5">Our Products List</h1>

    <div class="products" id="products">
      <div class="swiper-wrapper">
        <swiper
          :effect="'cube'"
          :grabCursor="true"
          :cubeEffect="{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }"
          :pagination="true"
          :modules="modules"
          class="mySwiper"
          ref="swiperRef"
        >
          <swiper-slide v-for="product in products" :key="product.id" @click="goToProductPage(product.id)">
            <div class="slide-content">
              <div class="slide-image">
                <img :src="`/src/assets/images/${product.filename}`" :alt="Image" ref="imageRef" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';

export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      modules: [EffectCube, Pagination],
      onSwiper,
      onSlideChange,
    };
  },
  mounted() {
    this.fetchProducts();
    this.resizeImages();
  },
  methods: {
    goToProductPage(id) {
      this.$router.push({ name: 'ProductView', params: { id } });
    },
    fetchProducts() {
      axios
        .get('http://localhost/backend/GetProducts.php')
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resizeImages() {
      this.$nextTick(() => {
        const swiper = this.$refs.swiperRef.$swiper;
        const images = this.$refs.imageRef;

        images.forEach((image) => {
          const slide = image.closest('.swiper-slide');
          const slideWidth = slide.offsetWidth;
          const slideHeight = slide.offsetHeight;

          if (slideWidth && slideHeight) {
            if (image.offsetWidth / image.offsetHeight > slideWidth / slideHeight) {
              image.style.width = '100%';
              image.style.height = 'auto';
            } else {
              image.style.width = 'auto';
              image.style.height = '100%';
            }
          }
        });

        swiper.update();
      });
    },
  },
};
</script>

<style scoped lang="scss">
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

.mySwiper {
  height: 1400px;
}

.swiper {
  width: 350px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -200px;
}

.swiper-slide {
  height: 350px;
}

.swiper-slide .slide-image {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  height: 500px; 
}
</style>