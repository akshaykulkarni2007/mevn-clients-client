<template>
	<td>{{ client.name }}</td>
	<td>{{ client.email }}</td>
	<td>{{ client.phone }}</td>
	<td>
		<span
			class="provider"
			v-for="provider in client.providers"
			:key="provider._id"
			>{{ provider.name }}</span
		>
	</td>
	<td>
		<button
			class="icon edit-icon"
			title="Edit Client"
			@click="emit('setEditData', { ...client })"
		>
			<font-awesome-icon icon="fa-regular fa-pen-to-square" />
		</button>

		<button
			class="icon delete-icon"
			title="Delete Client"
			@click="deleteClient(client._id)"
		>
			<font-awesome-icon icon="fa-regular fa-trash-alt" />
		</button>
	</td>
</template>

<script setup>
import { api } from '../Utils/axios'

defineProps({
	client: Object,
})

const emit = defineEmits(['onDelete', 'setEditData'])

const deleteClient = async (id) => {
	try {
		const { data } = await api.delete(`/clients/${id}`)
		emit('onDelete', data.id)
	} catch (error) {
		console.log(error)
	}
}
</script>

<style scoped lang="scss">
.provider:not(:last-of-type) {
	&::after {
		content: ', ';
	}
}
</style>
