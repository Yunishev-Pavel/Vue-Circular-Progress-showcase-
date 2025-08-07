<script setup>
import { computed, ref } from 'vue'
import { STATUSBAR_TYPE, PROGRESS_TYPES } from '@/constants/progressTypes'

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, required: true },
  statusbar: {
    type: String,
    default: STATUSBAR_TYPE.inProgress,
    validator: (val) => Object.values(STATUSBAR_TYPE).includes(val),
  },
  type: {
    type: String,
    default: PROGRESS_TYPES.circle,
    validator: (val) => Object.values(PROGRESS_TYPES).includes(val),
  },
})

const radius = ref(48)
const isDashboard = computed(() => props.type === PROGRESS_TYPES.dashboard)

const statusIcon = computed(() => {
  switch (props.statusbar) {
    case STATUSBAR_TYPE.success:
      return '✓'
    case STATUSBAR_TYPE.error:
      return '✕'
    case STATUSBAR_TYPE.warning:
      return '!'
    default:
      return null
  }
})

const VISIBLE_ANGLE = 120
const INVISIBLE_ANGLE = 360 - VISIBLE_ANGLE
const START_ANGLE = -90 - INVISIBLE_ANGLE / 2

const circumference = computed(() => 2 * Math.PI * radius.value)
const visibleLength = computed(() => circumference.value * (VISIBLE_ANGLE / 360))
const invisibleLength = computed(() => circumference.value - visibleLength.value)

const dashArray = computed(() => (isDashboard.value ? visibleLength.value : circumference.value))

const startOffset = computed(() => (isDashboard.value ? invisibleLength.value / 2 : 0))

const dashOffset = computed(() => {
  const progress = props.value / props.max
  return startOffset.value + dashArray.value * (1 - progress)
})

const rotationAngle = computed(() => (isDashboard.value ? START_ANGLE : -90))

const getPercentage = computed(() => {
  const percent = Math.floor((props.value / props.max) * 100)
  return percent
})

const styleColor = computed(() => {
  if (props.statusbar === 'error') return '#ff4d4f'
  if (props.statusbar === 'warning') return '#f5a623'
  if (props.statusbar === 'success') return '#52c41a'

  const percent = (props.value / props.max) * 100

  if (percent <= 20) return '#F08080'
  if (percent <= 75) return '#00BFFF'
  return '#3BB44A'
})

const circleStyle = computed(() => ({
  strokeDasharray: dashArray.value,
  strokeDashoffset: dashOffset.value,
  stroke: styleColor.value,
  transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease',
}))
</script>

<template>
  <div class="progress-circle">
    <svg
      class="progress-circle__svg"
      :viewBox="isDashboard ? '0 0 104 84' : '0 0 104 104'"
      width="104"
      :height="isDashboard ? 84 : 104"
    >
      <circle
        class="progress-circle__background"
        :r="radius"
        cx="52"
        cy="52"
        :transform="`rotate(${rotationAngle} 52 52)`"
        :stroke-dasharray="dashArray.value"
        :stroke-dashoffset="startOffset.value"
      />

      <circle
        class="progress-circle__progress"
        :r="radius"
        cx="52"
        cy="52"
        :style="circleStyle"
        :transform="`rotate(${rotationAngle} 52 52)`"
      />
    </svg>
    <div
      class="progress-circle__center"
      :class="{ 'progress-circle__center--dashboard': isDashboard }"
    >
      <span
        class="progress-circle__icon"
        v-if="statusIcon"
        :class="statusbar === STATUSBAR_TYPE.success ? 'success' : statusbar"
        >{{ statusIcon }}</span
      >
      <span v-else class="progress-circle__percent">{{ getPercentage }} %</span>
    </div>
  </div>
</template>

<style scoped>
.progress-circle {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
}

.progress-circle__svg {
  width: 104px;
}

.progress-circle__background,
.progress-circle__progress {
  fill: none;
  stroke-width: 6;
  transition:
    stroke-dasharray 0.5s ease,
    stroke-dashoffset 0.5s ease,
    transform 0.5s ease;
}

.progress-circle__background {
  stroke: #e0e0e0;
}

.progress-circle__center {
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

.progress-circle__center--dashboard {
  top: 65%;
}

.progress-circle__icon {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.progress-circle__icon.warning {
  color: #f5a623;
}

.progress-circle__icon.error {
  color: #ff4d4f;
}

.progress-circle__icon.success {
  color: #52c41a;
}

.progress-circle__percent {
  color: #555;
}
</style>
