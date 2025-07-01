<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    value: { type: Number, required: true },
    max: { type: Number, required: true },
    statusbar: {
        type: String,
        default: 'in-progress',
        validator: val => ['in-progress', 'success', 'warning', 'error'].includes(val)
    },
    type: {
        type: String,
        default: 'circle',
        validator: val => ['circle', 'dashboard'].includes(val),
    }
})


const radius = ref(48)
const isDashboard = computed(() => props.type === 'dashboard');

const VISIBLE_ANGLE = 120;
const INVISIBLE_ANGLE = 360 - VISIBLE_ANGLE;
const START_ANGLE = -90 - (INVISIBLE_ANGLE / 2); // Начинаем с -150°

const circumference = computed(() => 2 * Math.PI * radius.value);
const visibleLength = computed(() => circumference.value * (VISIBLE_ANGLE / 360));
const invisibleLength = computed(() => circumference.value - visibleLength.value);

const dashArray = computed(() =>
    isDashboard.value ? visibleLength.value : circumference.value
);

const startOffset = computed(() =>
    isDashboard.value ? invisibleLength.value / 2 : 0
);

const dashOffset = computed(() => {
    const progress = props.value / props.max;
    return startOffset.value + (dashArray.value * (1 - progress));
})

const rotationAngle = computed(() =>
    isDashboard.value ? START_ANGLE : -90
);

const getPercentage = computed(() => {
    const percent = Math.floor((props.value / props.max) * 100);
    return percent;
});

const styleColor = computed(() => {
    if (props.statusbar === 'error') return '#ff4d4f';
    if (props.statusbar === 'warning') return '#f5a623';
    if (props.statusbar === 'success') return '#52c41a';

    const percent = (props.value / props.max) * 100;

    if (percent <= 20) return '#F08080';
    if (percent <= 75) return '#00BFFF';
    return '#3BB44A';
})


const circleStyle = computed(() => ({
    strokeDasharray: dashArray.value,
    strokeDashoffset: dashOffset.value,
    stroke: styleColor.value,
    transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease'
}));
</script>

<template>
    <div class="circle-progress">
        <svg :viewBox="isDashboard ? '0 0 104 84' : '0 0 104 104'" width="104" :height="isDashboard ? 84 : 104">


            <circle class=" background-circle" :r="radius" cx="52" cy="52" :transform="`rotate(${rotationAngle} 52 52)`"
                :stroke-dasharray="dashArray.value" :stroke-dashoffset="startOffset.value" />

            <circle class="progress-circle" :r="radius" cx="52" cy="52" :style="circleStyle"
                :transform="`rotate(${rotationAngle} 52 52)`" />

        </svg>
        <div class="progress-circle_center" :class="{ 'dashboard-center': isDashboard }">
            <template v-if="props.statusbar === 'warning'">
                <span class="status-icon warning">!</span>
            </template>
            <template v-else-if="props.statusbar === 'error'">
                <span class="status-icon error">✕</span>
            </template>
            <template v-else-if="props.statusbar === 'success'">
                <span class="status-icon success">✓</span>
            </template>
            <template v-else>
                <div class="percent">{{ getPercentage }} %</div>
            </template>
        </div>

    </div>


</template>


<style scoped>
.circle-progress {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', -apple-system, sans-serif;
}

circle {
    fill: none;
    stroke-width: 6;
    transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease, transform 0.5s ease;
}

.background-circle {
    stroke: #e0e0e0;
}

.progress-circle {
    transition: stroke-dashoffset 0.5s ease;
}

.progress-circle_center {
    position: absolute;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    line-height: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.dashboard-center {
    top: 65%;
}

.status-icon {
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
}

.status-icon.warning {
    color: #f5a623;
}

.status-icon.error {
    color: #ff4d4f;
}

.status-icon.success {
    color: #52c41a;
}

.percent {
    color: #555;
}
</style>