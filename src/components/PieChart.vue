<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

const props = defineProps({
    data: { type: Array, default: () => [] }
})

const canvas = ref(null)
let chart

onMounted(() => {
    chart = new Chart(canvas.value, {
        type: 'pie',
        data: {
            labels: props.data.map(s => s.name),
            datasets: [{
                data: props.data.map(s => s.value),
                backgroundColor: props.data.map(s => s.color)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    })
})

watch(() => props.data, (newData) => {
    chart.data.labels = newData.map(s => s.name)
    chart.data.datasets[0].data = newData.map(s => s.value)
    chart.data.datasets[0].backgroundColor = newData.map(s => s.color)
    chart.update()
}, { deep: true })
</script>
