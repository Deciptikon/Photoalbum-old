<template>
  <div v-if="isOpen" class="modal" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>

      <div class="main-photo">
        <img :src="fullsizeUrl" :alt="`Фото ${currentPhoto}`" />
      </div>

      <div class="photo-info">
        <p>Фото {{ currentPhoto }} из {{ photoCount }}</p>
      </div>

      <div class="navigation">
        <button @click="prev" :disabled="currentPhoto === 1" class="nav-btn">&lt; Назад</button>
        <button @click="next" :disabled="currentPhoto === photoCount" class="nav-btn">
          Вперед &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialPhoto: Number,
    photoCount: Number,
    isOpen: Boolean,
  },
  data() {
    return {
      currentPhoto: this.initialPhoto,
    }
  },
  computed: {
    fullsizeUrl() {
      return this.getFullsizeUrl(this.currentPhoto)
    },
  },
  watch: {
    initialPhoto(newVal) {
      this.currentPhoto = newVal
    },
  },
  methods: {
    getFullsizeUrl(n) {
      return `./images/photoalbum/photo${n}.jpg`
    },
    close() {
      this.$emit('close')
    },
    next() {
      if (this.currentPhoto < this.photoCount) {
        this.currentPhoto++
      }
    },
    prev() {
      if (this.currentPhoto > 1) {
        this.currentPhoto--
      }
    },
    handleKeydown(e) {
      switch (e.key) {
        case 'ArrowLeft':
          this.prev()
          break
        case 'ArrowRight':
          this.next()
          break
        case 'Escape':
          this.close()
          break
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #8f8f8f;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
}

.close:hover {
  color: #f00;
}

.main-photo {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.main-photo img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.photo-info {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.nav-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #59a382;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-btn:hover:not(:disabled) {
  background-color: #316a4f;
}

.nav-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
