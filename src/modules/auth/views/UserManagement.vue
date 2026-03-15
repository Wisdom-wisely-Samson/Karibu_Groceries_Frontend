<script setup>
import { onMounted, ref } from 'vue'
import { useUserManagementStore } from '@/stores/UserManagementStore'
import UserForm from './UserForm.vue'

const userManagementStore = useUserManagementStore()
const showModal = ref(false)
const editingUser = ref(null)

function openModal() {
  showModal.value = true
  editingUser.value = null // new user
}

function openEditModal(user) {
  editingUser.value = user // pass selected user to form
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  userManagementStore.fetchUsers()
})
</script>

<template>
  <div class="full-page">
    <h2>User Management</h2>
    <button @click="openModal" class="modal-button">+ Add User</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="closeModal" class="modal-close-button">Close</button>
        </div>

        <!-- FORM COMPONENT -->
        <UserForm :user="editingUser" @close="closeModal" />
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="table-header">Username</th>
          <th class="table-header">Email</th>
          <th class="table-header">Role</th>
          <th class="table-header">Branch</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in userManagementStore.users" :key="user._id">
          <td class="table-data">{{ user.username }}</td>
          <td class="table-data">{{ user.email }}</td>
          <td class="table-data">{{ user.role }}</td>
          <td class="table-data">{{ user.branch }}</td>
          <td class="table-data">
            <table-column>
            
            <button class="btn button-edit" @click="openEditModal(user)"
            >Edit
          </button>
            </table-column>
            <table-column>
             <button class="btn button-delete"
          
            @click="userManagementStore.deleteUser(user._id)"
            >
              Delete
            </button>
            </table-column>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

