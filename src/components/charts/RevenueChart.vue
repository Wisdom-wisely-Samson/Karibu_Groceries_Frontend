<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { useAnalyticsStore } from '@/stores/analyticsStore'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const analytics = useAnalyticsStore()

const chartData = computed(() => ({
  labels: analytics.branches.map((b) => b.branch),
  datasets: [
    {
      label: 'Branch Stock',
      data: analytics.branches.map((b) => b.stock),
      backgroundColor: '#6366f1', // Indigo
      borderRadius: 6,            // Rounded bars
    },
    {
      label: 'Branch Sales',
      data: analytics.branches.map((b) => b.sales),
      backgroundColor: '#10b981', // Emerald
      borderRadius: 6,
    },
    {
      label: 'Branch Credit',
      data: analytics.branches.map((b) => b.credit),
      backgroundColor: '#ef4444', // Red
      borderRadius: 6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#374151', // Gray-700
        font: { size: 12, weight: '500' },
      },
    },
    title: {
      display: true,
      text: 'Branch Performance Distribution',
      color: '#111827', // Gray-900
      font: { size: 16, weight: 'bold' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#6b7280' }, // Gray-500
      grid: { display: false },
    },
    y: {
      ticks: { color: '#6b7280' },
      grid: { color: '#e5e7eb' }, // Light gray grid
    },
  },
}
</script>

<template>
  <div class="chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<style scoped>
.chart {
min-height: 200px;
min-width: 250px;
}
</style>
