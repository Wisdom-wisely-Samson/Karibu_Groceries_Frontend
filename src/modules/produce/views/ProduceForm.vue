<script setup>
import { ref, computed, watch } from 'vue'
import { useProduceStore } from '@/stores/produceStore'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, minValue, helpers } from '@vuelidate/validators'
import Toast from '@/components/Toast.vue'

const props = defineProps({
  produce: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const produceStore = useProduceStore()
const toastRef = ref(null)

// Form State
const name = ref('')
const type = ref('')
const tonnage = ref('')
const cost = ref('')
const sellingPrice = ref('')
const dealerName = ref('')
const contact = ref('')
const branch = ref('')
const date = ref('')

// Watch for incoming produce and auto-fill
watch(
  () => props.produce,
  (produce) => {
    if (produce) {
      name.value = produce.name
      type.value = produce.type
      tonnage.value = produce.tonnage
      cost.value = produce.cost
      sellingPrice.value = produce.sellingPrice
      dealerName.value = produce.dealerName
      contact.value = produce.contact
      branch.value = produce.branch
      date.value = produce.date?.slice(0, 10)
    } else {
      // reset for new produce
      name.value = ''
      type.value = ''
      tonnage.value = ''
      cost.value = ''
      sellingPrice.value = ''
      dealerName.value = ''
      contact.value = ''
      branch.value = ''
      date.value = ''
    }
  },
  { immediate: true },
)

// Validation Rules
const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Produce name required', required),
    minLength: minLength(2),
  },
  type: {
    required: helpers.withMessage('Produce type required', required),
    minLength: minLength(2),
  },
  tonnage: {
    required: helpers.withMessage('Tonnage required', required),
    minValue: helpers.withMessage('Minimum is 1000kg', minValue(1000)),
  },
  cost: {
    required: helpers.withMessage('Cost required', required),
    minValue: helpers.withMessage('Minimum UGX 10,000', minValue(10000)),
  },
  sellingPrice: {
    required: helpers.withMessage('Price required', required),
    minValue: helpers.withMessage('Minimum UGX 1,000', minValue(1000)),
  },
  dealerName: {
    required: helpers.withMessage('Dealer name required', required),
    minLength: minLength(2),
  },
  contact: {
    required: helpers.withMessage('Contact required', required),
    min: helpers.withMessage('Contact required', minLength(10)),
    max: helpers.withMessage('Contact must be 10 digits', maxLength(10)),
  },
  branch: { required },
  date: { required: helpers.withMessage('Arrival date required', required) },
}))

const v$ = useVuelidate(rules, {
  name,
  type,
  tonnage,
  cost,
  sellingPrice,
  dealerName,
  contact,
  branch,
  date,
})

const submitProduce = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    toastRef.value.showToast('Please fix the errors before submitting.')
    return
  }

  if (props.produce?._id) {
    // ✅ Update existing produce
    await produceStore.updateProduce(props.produce._id, {
      name: name.value,
      type: type.value,
      tonnage: tonnage.value,
      cost: cost.value,
      sellingPrice: sellingPrice.value,
      dealerName: dealerName.value,
      contact: contact.value,
      branch: branch.value,
      date: date.value,
    })
    toastRef.value.showToast('Produce updated successfully!')
  } else {
    // ✅ Create new produce
    await produceStore.createProduce({
      name: name.value,
      type: type.value,
      tonnage: tonnage.value,
      cost: cost.value,
      sellingPrice: sellingPrice.value,
      dealerName: dealerName.value,
      contact: contact.value,
      branch: branch.value,
      date: date.value,
    })
    toastRef.value.showToast('Produce added successfully!')
  }

  emit('close')
}
</script>

<template>
  <div>
    <form @submit.prevent="submitProduce" class="form-container">
      <h2>{{ props.produce ? 'Edit Produce' : 'Add New Produce' }}</h2>

      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700">Produce Name</label>
        <input v-model="v$.name.$model" placeholder="Produce Name" class="input" />
        <span v-if="v$.name.$error" class="error-msg">{{ v$.name.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
        <input v-model="v$.type.$model" placeholder="Type" class="input" />
        <span v-if="v$.type.$error" class="error-msg">{{ v$.type.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="tonnage" class="block text-sm font-medium text-gray-700">Tonnage</label>
        <input
          v-model.number="v$.tonnage.$model"
          placeholder="Tonnage"
          type="number"
          class="input"
        />
        <span v-if="v$.tonnage.$error" class="error-msg">{{ v$.tonnage.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="cost" class="block text-sm font-medium text-gray-700">Cost Price</label>
        <input
          v-model.number="v$.cost.$model"
          placeholder="Cost Price"
          type="number"
          class="input"
        />
        <span v-if="v$.cost.$error" class="error-msg">{{ v$.cost.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="sellingPrice" class="block text-sm font-medium text-gray-700">Selling Price</label>
        <input
          v-model.number="v$.sellingPrice.$model"
          placeholder="Selling Price"
          type="number"
          class="input"
        />
        <span v-if="v$.sellingPrice.$error" class="error-msg">{{
          v$.sellingPrice.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <label for="dealerName" class="block text-sm font-medium text-gray-700">Dealer Name</label>
        <input v-model="v$.dealerName.$model" placeholder="Dealer Name" class="input" />
        <span v-if="v$.dealerName.$error" class="error-msg">{{
          v$.dealerName.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
        <input v-model="v$.contact.$model" placeholder="Contact" class="input" />
        <span v-if="v$.contact.$error" class="error-msg">{{ v$.contact.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="branch" class="block text-sm font-medium text-gray-700">Branch</label>
        <input v-model="v$.branch.$model" placeholder="Branch" class="input" />
        <span v-if="v$.branch.$error" class="error-msg">Branch required</span>
      </div>

      <div class="form-group">
        <label for="date" class="block text-sm font-medium text-gray-700">Arrival Date</label>
        <input v-model="v$.date.$model" type="date" class="input" />
        <span v-if="v$.date.$error" class="error-msg">{{ v$.date.$errors[0].$message }}</span>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ props.produce ? 'Update Produce' : 'Add Produce' }}
      </button>
    </form>

    <Toast ref="toastRef" />
  </div>
</template>

<style scoped>

.check-icon {
  color: green;
  font-size: 14px;
  margin-top: 2px;
}
</style>
