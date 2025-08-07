<script setup>
import { ref } from 'vue'
import CircleProgress from '@/components/CircleProgress.vue'
import { PROGRESS_TYPES } from '@/constants/progressTypes'

const type = ref(PROGRESS_TYPES.circle)

const progressBars = [
  { value: 0, max: 100, statusbar: 'in-progress' },
  { value: 10, max: 100, statusbar: 'in-progress' },
  { value: 25, max: 100, statusbar: 'in-progress' },
  { value: 100, max: 100, statusbar: 'success' },
  { value: 75, max: 100, statusbar: 'warning' },
  { value: 50, max: 100, statusbar: 'error' },
]
</script>

<template>
  <div class="home-page">
    <h1>Круговой прогресс-бар</h1>
    <div>
      <label>
        <input type="radio" :value="PROGRESS_TYPES.circle" v-model="type" />
        Circle
      </label>
      <label>
        <input type="radio" :value="PROGRESS_TYPES.dashboard" v-model="type" />
        Dashboard
      </label>
    </div>
    <div class="home-page__circle-container">
      <CircleProgress
        v-for="(bar, id) in progressBars"
        :key="id"
        :value="bar.value"
        :max="bar.max"
        :statusbar="bar.statusbar"
        :type="type"
      />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
}

.home-page__circle-container {
  margin-top: 24px;
  display: flex;
  gap: 24px;
}
</style>
