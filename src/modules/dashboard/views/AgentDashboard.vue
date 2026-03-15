@<script setup>
import { ref, onMounted,  } from "vue"
import axios from "@/services/api"

const recentSales = ref([])

const loadSales = async () => {
  const res = await axios.get("/sales")

  recentSales.value = res.data
}

onMounted(loadSales)
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-UG').format(num)
}
</script>

<template>

<div class="full-page">

<h1 >
Sales Agent Dashboard
</h1>

<h2>
Recent Sales
</h2>

<table class="table">

<thead>
<tr>
<th class="table-header">Buyer</th>
<th class="table-header">Produce</th>
<th class="table-header">Tonnage</th>
<th class="table-header">Amount</th>
<th class="table-header">Date</th>
<th class="table-header">Actions</th>
</tr>
</thead>

<tbody>

<tr v-for="sale in recentSales" :key="sale._id">

<td class="table-data">{{ formatNumber(sale.buyerName) }}</td>
<td class="table-data">{{ formatNumber(sale.produce) }}</td>
<td class="table-data">{{ formatNumber(sale.tonnageSold) }}</td>
<td class="table-data">{{ formatNumber(sale.amountPaid) }}</td>
<td class="table-data">{{ new Date(sale.date).toDateString() }}</td>

<td class="table-data">
  <button class="button button-edit">Edit</button>
  <button class="button button-delete">Delete</button>
</td>

</tr>

</tbody>

</table>



</div>

</template>
<style scoped>
.full-page h1, h2{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>