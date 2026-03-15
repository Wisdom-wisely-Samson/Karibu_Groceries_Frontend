<script setup>
import { ref, computed, watch } from 'vue'
import { useSalesStore } from '@/stores/salesStore'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, minValue, helpers } from '@vuelidate/validators'
import Toast from '@/components/Toast.vue'

const props = defineProps({
  sale: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const salesStore = useSalesStore()
const toastRef = ref(null)

// ✅ Individual refs for each field
const produce = ref('')
const tonnageSold = ref(null)
const amountPaid = ref(null)
const buyerName = ref('')
const agentName = ref('')
const date = ref('')

// ✅ Watch for incoming sale prop and auto-fill
watch(
  () => props.sale,
  (sale) => {
    if (sale) {
      produce.value = sale.produce
      tonnageSold.value = sale.tonnageSold
      amountPaid.value = sale.amountPaid
      buyerName.value = sale.buyerName
      agentName.value = sale.agentName
      date.value = sale.date?.slice(0, 10)
    } else {
      produce.value = ''
      tonnageSold.value = null
      amountPaid.value = null
      buyerName.value = ''
      agentName.value = ''
      date.value = ''
    }
  },
  { immediate: true },
)

// ✅ Validation rules
const rules = computed(() => ({
  produce: {
    required: helpers.withMessage('Produce name required', required),
    minLength: helpers.withMessage('Minimum 2 characters', minLength(2)),
  },
  tonnageSold: {
    required: helpers.withMessage('Tonnage required', required),
    minValue: helpers.withMessage('Minimum is 1000kg', minValue(1000)),
  },
  amountPaid: {
    required: helpers.withMessage('Amount required', required),
    minValue: helpers.withMessage('Minimum UGX 10,000', minValue(10000)),
  },
  buyerName: {
    required: helpers.withMessage('Buyer name required', required),
    minLength: helpers.withMessage('Minimum 2 characters', minLength(2)),
  },
  agentName: {
    required: helpers.withMessage('Agent name required', required),
    minLength: helpers.withMessage('Minimum 2 characters', minLength(2)),
  },
  date: {
    required: helpers.withMessage('Date required', required),
  },
}))

const v$ = useVuelidate(rules, {
  produce,
  tonnageSold,
  amountPaid,
  buyerName,
  agentName,
  date,
})

const submitSale = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    toastRef.value.showToast('Please fix the errors before submitting.')
    return
  }

  if (props.sale?._id) {
    await salesStore.updateSale(props.sale._id, {
      produce: produce.value,
      tonnageSold: tonnageSold.value,
      amountPaid: amountPaid.value,
      buyerName: buyerName.value,
      agentName: agentName.value,
      date: date.value,
    })
    toastRef.value.showToast('Sale updated successfully!')
  } else {
    await salesStore.createSale({
      produce: produce.value,
      tonnageSold: tonnageSold.value,
      amountPaid: amountPaid.value,
      buyerName: buyerName.value,
      agentName: agentName.value,
      date: date.value,
    })
    toastRef.value.showToast('Sale added successfully!')
  }

  emit('close')
}
</script>

<template>
  <div>
    <form @submit.prevent="submitSale" class="form-container">
      <h2>{{ props.sale ? 'Edit Sale' : 'Add New Sale' }}</h2>

      <!-- Produce -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Produce</label>
        <input v-model="v$.produce.$model" placeholder="Produce Name" class="input" />
        <span v-if="v$.produce.$error" class="error-msg">
          <span v-for="err in v$.produce.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Tonnage Sold -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Tonnage Sold</label>
        <input
          v-model.number="v$.tonnageSold.$model"
          type="number"
          placeholder="Tonnage Sold"
          class="input"
        />
        <span v-if="v$.tonnageSold.$error" class="error-msg">
          <span v-for="err in v$.tonnageSold.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Amount Paid -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Amount Paid</label>
        <input
          v-model.number="v$.amountPaid.$model"
          type="number"
          placeholder="Amount Paid"
          class="input"
        />
        <span v-if="v$.amountPaid.$error" class="error-msg">
          <span v-for="err in v$.amountPaid.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Buyer Name -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Buyer Name</label>
        <input v-model="v$.buyerName.$model" placeholder="Buyer Name" class="input" />
        <span v-if="v$.buyerName.$error" class="error-msg">
          <span v-for="err in v$.buyerName.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Agent Name -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Agent Name</label>
        <input v-model="v$.agentName.$model" placeholder="Agent Name" class="input" />
        <span v-if="v$.agentName.$error" class="error-msg">
          <span v-for="err in v$.agentName.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <input v-model="v$.date.$model" type="date" class="input" />
        <span v-if="v$.date.$error" class="error-msg">
          <span v-for="err in v$.date.$errors" :key="err.$uid">{{ err.$message }}</span>
        </span>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary">
        {{ props.sale ? 'Update Sale' : 'Add Sale' }}
      </button>
    </form>

    <Toast ref="toastRef" />
  </div>
</template>

<style scoped>
.error-text {
  color: #ff4d4d;
  font-size: 12px;
  margin-bottom: 8px;
  display: block;
}
.error-border {
  border: 1px solid #ff4d4d;
}
.input-wrapper {
  margin-bottom: 10px;
}
</style>
