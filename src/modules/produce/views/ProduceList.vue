<script setup>
import { onMounted, ref } from 'vue'
import { useProduceStore } from '@/stores/produceStore'
import ProduceForm from './ProduceForm.vue'

const produceStore = useProduceStore()
const showModal = ref(false)
const editingProduce = ref(null)

function openModal() {
  showModal.value = true
  editingProduce.value = null // new produce
}

function openEditModal(item) {
  editingProduce.value = item // pass selected produce to form
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  produceStore.fetchProduces()
})
</script>

<template>
  <div class="full-page">
    <h2>Recent Produce</h2>
    <button @click="openModal" class="modal-button">+ Add Produce</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="closeModal" class="modal-close-button">Close</button>
        </div>
        <div class="modal-body">
          <!-- FORM COMPONENT -->
          <ProduceForm :produce="editingProduce" @close="closeModal" />
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="table-header">Name</th>
          <th class="table-header">Tonnage</th>
          <th class="table-header">Branch</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in produceStore.produceList" :key="item._id" class="border-t">
          <td class="table-data">{{ item.name }}</td>
          <td class="table-data">{{ item.tonnage }} Kgs</td>
          <td class="table-data">{{ item.branch }}</td>

          <td class="table-data">
            <button class="button button-edit" @click="openEditModal(item)">Edit</button>

            <button class="button button-delete" @click="produceStore.deleteProduce(item._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
