<script setup>
import { onMounted, computed } from 'vue'
import { useAnalyticsStore } from '@/stores/analyticsStore'

const analytics = useAnalyticsStore()

onMounted(() => {
  analytics.fetchAnalytics()
})

// ✅ Compute totals for each column
const totals = computed(() => {
  return {
    stock: analytics.branches.reduce((sum, b) => sum + b.stock, 0),
    sales: analytics.branches.reduce((sum, b) => sum + b.sales, 0),
    credit: analytics.branches.reduce((sum, b) => sum + b.credit, 0),
    cost: analytics.branches.reduce((sum, b) => sum + b.cost, 0),
    revenue: analytics.branches.reduce((sum, b) => sum + b.revenue, 0),
  }
})
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-UG').format(num)
}
</script>

<template>
  <h2 class="h2">Branch Comparison</h2>

  <table class="table">
    <thead>
      <tr>
        <th class="table-header">Branch</th>
        <th class="table-header">Total Stock</th>
        <th class="table-header">Total Sales</th>
        <th class="table-header">Total Credit</th>
        <th class="table-header">Total Cost</th>
        <th class="table-header">Total Revenue</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="branch in analytics.branches" :key="branch.branch">
        <td class="table-data">{{(branch.branch) }}</td>
        <td class="table-data">{{ formatNumber(branch.stock) }}</td>
        <td class="table-data">{{ formatNumber(branch.sales) }}</td>
        <td class="table-data">{{ formatNumber(branch.credit) }}</td>
        <td class="table-data">{{ formatNumber(branch.cost) }}</td>
        <td class="table-data">{{ formatNumber(branch.revenue) }}</td>
      </tr>

      <!-- ✅ Totals row -->
      <tr class="font-bold bg-gray-100">
        <td class="table-data">TOTAL</td>
        <td class="table-data">{{ formatNumber(totals.stock) }}</td>
        <td class="table-data">{{ formatNumber(totals.sales) }}</td>
        <td class="table-data">{{ formatNumber(totals.credit) }}</td>
        <td class="table-data">{{ formatNumber(totals.cost) }}</td>
        <td class="table-data">{{ formatNumber(totals.revenue) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.h2 {
  margin-bottom: 1rem;
  color: #01596D;
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>