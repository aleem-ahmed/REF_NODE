<template>
	<div id="app">
		<parent />
	</div>
</template>

<script>
	// [IMPORT]
	import Parent from './Parent.vue'

	// [EXPORT]
	export default {
		name: 'App',
		components: {
			Parent
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
