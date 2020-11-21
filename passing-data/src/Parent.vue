<template>
	<div>
		<!-- Items & Status -->
		<div class="parent-items">
			<table>
				<tr>
					<td colspan="2" style="margin: 5px;">
						<h3 style="text-align: center;">
							Parent Properties!
						</h3>
					</td>
					
				</tr>
				<tr>
					<td>
						<h3>Parent Status: {{ status }}</h3>
					</td>
					<td>
						<h3>Parent Items:</h3>
						<p v-for="(value, index) in items" :key="index">
							{{value}}
						</p>
					</td>
				</tr>
			</table>
			
			
		</div>

		<!-- Children -->
		<child-one :listItems="items"/>
		<child-two @status="getStatus"/>
		<child-three :passedStatus="status"/>
	</div>
</template>

<script>
	// [IMPORT]
	import ChildOne from './components/ChildOne.vue'
	import ChildTwo from './components/ChildTwo.vue'
	import ChildThree from './components/ChildThree.vue'
	

	export default {
		name: 'Parent',
		components: {
			ChildOne,
			ChildTwo,
			ChildThree
		},
		
		data: () => {
			return {
				items: ['item1', 'item2', 'item3'],
				status: false
			}
		},
		
		mounted() {
		},
		
		methods: {
			getStatus(show) {
				this.status = show

			}
		}
	}
</script>

<style>
	.p-status {
		width: 100%;
		text-align: center;
	}

	.component {
		background: rgb(192, 233, 192);
		margin: 10px 100px;
		padding: 20px;
	}

	.parent-items {
		background: rgb(241, 241, 241);
		margin: 10px 100px;
		padding: 20px;
	}

	h1 { margin: 0; }

	h2 { margin: 0; text-align: center; }

	h3 { margin: 0; }

	p { margin: 0; }

	table { width: 100%; }
	td { width: 50%; }
</style>