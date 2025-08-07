<script setup>
import { ref, watch } from 'vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import { colornames } from 'color-name-list'
import ArrowIcon from './icon/arrowIcon.vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  modelValue: Object,
})

const name = ref('')
const value = ref(0)
const color = ref('#4F46E5')
const isEdit = ref(false)
const showPicker = ref(false)

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      isEdit.value = !!v.id
      name.value = v.name || ''
      value.value = v.value || 25
      color.value = v.color || '#4F46E5'
    }
  },
  { immediate: true },
)

function submitForm() {
  const payload = {
    id: props.modelValue?.id,
    name: name.value,
    value: value.value,
    color: color.value,
  }
  emit('submit', payload)
}
function togglePicker() {
  showPicker.value = !showPicker.value
}

const getColorName = (hex) => {
  const normalizedHex =
    hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex

  const colorObj = colornames.find((c) => c.hex.toLowerCase() === normalizedHex.toLowerCase())
  return colorObj ? colorObj.name : 'Пользовательский'
}
</script>

<template>
  <form @submit.prevent="submitForm" class="pie-form">
    <div class="pie-form__group">
      <label class="pie-form__label">Наименование:</label>
      <input class="pie-form__input" v-model="name" placeholder="Введите наименование" required />
    </div>

    <div class="pie-form__group">
      <label class="pie-form__label">Значение:</label>
      <input
        class="pie-form__input"
        v-model.number="value"
        type="number"
        placeholder="0-100"
        min="0"
        max="100"
        required
      />
    </div>

    <div class="pie-form__color-field">
      <label class="pie-form__label">Цвет</label>
      <div
        class="pie-form__picker-toggle"
        :class="{ 'pie-form__picker-toggle--open': showPicker }"
        @click="togglePicker"
      >
        <div class="pie-form__color-box" :style="{ backgroundColor: color }"></div>

        <span>{{ getColorName(color) }}</span>

        <ArrowIcon class="pie-form__arrow-icon" />
      </div>

      <div class="pie-form__picker-wrapper">
        <ColorPicker
          is-widget
          picker-type="chrome"
          disable-history
          format="hex"
          v-model:pureColor="color"
        />
      </div>
    </div>

    <button class="pie-form__submit" type="submit">
      {{ isEdit ? 'Сохранить' : 'Добавить сектор' }}
    </button>
  </form>
</template>

<style scoped>
.pie-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  margin: 0 auto;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
}

.pie-form__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pie-form__label {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  letter-spacing: -0.2px;
}

.pie-form__input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background: #f9fafb;
}

.pie-form__input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: #ffffff;
}

.pie-form__color-field {
  position: relative;
}

.pie-form__color-box {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.pie-form__picker-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
}

.pie-form__arrow-icon {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.pie-form__picker-toggle:hover {
  background: #f3f4f6;
}

.pie-form__picker-toggle--open .pie-form__arrow-icon {
  transform: rotate(180deg);
}
.pie-form__picker-toggle--open + .pie-form__picker-wrapper {
  max-height: 300px;
}

.pie-form__picker-wrapper {
  width: 100%;
  margin-top: 32px;
  border: 1px solid #e5e7eb;
  top: calc(100% + 4px);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-height: 0;
  overflow: hidden;
}

.pie-form__submit {
  width: 350px;
  height: 60px;
  background-color: #1b84ff;
  color: white;
  padding: 18px 36px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  opacity: 1;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: -0.2px;
  outline: none;
  border: none;
}

.pie-form__submit:hover {
  background-color: #0052cc;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}
</style>
