<template>
	<div
		class="modal fade"
		id="clientModal"
		tabindex="-1"
		aria-labelledby=""
		aria-hidden="true"
		ref="modelRef"
	>
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="clientModalLabel">{{ title }}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<slot name="body" />
				</div>
				<div class="modal-footer">
					<slot name="footer"></slot>
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

defineProps({
	title: {
		type: String,
		default: 'Modal title',
	},
})

let modelRef = ref(null)
let modal = null

onMounted(() => {
	modal = new Modal(modelRef.value)
})

function _show() {
	modal.show()
}

function _hide() {
	modal.hide()
}

defineExpose({ show: _show, hide: _hide })
</script>

<style scoped>
.modal-body {
	width: 90%;
	max-width: 700px;
	margin: auto;
}
</style>
