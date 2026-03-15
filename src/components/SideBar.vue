<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

import {
  HomeIcon,
  ChartBarIcon,
  CubeIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const menuItems = computed(() => {
  if (authStore.role === 'Director') {
    return [
      { name: 'Dashboard', path: '/director', icon: HomeIcon },
      { name: 'Analytics', path: '/director/analytics', icon: ChartBarIcon },
      { name: 'UserManagement', path: '/director/user-management', icon: UserGroupIcon },
    ]
  }

  if (authStore.role === 'Manager') {
    return [
      { name: 'Dashboard', path: '/manager', icon: HomeIcon },
      { name: 'Produce', path: '/manager/produce', icon: CubeIcon },
      { name: 'Sales', path: '/manager/sales', icon: ShoppingCartIcon },
      { name: 'Credit', path: '/manager/credit', icon: CreditCardIcon },
    ]
  }

  if (authStore.role === 'SalesAgent') {
    return [
      { name: 'Dashboard', path: '/agent', icon: HomeIcon },
      { name: 'Sales', path: '/agent/sales', icon: ShoppingCartIcon },
      { name: 'Credit', path: '/agent/credit', icon: CreditCardIcon },
    ]
  }

  return []
})

function goTo(path) {
  router.push(path)
}

function logout() {
  authStore.logout()
  router.push('/')
}

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <div class="dashboard">
    <aside class="side-bar">
      <!-- Logo -->
      <div class="logo">
        Karibu Groceries
        <img src="../assets/images/Karibu_logo.png" alt="Company Logo" />
        <h6>Logged in as: {{ authStore.user.username }} </h6>
        <h6>Role: {{ authStore.role }}</h6>
      </div>

      <!-- Menu -->
      <div class="sidebar-menu">
        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="goTo(item.path)"
          class="menu-buttons"
          :class="isActive(item.path) ? 'bg-slate-700' : 'hover:bg-slate-800'"
        >
          <component :is="item.icon" class="menu-button" />
          {{ item.name }}
        </button>
        
      </div>
     
      <!-- Logout -->
      <div class="button-container">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </aside>
    <main class="main">
      <header class="topbar">
        <h1>Karibu Groceries Management System ({{ authStore.user.branch }} Branch)</h1>
      </header>
      

      <router-view />
      <footer class="footer">
        <p>&copy; 2026 Karibu Groceries. All rights reserved.</p>
      </footer>
    </main>
    
  </div>
</template>
<style scoped>
.logo {
  display: grid;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #f3d646;
  font-size: 24px;
  font-weight: bold;
}
.logo img {
  width: 150px;
  height: 150px;
  border-radius: 10px;
}
.topbar {
  background-color: #01596d;
  color: #f3d646;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.footer {
  background-color: transparent;
  color: #f3d646;
  padding: 10px;
  bottom: 0;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
