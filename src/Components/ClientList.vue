<template>
	<div class="row">
		<div class="col-12">
			<div class="header mt-5 mb-2">
				<h3>Clients</h3>
				<button class="btn btn-success" @click="showModal(false)">
					New Client
				</button>
			</div>

			<div class="row">
				<div class="col-md-3">
					<div class="mb-3">
						<label for="name" class="form-label">Filter Clients</label>
						<input
							type="text"
							class="form-control"
							placeholder="Start typing client name..."
							v-model="filterText"
						/>
					</div>
				</div>
			</div>

			<div class="table-responsive-sm">
				<div class="d-flex justify-content-center" v-if="loading">
					<div class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<p v-else-if="error">Something went wrong. Please try again...</p>

				<p v-else-if="!clients.length && !loading">No clients found...</p>

				<p
					v-else-if="filteredClients.length === 0 && filterText !== ''"
					class="mt-3"
				>
					No matching clients with entered filter
				</p>
				<table v-else class="table table-striped table-bordered mt-2">
					<thead class="table-light">
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Providers</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="client in filteredClients" :key="client._id">
							<ClientRow
								:client="client"
								@onDelete="onDelete"
								@setEditData="setEditData"
							/>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<Modal :title="modalTitle" ref="clientModalRef">
		<template #body>
			<ClientForm
				@onAddClient="onAddClient"
				@onEditClient="onEditClient"
				:editData="editData"
				:editMode="editMode"
			/>
		</template>
		<template #footer>
			<button type="submit" class="btn btn-success" form="clientForm">
				{{ editMode ? 'Update Client' : 'Add Client' }}
			</button>
			<button
				v-if="editMode"
				class="btn btn-danger"
				@click="deleteClient(editData._id)"
			>
				Delete Client
			</button>
		</template>
	</Modal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import ClientRow from './ClientRow.vue'
import Modal from './Modal.vue'
import ClientForm from './ClientForm.vue'

import { api } from '../Utils/axios'

const clients = ref([])
const loading = ref(true)
const error = ref(false)
const filterText = ref('')

const clientModalRef = ref(null)
const modalTitle = ref('Add Client')

const editMode = ref(false)
const editData = ref(null)

onMounted(async () => {
	try {
		const { data } = await api('/clients')
		clients.value = data
	} catch (error) {
		console.log(error)
		error.value = true
	} finally {
		loading.value = false
	}
})

const filteredClients = computed(() => {
	let filter = filterText.value
	if (!filter.length) return clients.value
	return clients.value.filter((client) =>
		client.name.toLowerCase().includes(filter.toLowerCase())
	)
})

const setEditData = (client) => {
	editData.value = client
	editMode.value = true
	showModal(true)
}

const onAddClient = async ({ name, email, phone, providers }) => {
	try {
		const { data } = await api.post('/clients', {
			name,
			email,
			phone,
			providers,
		})

		clients.value = [...clients.value, data]
		hideModal()
	} catch (error) {
		console.log(error)
		error.value = true
	}
}

const onEditClient = async ({ name, email, phone, providers }) => {
	try {
		const { data } = await api.put(`/clients/${editData.value._id}`, {
			name,
			email,
			phone,
			providers,
		})

		clients.value = clients.value.map((client) => {
			return client._id === editData.value._id ? data : client
		})

		hideModal()
	} catch (error) {
		console.log(error)
		error.value = true
	}
}

const onDelete = (id) => {
	clients.value = clients.value.filter((client) => client._id !== id)
}

const deleteClient = async (id) => {
	try {
		const { data } = await api.delete(`/clients/${id}`)

		onDelete(data.id)
		hideModal()
	} catch (error) {
		console.log(error)
	}
}

const showModal = (isEditing = false) => {
	if (isEditing) {
		modalTitle.value = 'Edit Client'
		editMode.value = true
	} else {
		modalTitle.value = 'Add Client'
		editData.value = null
		editMode.value = false
	}
	clientModalRef.value.show()
}

const hideModal = () => clientModalRef.value.hide()
</script>
