<template>
	<div class="component">
		<h2>Child 2 Component</h2>
		<br>
		<h3>Child → Parent</h3>
		<br>

		<button
			v-on:click="toggle"
			@click="$emit('status', show)"
		>
			Component 2
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				show: true
			}
		},

		mounted() {
			this.toggle()
		},

		methods: {
			toggle() {
				this.show = !this.show
				console.log('C2 Toggle: ', this.show)
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