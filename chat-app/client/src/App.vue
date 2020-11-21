<template>
	<div id="app" class="container">
		<!-- Header -->
		<div class="row">
			<h3 class="col my-3 text-center text-secondary">user_id: {{ user_id }}</h3>
		</div>

		<article
			class="card card-body bg-light shadow"
			style="height: 80vh;"
		>
			 <!-- User List Section -->
			<section class="row" style="height: 85%;">
				<div class="col-2 h-100">
					<h5 class="text-center text-secondary">Users Online</h5>
					<UserList
						v-if="rendered"
						:user_id="user_id"
						:users="users"
						:emitName="'userListClicked'"
					/>
				</div>

				<!-- Chat Section -->
				<div class="col-10 h-100">
					<h5 class="text-secondary">{{ activeUser_id }}</h5>
					<div
						v-if="activeUser_id"
						:key="chatMessagesId"
						class="overflow-auto"
						style="max-height: 90%;"
					>
						<div
							v-for="(chatMessage, index) in chatMessages[activeUser_id]"
							:key="index"
							class="mb-2"
						>
							<div class="w-100 p-2 text-left badge" style="background: white;">
								<h5>
									<span class="text-primary">{{ chatMessage.from }}:</span>
									{{ chatMessage.text }}
								</h5>
								<p class="m-0 p-0 small text-secondary">
									{{ chatMessage.createdAt }}
								</p>
							</div>
						</div>
					</div>
				
					<div v-if="!activeUser_id" class="">
						<h3 class="mt-5 text-center text-secondary">
							Click a person you wish to talk too
						</h3>
					</div>
				</div>
			</section>

			<!-- Form Section -->
			<section class="row bg-light" style="height: 15%;">
				<div id="spacer" class="col-2"></div>
				<div class="col">
					<form	v-on:submit="sendMessage" class="mt-3" style="height: 20%;">
						<div class="input-group">
							<input v-model="textBox" type="text" class="form-control">
							<div class="input-group-append">
								<button
									@click="sendMessage"
									:disabled="!textBox"
									class="btn btn-primary"
								>Send</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</article>
	</div>
</template>

<script>
	// [IMPORT] //
	import io from 'socket.io-client'

	// [IMPORT] Personal //
	import UserList from './components/UserList'
	import { EventBus } from './main'

	// [EXPORT] //
	export default {
		name: 'app',

		components: {
			UserList
		},

		data: function() {
			return {
				activeUser_id: '',
				chatMessages: {},
				chatMessagesId: 0,
				rendered: false,
				textBox: '',
				users: [],
				user_id: '',
				socket: io('http://localhost:3000'),
			}
		},

		created: function() {
			this.user_id = prompt('What is your user_id?', 'a')
			
			
			// [EMIT-SOCKET] Join //
			this.socket.emit('join', this.user_id)


			// [IN-SOCKET] Get Users //
			this.socket.on('users', (users) => {
				this.users = users

				// Edit chatMessages Object //
				this.users.forEach((user) => { this.chatMessages[user.user_id] = [] })

				this.rendered = true
			})


			// [IN-SOCKET] When a New User Joins //
			this.socket.on('user', (user) => {
				if (user.user_id != this.user_id) { this.users.push(user) }
				

				// Edit chatMessages Object //
				this.chatMessages[user.user_id] = []
			})


			// [ON-SOCKET] chatMessage //
			this.socket.on('chatMessage', (message) => {		
				this.chatMessages[message.to].push(message)
				this.chatMessages[message.from].push(message)

				this.chatMessagesId++
			})


			// [ON-SOCKET] Update Users //
			this.socket.on('updateUsers', (users) => {
				// Empty Users
				this.users = []

				// Insert Updated List
				users.forEach(user => {
					if (user.user_id != this.user_id) { this.users.push(user) }
				})
			})


			// [ON-EVENTBUS] //
			EventBus.$on('userListClicked', (clicked) => {
				if (clicked) { this.activeUser_id = clicked.user_id }
			})
			
			// [LOG] //
			this.log()
		},

		methods: {
			sendMessage() {
				if (this.textBox) {
					// [EMIT-SOCKET] chatMessage //
					this.socket.emit(
						'chatMessage',
						this.activeUser_id,
						this.textBox
					)

					// clear textBox
					this.textBox = ''
				}
				else {
					alert('Please enter a message')
					return
				}	
			},

			log() {
				console.log('%%% [APP] %%%')
				console.log('user_id:', this.user_id)
				console.log('room:', this.room)
				console.log('users:', this.users)
				console.log('chatMessages:', this.chatMessages)
			},
		},
	}
</script>

<style lang="scss">
	body {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		margin: 0;
		padding: 0;
	}
</style>
