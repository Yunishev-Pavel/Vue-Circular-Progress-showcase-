<script setup>
import DeleteButtonIcon from './icon/DeleteButtonIcon.vue'
import EditButtonIcon from './icon/EditButtonIcon.vue'
import HrTagIcon from './icon/HrTagIcon.vue'
defineProps({
  sector: Object,
})
</script>

<template>
  <div class="sector-row">
    <div class="sector-info">
      <div class="sector-row__name">{{ sector.name }}</div>
      <HrTagIcon />
      <div class="sector-row__value">{{ sector.value }}%</div>
      <HrTagIcon />
      <div class="sector-row__color-indicator" :style="{ backgroundColor: sector.color }"></div>
    </div>

    <div class="sector-row__actions">
      <button class="sector-row__button sector-row__button--edit" @click="$emit('edit', sector)">
        <EditButtonIcon />
      </button>
      <button
        class="sector-row__button sector-row__button--delete"
        @click="$emit('delete', sector.id)"
      >
        <DeleteButtonIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.sector-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f9;
  transition: background-color 0.2s;
  font-family: 'Inter', sans-serif;
}

.sector-row:hover {
  background-color: #f9fafb;
}

.sector-info {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.sector-row__color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sector-row__name,
.sector-value {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  color: #252f4a;
  text-align: right;
  margin: 0;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sector-row__value {
  text-align: right;
  margin: 0;
}

.sector-row__actions {
  display: flex;
  gap: 12px;
}

.sector-row__button {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.sector-row__button--edit:hover {
  background-color: #eff6ff;
}

.sector-row__button--edit svg path {
  stroke: #3b82f6;
}

.sector-row__button--delete:hover {
  background-color: #fef2f2;
}

.sector-row__button--delete:hover svg path {
  stroke: #ef4444;
}
</style>
