<script setup>
import { onMounted, computed } from 'vue'
import { useAnalyticsStore } from '@/stores/analyticsStore'

// import DashboardCard from '@/components/DashboardCard.vue'
import RevenueChart from '@/components/charts/RevenueChart.vue'
const analytics = useAnalyticsStore()

onMounted(() => {
  analytics.fetchAnalytics()
})

// ✅ Compute totals across all branches
const totals = computed(() => {
  return {
    revenue: analytics.branches.reduce((sum, b) => sum + b.revenue, 0),
    produce: analytics.branches.reduce((sum, b) => sum + b.stock, 0),
    credit: analytics.branches.reduce((sum, b) => sum + b.credit, 0),
    sales: analytics.branches.reduce((sum, b) => sum + b.sales, 0),
  }
})
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-UG').format(num)
}
</script>

<template>
  <div class="page">
    <h1>Director Dashboard</h1>

    <!-- KPI CARDS -->
    <div class="dashboard-cards">
      <div class="card">
        <h3>Total Revenue</h3>
        <p class="value">{{ formatNumber(totals.revenue) }} UGX</p>
      </div>
      <div class="card">
        <h3>Total Produce</h3>
        <p class="value">{{ formatNumber(totals.produce) }} kg</p>
      </div>
      <div class="card">
        <h3>Total Credit</h3>
        <p class="value">{{ formatNumber(totals.credit) }} UGX</p>
      </div>
      <div class="card">
        <h3>Total Sales</h3>
        <p class="value">{{ formatNumber(totals.sales) }} UGX</p>
      </div>
    </div>

    <!-- CHART SECTION -->
      <div class="charts">
      <div class="rev-chart">
      <RevenueChart />
      </div>
      <div class="chart">
        <!-- Placeholder for another chart -->
      </div>
      
   </div>
  </div>
</template>
<style scoped>



.rev-chart {
  background-color: #9bd4e1;
  
}
.charts {
  display: flex;
  gap: 1.5rem;
  color: #01596D;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  
}
.charts  div {
  flex: 1;
  height: 200px;
}

.dashboard-cards {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cards {
  flex: 1 1 200px;
  height: 150px;
}
.page{
  background-color: #6eadbc;
}
.page h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
   'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #01596D
}

</style>
