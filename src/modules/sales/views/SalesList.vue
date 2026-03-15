<script setup>
import { onMounted } from 'vue'
import { useSalesStore } from '@/stores/salesStore'
import { ref } from 'vue'
import SalesForm from './SalesForm.vue'

const salesStore = useSalesStore()
const showModal = ref(false)
const editingSale = ref(null)

function openModal() {
  showModal.value = true
  editingSale.value = null
}
function openEditModal(sale) {
  editingSale.value = sale
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  salesStore.fetchSales()
})
</script>

<template>
  <div class="full-page">
    <h2>Recent Sales</h2>
    <button @click="openModal" class="modal-button">+ Add Sale</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="closeModal" class="modal-close-button">Close</button>
        </div>

        <!-- ✅ Scrollable body -->
        <div class="modal-body">
          <SalesForm :sale="editingSale" @close="closeModal" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr>
          <th class="table-header">Customer</th>
          <th class="table-header">Produce</th>
          <th class="table-header">Tonnage</th>
          <th class="table-header">Amount</th>
          <th class="table-header">Date</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in salesStore.sales" :key="sale._id" class="border-t">
          <td class="table-data">{{ sale.buyerName }}</td>
          <td class="table-data">{{ sale.produce }}</td>
          <td class="table-data">{{ sale.tonnageSold }}Kgs</td>
          <td class="table-data">Ugx {{ sale.amountPaid }}</td>
          <td class="table-data">{{ new Date(sale.date).toDateString() }}</td>
          <td class="table-data">
            <button class="button button-edit" @click="openEditModal(sale)">Edit</button>
            <button class="button button-delete" @click="salesStore.deleteSale(sale._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
