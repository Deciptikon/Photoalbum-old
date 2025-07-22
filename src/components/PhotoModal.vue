<template>
  <div v-if="isOpen" class="modal" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>

      <!-- Навигационные кнопки -->
      <div class="photo-navigation">
        <button @click="prev" :disabled="currentPhoto === 1" class="nav-btn nav-prev">&lt;</button>

        <button @click="next" :disabled="currentPhoto === photoCount" class="nav-btn nav-next">
          &gt;
        </button>
      </div>

      <!-- Основной контент с фотографиями -->
      <div class="photo-pair">
        <div class="photo-side photo-front">
          <img :src="frontUrl" :alt="`Фото ${currentPhoto} (перед)`" />
          <div class="side-label">Передняя часть</div>
        </div>

        <div class="photo-side photo-back">
          <img :src="backUrl" :alt="`Фото ${currentPhoto} (зад)`" />
          <div class="side-label">Оборотная сторона</div>
        </div>
      </div>

      <div class="photo-info">
        <p>Фото {{ currentPhoto }} из {{ photoCount }}</p>
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
    frontUrl() {
      return this.getFrontUrl(this.currentPhoto)
    },
    backUrl() {
      return this.getBackUrl(this.currentPhoto)
    },
  },
  watch: {
    initialPhoto(newVal) {
      this.currentPhoto = newVal
    },
  },
  methods: {
    getFrontUrl(n) {
      // Формат: photo1.jpg, photo2.jpg и т.д.
      return `./images/photoalbum/photo${n}_front.jpg`
    },
    getBackUrl(n) {
      // Формат: photo1_back.jpg, photo2_back.jpg и т.д.
      return `./images/photoalbum/photo${n}_back.jpg`
    },
    close() {
      this.$emit('close')
    },
    next() {
      if (this.currentPhoto < this.photoCount) this.currentPhoto++
    },
    prev() {
      if (this.currentPhoto > 1) this.currentPhoto--
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

.photo-pair {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
}

.photo-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 45%;
}

.photo-side img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.side-label {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.photo-front {
  border-right: 1px dashed #ccc;
  padding-right: 20px;
}

.photo-info {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}

/* Стили для навигационных кнопок */
.photo-navigation {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

.nav-btn {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.4);
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.nav-prev {
  left: 0;
}

.nav-next {
  right: 0;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .photo-pair {
    flex-direction: column;
    align-items: center;
  }

  .photo-side {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .photo-front {
    border-right: none;
    border-bottom: 1px dashed #ccc;
    padding-right: 0;
    padding-bottom: 20px;
  }

  .nav-btn {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
  }

  .nav-prev {
    left: 10px;
  }

  .nav-next {
    right: 10px;
  }
}
</style>
