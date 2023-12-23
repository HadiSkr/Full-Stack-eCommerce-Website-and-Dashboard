<template>
  <div class="container">
    <h1 class="text-center p-5">Top Categories</h1>

    <div class="category-grid">
      <div class="category-card" v-for="(category, index) in categories" :key="category.id" :style="getAnimationDelay(index)" @click="goToCategoryPage(category.id)">
        <img :src="`/src/assets/categoriesImages/${category.filename}`" :alt="category.name" class="category-image">
        <div class="category-details">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get('http://localhost/backend/GetCategories.php')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAnimationDelay(index) {
      const delay = index * 0.3; 
      return {
        animationDelay: `${delay}s`
      };
    },
    goToCategoryPage(id) {
      this.$router.push({ name: 'CategoryView', params: { id } });
    },
    openCategoryDetails(category) {
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.category-card {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  height: 250px;
  animation: floatShake 5s infinite alternate;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

@keyframes floatShake {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}

.category-image-wrapper {
  flex: 1 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-details {
  margin-top: 10px;
}

.category-name {
  font-size: 18px;
  font-weight: bold;
}

.category-description {
  margin-top: 5px;
  font-size: 14px;
}

.category-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>