<template>
	<div id="app">
		<div class="container">
			<ClientList />
		</div>
	</div>
</template>

<script setup>
import ClientList from './Components/ClientList.vue'
</script>

<style lang="scss">
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.icon {
	background-color: transparent;
	border: none;
	font-size: 1.2rem;
	cursor: pointer;

	& + .icon {
		margin-left: 1rem;
	}

	&.delete-icon {
		color: red;
	}
}
</style>
