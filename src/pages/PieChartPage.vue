<script setup>
import { ref } from 'vue'
import PieChart from '@/components/PieChart.vue'
import PieForm from '@/components/PieForm.vue'
import SectorRow from '@/components/SectorRow.vue'

const sectors = ref([])
const editableSector = ref(null)
const mouseDownTarget = ref(null)

function saveSector(item) {
  if (!item.id) {
    sectors.value.push({ ...item, id: Date.now() })
    editableSector.value = null
    return
  }

  const idx = sectors.value.findIndex((s) => s.id === item.id)
  if (idx === -1) return

  sectors.value[idx] = item
  editableSector.value = null
}

function editSector(s) {
  editableSector.value = { ...s }
}

function deleteSector(id) {
  sectors.value = sectors.value.filter((s) => s.id !== id)
}
function handleBackdropMouseDown(event) {
  if (event.target === event.currentTarget) {
    mouseDownTarget.value = 'backdrop'
  }
}
function handleBackdropMouseUp(event) {
  if (mouseDownTarget.value === 'backdrop' && event.target === event.currentTarget) {
    editableSector.value = null
  }
  mouseDownTarget.value = null
}
</script>

<template>
  <div class="pie-page">
    <h1 class="pie-page__title">Круговая диаграмма</h1>

    <div class="pie-page__layout">
      <div class="pie-page__sidebar">
        <div class="pie-page__sector-list">
          <SectorRow
            v-for="s in sectors"
            :key="s.id"
            :sector="s"
            @edit="editSector"
            @delete="deleteSector"
            class="pie-page__sector-row"
          />
        </div>
        <button class="pie-page__add-btn" @click="editableSector = {}">Добавить сектор</button>
      </div>
      <section class="pie-page__chart">
        <PieChart :data="sectors" />
      </section>
    </div>

    <div
      v-if="editableSector"
      class="pie-page__backdrop"
      @mousedown="handleBackdropMouseDown"
      @mouseup="handleBackdropMouseUp"
    >
      <div class="pie-page__modal">
        <h2 class="pie-page__modal-title">
          {{ editableSector.id ? 'Редактирование сектора' : 'Добавление сектора' }}
        </h2>
        <PieForm :modelValue="editableSector" @submit="saveSector" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pie-page {
  padding: 32px;
  font-family: sans-serif;
}

.pie-page__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0;
  fill: #252f4a;
  text-anchor: middle;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.pie-page__layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.pie-page__sidebar {
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pie-page__sector-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pie-page__add-btn {
  background-color: #1677ff;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.pie-page__chart {
  flex-grow: 1;
  max-width: 500px;
}

.pie-page__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pie-page__modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-width: 360px;
}
.pie-page__modal-title {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 500;
}
</style>
