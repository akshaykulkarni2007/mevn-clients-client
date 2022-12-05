<template>
	<form id="clientForm" @submit.prevent="submit()">
		<div class="mb-3">
			<label for="name" class="form-label">Name</label>
			<input
				type="text"
				class="form-control"
				id="name"
				v-model="name"
				required
			/>
		</div>

		<div class="mb-3">
			<label for="Email" class="form-label">Email</label>
			<input
				type="email"
				class="form-control"
				id="email"
				v-model="email"
				required
			/>
		</div>

		<div class="mb-3">
			<label for="phone" class="form-label">Phone</label>
			<input
				type="text"
				class="form-control"
				id="phone"
				v-model="phone"
				required
			/>
		</div>

		<ProviderList
			:providers="providersList"
			:selected="props.editData?.providers"
			@setSelectedProviders="setSelectedProviders"
			@onAddProvider="onAddProvider"
			@onEditProvider="onEditProvider"
			@onDeleteProvider="onDeleteProvider"
		/>
	</form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ProviderList from './ProviderList.vue'

import { api } from '../Utils/axios'

const props = defineProps({
	editData: Object,
	editMode: Boolean,
})

const emit = defineEmits(['onAddClient', 'onEditClient'])

const providersList = ref([])

const name = ref('')
const email = ref('')
const phone = ref('')
const providers = ref([])

onMounted(async () => {
	try {
		const { data } = await api('/providers')
		providersList.value = data.map((provider) => ({
			id: provider._id,
			name: provider.name,
		}))
	} catch (error) {
		console.log(error)
	}
})

watch(
	() => props.editData,
	(curr, prev) => {
		name.value = curr?.name
		email.value = curr?.email
		phone.value = curr?.phone
	}
)

const setSelectedProviders = (selected) => {
	providers.value = selected
}

const onAddProvider = async (provider) => {
	try {
		const { data } = await api.post('/providers', { name: provider })
		providersList.value = [
			...providersList.value,
			{ id: data._id, name: data.name },
		]
	} catch (error) {
		console.log(error)
	}
}

const onEditProvider = async ({ id, name }) => {
	try {
		const { data } = await api.put(`/providers/${id}`, {
			name,
		})

		providersList.value = providersList.value.map((provider) => {
			return provider.id === id ? data : provider
		})
	} catch (error) {
		console.log(error)
	}
}

const onDeleteProvider = async (id) => {
	try {
		await api.delete(`/providers/${id}`)
		providersList.value = providersList.value.filter(
			(provider) => provider.id !== id
		)
	} catch (error) {
		console.log(error)
	}
}

const submit = () => {
	const submitData = {
		name: name.value,
		email: email.value,
		phone: phone.value,
		providers: providers.value,
	}

	props.editMode
		? emit('onEditClient', submitData)
		: emit('onAddClient', submitData)
}
</script>
