<template>
	<div class="providers-selector">
		<form id="providerForm" @submit.prevent>
			<div class="row align-items-end">
				<div class="col-md-8">
					<div>
						<label for="name" class="form-label">Provider Name</label>
						<input
							type="text"
							class="form-control"
							id="name"
							v-model="name"
							required
						/>
					</div>
				</div>

				<div class="col-md-4">
					<button
						type="submit"
						class="btn btn-success w-100"
						@click="addProvider()"
						v-if="!editMode"
					>
						Add Provider
					</button>
					<button
						type="submit"
						class="btn btn-success w-100"
						@click="editProvider()"
						v-else
					>
						Update Provider
					</button>
				</div>
			</div>
		</form>

		<p v-if="!providers.length">No providers found...</p>

		<div class="row" v-else>
			<div class="col-md-8">
				<div class="providers-list">
					<div v-for="provider in providers" :key="provider.id">
						<div class="list-item">
							<div class="form-check">
								<input
									class="form-check-input list-label"
									type="checkbox"
									v-model="selectedItems"
									:value="provider.id"
									:id="provider.id"
								/>
								<label class="form-check-label" :for="provider.id">
									{{ provider.name }}
								</label>
							</div>

							<div>
								<button
									type="button"
									class="icon edit-icon"
									title="Edit Provider"
									@click="initEditProvider(provider)"
								>
									<font-awesome-icon icon="fa-regular fa-pen-to-square" />
								</button>
								<button
									type="button"
									class="icon delete-icon"
									title="Delete Provider"
									@click="deleteProvider(provider.id)"
								>
									<font-awesome-icon icon="fa-regular fa-trash-alt" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	providers: Object,
	selected: Array,
})

const emit = defineEmits([
	'setSelectedProviders',
	'onAddProvider',
	'onEditProvider',
	'onDeleteProvider',
])

const selectedItems = ref([])
const name = ref('')
const editMode = ref(false)
const editData = ref({})

watch(selectedItems, () => {
	emit('setSelectedProviders', selectedItems.value)
})

watch(
	() => props.selected,
	(curr, prev) => {
		console.log(curr)
		selectedItems.value = curr?.map((x) => x._id)
	}
)

const addProvider = async () => {
	editMode.value = false
	emit('onAddProvider', name.value)
	name.value = ''
}

const initEditProvider = async (provider) => {
	editMode.value = true
	name.value = provider.name
	editData.value.id = provider.id
}

const editProvider = async () => {
	emit('onEditProvider', { id: editData.value.id, name: name.value })
	name.value = ''
	editMode.value = false
}

const deleteProvider = (id) => emit('onDeleteProvider', id)
</script>

<style lang="scss">
.providers-selector {
	.providers-list {
		max-height: 200px;
		background-color: white;
		padding: 1rem;
		border: 1px solid #ced4da;
		border-radius: 0.375rem;
		overflow-y: scroll;

		.list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.5rem;
			border-radius: 0.375rem;

			label {
				cursor: pointer;
			}
		}
	}
}
</style>
