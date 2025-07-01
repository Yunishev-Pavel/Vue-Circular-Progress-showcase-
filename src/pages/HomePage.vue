<script setup>
import { ref } from 'vue';
import CircleProgress from '@/components/CircleProgress.vue';

const type = ref('circle')


</script>

<template>
    <div class="home-page">
        <h1>Круговой прогресс-бар</h1>
        <div>
            <label>
                <input type="radio" value="circle" v-model="type" />
                Circle
            </label>
            <label>
                <input type="radio" value="dashboard" v-model="type" />
                Dashboard
            </label>
        </div>
        <div class="circle-container">
            <CircleProgress :value="0" :max="100" statusbar="in-progress" :type="type" />
            <CircleProgress :value="10" :max="100" statusbar="in-progress" :type="type" />
            <CircleProgress :value="25" :max="100" statusbar="in-progress" :type="type" />
            <CircleProgress :value="100" :max="100" statusbar="success" :type="type" />
            <CircleProgress :value="75" :max="100" statusbar="warning" :type="type" />
            <CircleProgress :value="50" :max="100" statusbar="error" :type="type" />
        </div>
    </div>
</template>



<style scoped>
.home-page {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Inter', -apple-system, sans-serif;
}

.circle-container {
    margin-top: 24px;
    display: flex;
    gap: 24px;
}
</style>