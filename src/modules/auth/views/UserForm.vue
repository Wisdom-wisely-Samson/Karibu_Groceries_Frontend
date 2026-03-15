<script setup>
import { ref, watch } from 'vue'
import { useUserManagementStore } from '@/stores/UserManagementStore'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const userManagementStore = useUserManagementStore()

// Form State
const username = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const branch = ref('')

// ✅ Watch for incoming user and auto-fill
watch(
  () => props.user,
  (user) => {
    if (user) {
      username.value = user.username
      email.value = user.email
      password.value = '' // keep empty for security, unless editing password
      role.value = user.role
      branch.value = user.branch
    } else {
      // reset for new user
      username.value = ''
      email.value = ''
      password.value = ''
      role.value = ''
      branch.value = ''
    }
  },
  { immediate: true },
)

async function submitForm() {
  const newUser = {
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value,
    branch: branch.value,
  }

  if (props.user?._id) {
    // ✅ Update existing user
    await userManagementStore.updateUser(props.user._id, newUser)
  } else {
    // ✅ Create new user
    await userManagementStore.addUser(newUser)
  }

  // Clear form fields after submission
  username.value = ''
  email.value = ''
  password.value = ''
  role.value = ''
  branch.value = ''

  emit('close')
}
</script>

<template>
  <div class="user-form">
    <h2 class="text-xl font-bold mb-4">
      {{ props.user ? 'Edit User' : 'Add New User' }}
    </h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input v-model="username" type="text" id="username" class="input" required />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" class="input" required />
      </div>

      <div v-if="!props.user">
        <!-- Only show password field when creating a new user -->
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" class="input" required />
      </div>

      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
        <select v-model="role" id="role" class="input" required>
          <option value="" disabled>Select role</option>
          <option value="Director">Director</option>
          <option value="Manager">Manager</option>
          <option value="SalesAgent">Sales Agent</option>
        </select>
      </div>

      <div>
        <label for="branch" class="block text-sm font-medium text-gray-700">Branch</label>
        <select v-model="branch" id="branch" class="input" required>
          <option value="" disabled>Select branch</option>
          <option value="Matugga">Matugga</option>
          <option value="Maganjo">Maganjo</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ props.user ? 'Update User' : 'Add User' }}
      </button>
    </form>
  </div>
</template>
