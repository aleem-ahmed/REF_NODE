/**
 * %%%%%%%%%%%%%% *
 * %%% SERVER %%% *
 * %%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
require('dotenv').config()


// [REQUIRE] Personal //
const messageUtils = require('./utils/messageUtils')
const userUtils = require('./utils/userUtils')


// [EXPRESS + SERVER] //
const app = express()
const server = http.createServer(app)


// [SOCKET] //
const io = new socketIO(server)

app.use(cors())

// [INIT] //
const botName = 'BotBoy'


/******* [SOCKET] *******/
io.on('connection', (socket) => {
	// [LOG] //
	console.log('New WS connected')



	// [ON-SOCKET] join //
	socket.on('join', (user_id) => {
		// Check if user_id is not null & user_id isnt already in room
		if (user_id && !userUtils.getUserSocketByUserId(user_id)) {
			userUtils.join(socket.id, user_id)

			// [EMIT-SOCKET] usersOnline //
			socket.emit('user', userUtils.getUserSocket(socket.id))

			// [EMIT-SOCKET-BROADCAST] usersOnline //
			socket.broadcast.emit('user', userUtils.getUserSocket(socket.id))
		}
	})


	// [EMIT-SOCKET] usersOnline //
	socket.emit('users', userUtils.getAllUserSockets())
	

	// [ON-SOCKET] chatMessage //
	socket.on('chatMessage', (toUser_id, chatMessage) => {
		// Get Details About Sockets //
		const fromUserSocket = userUtils.getUserSocket(socket.id)
		const toUserSocket = userUtils.getUserSocketByUserId(toUser_id)

		if (fromUserSocket && toUserSocket) {
			// [EMIT-SOCKET] //
			io.to(fromUserSocket.socket_id).emit(
				'chatMessage',
				messageUtils.formatMessage(
					fromUserSocket.user_id,
					toUserSocket.user_id,
					chatMessage
				)
			)

			// [EMIT-SOCKET] //
			io.to(toUserSocket.socket_id).emit(
				'chatMessage',
				messageUtils.formatMessage(
					fromUserSocket.user_id,
					toUserSocket.user_id,
					chatMessage
				)
			)
		}
	})


	/************ [SOCKET][ROOM] ************/
	// [ON-SOCKET] joinRoom //
	socket.on('joinRoom', (room) => {
		// Get Details About Socket //
		const userSocket = userUtils.getUserSocket(socket.id)

		userUtils.joinRoom(socket.id, userSocket.user_id, room)

		// Join Room //
		socket.join(room)
	})
	
	
	// [ON-SOCKET] chatMessage //
	socket.on('groupChatMessage', (room, chatMessage) => {
		// Get Details About Socket //
		const fromUserSocket = userUtils.getUserSocket(socket.id)

		// [EMIT-SOCKET] //
		io.to(room).emit(
			'groupChatMessage',
			messageUtils.formatGroupMessage(fromUserSocket.user_id, chatMessage)
		)
	})

	
	/************ [DISCONNECT] ************/
	// [ON-SOCKET] Disconnect //
	socket.on('disconnect', () => {
		// [LOG] //
		console.log('WS Closed')

		const leftUserSocket = userUtils.leave(socket.id)

		if (leftUserSocket) {
			// [EMIT-SOCKET] //
			io.to(leftUserSocket.room).emit(
				'chatMessage',
				messageUtils.formatGroupMessage(
					botName,
					`${leftUserSocket.user_id} has left the chat`
				)
			)
		}

		// [EMIT-SOCKET-BROADCAST] usersOnline //
		socket.broadcast.emit('updateUsers', userUtils.getAllUserSockets())
	})
})



// [PORT + LISTEN] //
const port = process.env.PORT || 3000
server.listen(port, function() { console.log(`Server Running on Port: ${port}`) })