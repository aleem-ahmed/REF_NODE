<template>
	<div class="component">
		<h2>Child 3 Component</h2>
		<br>
		<h3>Child 2 → Parent → Child 3</h3>
		<br>

		<h3>passedStatus: {{ passedStatus }}</h3>
	</div>
</template>

<script>

export default {
	props: {
		passedStatus: {
			type: Boolean,
			required: true
		}
	}
}
</script>

<style>
	ul {
		margin: auto;
		max-width: 300px;
	}
</style>