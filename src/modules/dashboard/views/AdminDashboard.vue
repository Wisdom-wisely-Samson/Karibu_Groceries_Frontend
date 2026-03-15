<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboard = useDashboardStore()

onMounted(() => {
  dashboard.fetchDashboard()
})

// number formatter
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-UG').format(num)
}
</script>

<template>
  
  <h2 class="h2">Manager Dashboard</h2>

  <div class="cards-container">
    <div class="card">
      <h3>Total Sales</h3>
      <p class="value">{{ formatNumber(dashboard.totalSales) }} UGX</p>
    </div>

    <div class="card">
      <h3>Total Credit</h3>
      <p class="value">{{ formatNumber(dashboard.totalCredit) }} UGX</p>
    </div>

    <div class="card">
      <h3>Total Cost</h3>
      <p class="value">{{ formatNumber(dashboard.totalCost) }} UGX</p>
    </div>

    <div class="card">
      <h3>Total Stock</h3>
      <p class="value">{{ formatNumber(dashboard.totalStock) }} kg</p>
    </div>

    <div class="card">
      <h3>Revenue</h3>
      <p class="value">{{ formatNumber(dashboard.revenue) }} UGX</p>
    </div>
  </div>
</template>
<style scoped>
.cards-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.card {
  background-color: #e1d9ae;
  padding: 1.5rem;
  border-radius: 8px;
  flex: 1 1 200px;
  text-align: center;
}
.card h3 {
  margin-bottom: 0.5rem;
  color: #01596D;
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #F3D646;
}
.h2 {
  color: #01596D;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  margin-bottom: 1.5rem;
}
</style>