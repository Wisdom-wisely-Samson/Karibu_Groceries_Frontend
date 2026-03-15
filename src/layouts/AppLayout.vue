<script setup>

import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'


</script>

<template>
  <div class="flex h-screen">

    <SideBar />

    <div class="flex-1 flex flex-col">

      <TopBar />

      <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <!-- <router-view /> -->
      </main>

    </div>

  </div>

  

</template>
