<script setup>
import { onMounted, ref } from 'vue'
import { useCreditStore } from '@/stores/creditStore'
import CreditForm from './CreditForm.vue'

const creditStore = useCreditStore()
const showModal = ref(false)
const editingCredit = ref(null)

function openModal() {
  showModal.value = true
  editingCredit.value = null // new credit
}

function openEditModal(credit) {
  editingCredit.value = credit // pass selected credit to form
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  creditStore.fetchCredits()
})
</script>

<template>
  <div class="full-page">
    <h2>Recent Credit Sales</h2>
    <button @click="openModal" class="modal-button">
      + Add Credit Sale
    </button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="closeModal" class="modal-close-button">
            Close
          </button>
        </div>
        <div class="modal-body">

        <!-- FORM COMPONENT -->
        <CreditForm :credit="editingCredit" @close="closeModal" />
        </div>  
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="table-header">Buyer</th>
          <th class="table-header">Produce</th>
          <th class="table-header">Tonnage</th>
          <th class="table-header">Amount Paid</th>
          <th class="table-header">Amount Due</th>
          <th class="table-header">Due Date</th>
          <th class="table-header">Contact</th>
          <th class="table-header">Status</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="credit in creditStore.creditsales" :key="credit._id">
          <td class="table-data">{{ credit.buyerName }}</td>
          <td class="table-data">{{ credit.produce }}</td>
          <td class="table-data">{{ credit.tonnage }} Kgs</td>
          <td class="table-data">Ugx {{ credit.amountPaid }}</td>
          <td class="table-data">Ugx {{ credit.amountDue }}</td>
          <td class="table-data">{{ new Date(credit.dueDate).toDateString() }}</td>
          <td class="table-data">{{ credit.contact }}</td>
          <td class="table-data">{{ credit.status }}</td>
          <td class="table-data">
            <button
              class="button button-edit"
              @click="openEditModal(credit)"
            >
              Edit
            </button>
            <button
              class="button button-delete"
              @click="creditStore.deleteCredit(credit._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>