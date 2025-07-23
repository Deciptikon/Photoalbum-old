<template>
  <div v-if="isOpen" class="modal" @click.self="close">
    <div class="modal-content">
      <span
        class="toggle"
        @click="toggle"
        :title="isToggleActive ? 'Выключить режим' : 'Включить режим'"
      >
        {{ isToggleActive ? '◼' : '◻' }}
      </span>
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
          <div class="side-label">Лицевая сторона</div>
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
      isToggleActive: false,
      isChanging: false,
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
      let str = `/images/photoalbum/photo_front (${n}).jpg`
      if (this.isToggleActive) {
        str = `/images/photoalbum/photo_front_norm (${n}).jpg`
      }

      if (import.meta.env.VITE_DEBUG_MODE !== 'true') {
        str = `.` + str
      }
      return str
    },
    getBackUrl(n) {
      let str = `/images/photoalbum/photo_back (${n}).jpg`

      if (import.meta.env.VITE_DEBUG_MODE !== 'true') {
        str = `.` + str
      }
      return str
    },
    toggle() {
      this.isToggleActive = !this.isToggleActive
    },
    close() {
      this.$emit('close')
    },
    next() {
      if (this.isChanging) return
      if (this.currentPhoto < this.photoCount) {
        this.currentPhoto++
        this.isChanging = true
        setTimeout(() => {
          this.isChanging = false
        }, 200)
      }
    },
    prev() {
      if (this.isChanging) return
      if (this.currentPhoto > 1) {
        this.currentPhoto--
        this.isChanging = true
        setTimeout(() => {
          this.isChanging = false
        }, 200)
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
        case '+':
          this.toggle()
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
  padding: 00px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Стили для кнопки переключателя */
.toggle {
  position: absolute;
  left: 15px;
  top: 10px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  color: #ffffff;
  z-index: 100;
}

.toggle:hover {
  color: #2196f3;
}

/* Стиль для активного состояния */
.toggle.active {
  color: #2196f3;
}

/* Стиль для кнопки закрытия */
.close {
  position: absolute;
  top: 0px;
  right: 15px;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  color: #ffffff;
  z-index: 100;
}

.close:hover {
  color: #f00;
}

/* Стиль для пары фото */
.photo-pair {
  display: flex;
  gap: 0px;
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

.photo-back {
  padding-left: 20px;
}

.photo-info {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}

/* Стили для навигационных кнопок */
.photo-navigation {
  position: absolute;
  width: 100%;
  height: 100%;
}

.nav-btn {
  position: absolute;
  top: 0;
  height: 100%;
  width: 25%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
  margin: 0px;
}

.nav-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.4);
}

.nav-btn:disabled {
  opacity: 0.1;
  cursor: not-allowed;
}

.nav-prev {
  left: 0;
  font-size: 90px;
}

.nav-next {
  right: 0;
  font-size: 90px;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
    overflow-y: auto;
  }

  .photo-pair {
    flex-direction: column;
    align-items: center;
  }

  .photo-side {
    max-width: 95%;
    margin-bottom: 0px;
  }

  .photo-front {
    border-right: none;
    border-bottom: 1px dashed #ccc;
    padding-right: 0;
    padding-bottom: 20px;
  }

  .photo-back {
    border-right: none;
    border-bottom: 1px dashed #ccc;
    padding-left: 0px;
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
