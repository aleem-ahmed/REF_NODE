// [REQUIRE] //
const mongoose = require("mongoose")


// [SCHEMA] //
const Schema = mongoose.Schema


// [SCHEMA MODEL] //
const ChatSchema = new Schema({
	user: {
		type: String
	},

	user_a: {
		type: String
	},

	user_b: {
		type: String
	},
	
	text: {
		type: String
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})


// [MODEL] //
module.exports = chat = mongoose.model('ChatMessage', ChatSchema)