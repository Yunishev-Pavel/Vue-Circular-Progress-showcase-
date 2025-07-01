<script setup>
import { ref } from 'vue'
import PieChart from '@/components/PieChart.vue'
import PieForm from '@/components/PieForm.vue'
import SectorRow from '@/components/SectorRow.vue'

const sectors = ref([])
const editing = ref(null)



function onSubmit(item) {
    if (item.id) {
        const idx = sectors.value.findIndex(s => s.id === item.id)
        sectors.value[idx] = item
    } else {
        sectors.value.push({ ...item, id: Date.now() })
    }
    editing.value = null
}

function editSector(s) {
    editing.value = { ...s }
}

function deleteSector(id) {
    sectors.value = sectors.value.filter(s => s.id !== id)
}
</script>

<template>
    <div class="pie-page">
        <h1>Круговая диаграмма</h1>
        <div class="layout">
            <div class="left">
                <div class="sector-list">
                    <SectorRow v-for="s in sectors" :key="s.id" :sector="s" @edit="editSector" @delete="deleteSector" />
                </div>
                <button class="add-btn" @click="editing = {}">Добавить сектор</button>
            </div>
            <div class="right">
                <PieChart :data="sectors" />
            </div>
        </div>

        <div v-if="editing" class="modal-backdrop" @click.self="editing = null">
            <div class="modal">
                <h2>{{ editing.id ? 'Редактирование сектора' : 'Добавление сектора' }}</h2>
                <PieForm :modelValue="editing" @submit="onSubmit" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.pie-page {
    padding: 32px;
    font-family: sans-serif;
}

.layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;
}

.left {
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.right {
    width: 500px;
    height: 500px;
}

.add-btn {
    background-color: #1677ff;
    color: white;
    padding: 12px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    padding: 24px;
    border-radius: 12px;
    min-width: 360px;
}
</style>
