<template>
  <div>
    <h1>Фотоальбом</h1>

    <div class="photo-grid">
      <div v-for="n in photoCount" :key="n" class="photo-item" @click="openModal(n)">
        <img :src="getThumbnailUrl(n)" :alt="`Фото ${n}`" />
        <p>Фото {{ n }}</p>
      </div>
    </div>

    <PhotoModal
      v-if="isModalOpen"
      :initialPhoto="currentPhoto"
      :photoCount="photoCount"
      :isOpen="isModalOpen"
      @close="closeModal"
    />

    <router-link :to="{ name: 'home' }">На главную</router-link>
  </div>
</template>

<script>
import PhotoModal from '@/components/PhotoModal.vue'

export default {
  name: 'PhotoalbumView',
  components: {
    PhotoModal,
  },
  data() {
    return {
      photoCount: 74,
      isModalOpen: false,
      currentPhoto: 1,
    }
  },
  methods: {
    getThumbnailUrl(n) {
      if (import.meta.env.VITE_DEBUG_MODE === 'true') {
        return `/images/photoalbum/photo_mini (${n}).jpg`
      }
      return `./images/photoalbum/photo_mini (${n}).jpg`
    },
    openModal(n) {
      this.currentPhoto = n
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
  },
}
</script>

<style scoped>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.photo-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.photo-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.photo-item p {
  margin-top: 10px;
  font-size: 14px;
  color: #c9c9c9;
}
</style>
