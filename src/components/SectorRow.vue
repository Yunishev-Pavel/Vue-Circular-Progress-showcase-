<script setup>
defineProps({
    sector: Object
})
</script>

<template>
    <div class="sector-row">
        <div class="sector-info">
            <div class="color-indicator" :style="{ backgroundColor: sector.color }"></div>
            <div class="sector-name">{{ sector.name }}</div>
        </div>

        <div class="sector-value">{{ sector.value }}%</div>

        <div class="sector-actions">
            <button class="edit-btn" @click="$emit('edit', sector)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.6667 2L12.6667 4L5.33333 11.3333H3.33333V9.33333L10.6667 2Z" stroke="#6B7280"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button class="delete-btn" @click="$emit('delete', sector.id)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M3.33325 4.66669H12.6666M6.33325 7.33335V10.6667M9.66659 7.33335V10.6667M3.33325 2.66669H12.6666V13.3334C12.6666 14.0697 12.0696 14.6667 11.3333 14.6667H4.66659C3.93031 14.6667 3.33325 14.0697 3.33325 13.3334V2.66669ZM6.33325 1.33335V2.66669H9.66659V1.33335H6.33325Z"
                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.sector-row {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #F1F3F9;
    transition: background-color 0.2s;
}

.sector-row:hover {
    background-color: #F9FAFB;
}

.sector-info {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 12px;
}

.color-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
}

.sector-name {
    font-size: 14px;
    color: #1F2937;
    font-weight: 500;
}

.sector-value {
    font-size: 14px;
    color: #4B5563;
    font-weight: 600;
    min-width: 50px;
    text-align: right;
    margin: 0 24px;
}

.sector-actions {
    display: flex;
    gap: 12px;
}

.edit-btn,
.delete-btn {
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

.edit-btn:hover {
    background-color: #EFF6FF;
}

.edit-btn:hover svg path {
    stroke: #3B82F6;
}

.delete-btn:hover {
    background-color: #FEF2F2;
}

.delete-btn:hover svg path {
    stroke: #EF4444;
}
</style>