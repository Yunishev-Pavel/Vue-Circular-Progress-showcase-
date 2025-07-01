<script setup>
import { ref, watch } from 'vue'
import { ColorPicker } from "vue3-colorpicker"
import 'vue3-colorpicker/style.css'
import { colornames } from 'color-name-list';

const emit = defineEmits(['submit'])
const props = defineProps({
    modelValue: Object
})

const name = ref('')
const value = ref(0)
const color = ref('#4F46E5')
const isEdit = ref(false)
const showPicker = ref(false)

watch(() => props.modelValue, v => {
    if (v) {
        isEdit.value = !!v.id
        name.value = v.name || ''
        value.value = v.value || 25
        color.value = v.color || '#4F46E5'
    }
}, { immediate: true })

function onSubmit() {
    const payload = {
        id: props.modelValue?.id,
        name: name.value,
        value: value.value,
        color: color.value
    }
    emit('submit', payload)
}
function togglePicker() {
    showPicker.value = !showPicker.value
}

const getColorName = (hex) => {
    const normalizedHex = hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;
    const colorObj = colornames.find(c => c.hex.toLowerCase() === normalizedHex.toLowerCase());

    return colorObj ? colorObj.name : 'Пользовательский';
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="pie-form">
        <div class="form-group">
            <label>Наименование:</label>
            <input class="input" v-model="name" placeholder="Введите наименование" required />
        </div>

        <div class="form-group">
            <label>Значение:</label>
            <input class="input" v-model.number="value" type="number" placeholder="0-100" min="0" max="100" required />
        </div>

        <div class="form-group">
            <label>Цвет</label>
            <div class="color-picker-toggle" :class="{ open: showPicker }" @click="togglePicker">
                <div class="color-box" :style="{ backgroundColor: color }"></div>

                <span>{{ getColorName(color) }}</span>

                <svg class="arrow-icon" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M9 5L5.35355 1.35355C5.15829 1.15829 4.84171 1.15829 4.64645 1.35355L1 5" stroke="#99A1B7"
                        stroke-width="1.3" stroke-linecap="round" />
                </svg>
            </div>

            <div class="picker-wrapper" v-show="showPicker">
                <ColorPicker is-widget picker-type="chrome" disable-history format="hex" v-model:pureColor="color" />
            </div>
        </div>

        <button class="submit-btn" type="submit">{{ isEdit ? 'Сохранить' : 'Добавить сектор' }}</button>
    </form>
</template>

<style scoped>
.pie-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    max-width: 400px;
    margin: 0 auto;
    font-family: 'Inter', -apple-system, sans-serif;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-size: 14px;
    font-weight: 500;
    color: #4B5563;
    letter-spacing: -0.2px;
}

.input {
    padding: 12px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;
    background: #F9FAFB;
}

.input:focus {
    outline: none;
    border-color: #6366F1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    background: #FFFFFF;
}

.color-picker-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 12px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    background: #F9FAFB;
    transition: all 0.2s;
}

.color-picker-toggle:hover {
    background: #F3F4F6;
}

.color-box {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1px solid #E5E7EB;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.arrow-icon {
    margin-left: auto;
    transition: transform 0.3s ease;
}

.color-picker-toggle.open .arrow-icon {
    transform: rotate(180deg);
}

.picker-wrapper {
    width: 100%;
    margin-top: 12px;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    max-height: 0;
    overflow: hidden;
}

.color-picker-toggle.open+.picker-wrapper {
    max-height: 300px;
}

.submit-btn {
    background-color: #1B84FF;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: -0.2px;
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}

.submit-btn:hover {
    background-color: #4338CA;
    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}
</style>
