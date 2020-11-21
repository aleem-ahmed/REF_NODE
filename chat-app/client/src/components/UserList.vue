<template>
	<div class="w-100 nav flex-column nav-pills">
		<!-- For Each Passed Item in Users Array -->
		<button
			v-for="(user, index) in users" :key="index"
			:class="{ active: activeUser == user }"
			class="mb-3 w-100 btn btn-outline-primary"
			@click="toggler(index)"
		>{{ user.user_id }}</button>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import { EventBus } from '../main'

	// [EXPORT] //
	export default {
		props: {
			user_id: { type: String, required: true },
			users: { type: Array, required: true, default: [] },
			emitName: { type: String, required: true, },
		},

		data: function() {
			return {
				activeUser: '',
			}
		},

		created: function() {
			// Set Active Tab //
			if (!this.activeUser && this.users[0] != '') {
				console.log('taht')
				this.activeUser = this.users[0]
			}
			else { console.log('this') }

			// [EMIT -->] //
			EventBus.$emit(this.emitName, this.activeUser)
		},

		methods: {
			toggler(index) {
				this.activeUser = this.users[index]
				EventBus.$emit(this.emitName, this.activeUser)
			}
		}
	}
</script>