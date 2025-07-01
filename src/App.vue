<script setup>

</script>

<template>
    <nav class="main-nav">
        <router-link to="/">Home</router-link> ||
        <router-link to="/pie">Pie Chart</router-link>
    </nav>
    <router-view />

</template>

<style scoped>
.progress-container {
    display: flex;
    gap: 16px;
    justify-content: start;
    align-items: center;
}

.main-nav a.router-link-active {
    font-weight: bold;
}
</style>