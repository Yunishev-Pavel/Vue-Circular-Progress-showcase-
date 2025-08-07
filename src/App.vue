<script setup>
import { PATH } from './router/path'
</script>

<template>
  <nav class="main-nav" aria-label="Главная навигация">
    <ul class="main-nav__list">
      <li class="main-nav__item">
        <router-link :to="PATH.home" class="main-nav__link" active-class="main-nav__link--active"
          >Circular Progress Bar</router-link
        >
      </li>
      <li class="main-nav__item">|</li>
      <li class="main-nav__item">
        <router-link :to="PATH.pie" class="main-nav__link" active-class="main-nav__link--active"
          >Pie Chart</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style scoped>
.main-nav__list {
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav__link {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}

.main-nav__link:hover {
  color: #1677ff;
}

.main-nav__link--active {
  font-weight: bold;
}
</style>
