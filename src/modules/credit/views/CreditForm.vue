<script setup>
import { ref, computed, watch } from 'vue'
import { useCreditStore } from '@/stores/creditStore'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'
import Toast from '@/components/Toast.vue'

const props = defineProps({
  credit: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const creditStore = useCreditStore()
const toastRef = ref(null)

// Form State
const buyerName = ref('')
const nationalId = ref('')
const location = ref('')
const contact = ref('')
const amountDue = ref('')
const amountPaid = ref('')
const produce = ref('')
const tonnage = ref('')
const dueDate = ref('')
const date = ref('')

// ✅ Watch for incoming credit and auto-fill
watch(
  () => props.credit,
  (credit) => {
    if (credit) {
      buyerName.value = credit.buyerName
      nationalId.value = credit.nationalId
      location.value = credit.location
      contact.value = credit.contact
      amountDue.value = credit.amountDue
      amountPaid.value = credit.amountPaid
      produce.value = credit.produce
      tonnage.value = credit.tonnage
      dueDate.value = credit.dueDate?.slice(0, 10)
      date.value = credit.date?.slice(0, 10)
    } else {
      // reset for new credit
      buyerName.value = ''
      nationalId.value = ''
      location.value = ''
      contact.value = ''
      amountDue.value = ''
      amountPaid.value = ''
      produce.value = ''
      tonnage.value = ''
      dueDate.value = ''
      date.value = ''
    }
  },
  { immediate: true },
)

// Validation Rules
const rules = computed(() => ({
  produce: { required: helpers.withMessage('Field required', required) },
  buyerName: { required: helpers.withMessage('Field required', required) },
  location: { required: helpers.withMessage('Field required', required) },
  tonnage: {
    required: helpers.withMessage('Value required', required),
    minValue: helpers.withMessage('Minimum 1000', minValue(1000)),
  },
  amountDue: {
    required: helpers.withMessage('Value required', required),
    minValue: helpers.withMessage('Minimum 10000', minValue(10000)),
  },
  amountPaid: {
    required: helpers.withMessage('Value required', required),
    minValue: helpers.withMessage('Minimum 10000', minValue(10000)),
  },
  contact: {
    required: helpers.withMessage('Field required', required),
    exact: helpers.withMessage('Must be 10 characters', (val) => val.length === 10),
  },
  nationalId: {
    required: helpers.withMessage('Field required', required),
    exact: helpers.withMessage('Must be 13 characters', (val) => val.length === 13),
  },
  dueDate: { required },
  date: { required },
}))

const v$ = useVuelidate(rules, {
  produce,
  buyerName,
  location,
  tonnage,
  amountDue,
  amountPaid,
  contact,
  nationalId,
  dueDate,
  date,
})

const submitCredit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    toastRef.value.showToast('Please fix the errors before submitting.')
    return
  }

  if (props.credit?._id) {
    // ✅ Update existing credit
    await creditStore.updateCredit(props.credit._id, {
      buyerName: buyerName.value,
      nationalId: nationalId.value,
      location: location.value,
      contact: contact.value,
      amountDue: amountDue.value,
      amountPaid: amountPaid.value,
      produce: produce.value,
      tonnage: tonnage.value,
      dueDate: dueDate.value,
      date: date.value,
    })
    toastRef.value.showToast('Credit sale updated successfully!')
  } else {
    // ✅ Create new credit
    await creditStore.createCredit({
      buyerName: buyerName.value,
      nationalId: nationalId.value,
      location: location.value,
      contact: contact.value,
      amountDue: amountDue.value,
      amountPaid: amountPaid.value,
      produce: produce.value,
      tonnage: tonnage.value,
      dueDate: dueDate.value,
      date: date.value,
    })
    toastRef.value.showToast('Credit sale added successfully!')
  }

  emit('close')
}
</script>

<template>
  <div class="add">
    <form @submit.prevent="submitCredit" class="form-container">
      <h2>{{ props.credit ? 'Edit Credit Sale' : 'Add New Credit' }}</h2>

      <div class="form-group">
        <input v-model="v$.buyerName.$model" placeholder="Buyer Name" class="input" />
        <span v-if="v$.buyerName.$error" class="err-msg">{{
          v$.buyerName.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <input v-model="v$.nationalId.$model" placeholder="National ID" class="input" />
        <span v-if="v$.nationalId.$error" class="err-msg">{{
          v$.nationalId.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <input v-model="v$.location.$model" placeholder="Location" class="input" />
        <span v-if="v$.location.$error" class="err-msg">{{ v$.location.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <input v-model="v$.contact.$model" placeholder="Contact" class="input" />
        <span v-if="v$.contact.$error" class="err-msg">{{ v$.contact.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <input
          v-model.number="v$.amountDue.$model"
          placeholder="Amount Due"
          type="number"
          class="input"
        />
        <span v-if="v$.amountDue.$error" class="err-msg">{{
          v$.amountDue.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <input
          v-model.number="v$.amountPaid.$model"
          placeholder="Amount Paid"
          type="number"
          class="input"
        />
        <span v-if="v$.amountPaid.$error" class="err-msg">{{
          v$.amountPaid.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group">
        <label for="produce" class="block text-sm font-medium text-gray-700">Produce</label>
        <input v-model="v$.produce.$model" placeholder="Produce Name" class="input" />
        <span v-if="v$.produce.$error" class="err-msg">{{ v$.produce.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="tonnage" class="block text-sm font-medium text-gray-700">Tonnage</label>
        <input
          v-model.number="v$.tonnage.$model"
          placeholder="Tonnage"
          type="number"
          class="input"
        />
        <span v-if="v$.tonnage.$error" class="err-msg">{{ v$.tonnage.$errors[0].$message }}</span>
      </div>

      <div class="form-group">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
        <input v-model="v$.dueDate.$model" type="date" class="input" />
        <span v-if="v$.dueDate.$error" class="err-msg">Field required</span>
      </div>

      <div class="form-group">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>  
        <input v-model="v$.date.$model" type="date" class="input" />
        <span v-if="v$.date.$error" class="err-msg">Field required</span>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ props.credit ? 'Update Credit' : 'Add Credit' }}
      </button>
    </form>

    <Toast ref="toastRef" />
  </div>
</template>

<style scoped>
.err-msg {
  color: red;
  font-size: 0.7rem;
  display: block;
}
.check {
  color: green;
  font-size: 0.8rem;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
