<template>
	<div class="component">
		<h2>Child 1 Component</h2>
		<br>
		<h3>Parent → Child</h3>
		<br>

		<ul>
			<li v-for="(value, index) in listItems" :key="index">{{value}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		listItems: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
	ul {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	li {
		list-style: none;
	}
</style>