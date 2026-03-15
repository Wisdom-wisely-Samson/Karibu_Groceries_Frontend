
<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: String
})
</script>

<template>
  <div class="full-page">
    
    <div class="cards">
    <!-- <div :class="`p-4 rounded-lg text-white ${color}`">
      <i :class="icon"></i>
    </div> -->

    <div class="card">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ value }}</div>
    </div>
  </div>
  </div>
</template>
