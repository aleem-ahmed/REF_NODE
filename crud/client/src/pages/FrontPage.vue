<template>
	<div>
		<h1 class="mb-5 text-center">Crud</h1>
		<h3>Count: {{ count }}</h3>
		<p class="h4">Data: {{ data }}</p>
	</div>
</template>

<script>
import DataService from '../services/DataService'
export default {
	data: function() {
		return {
			count: '',
			data: '',
		}
	},

	created: async function() {
		// Count
		try {
			this.count = await DataService.countData()
			console.table('Data:', this.count)
		}
		catch(e) { console.log(e) }

		// Read All
		try {
			this.data = await DataService.getAllData()
			console.log('Data:', this.data)
		}
		catch(e) { console.log(e) }
	}
}
</script>