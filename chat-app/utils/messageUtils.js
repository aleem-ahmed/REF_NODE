/**
 * %%%%%%%%%%%%%%%%%% *
 * %%% USER UTILS %%% *
 * %%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
const moment = require('moment')


// [F] Format Message //
function formatMessage(user_idFrom, user_idTo, text) {
	return {
		from: user_idFrom,
		to: user_idTo,
		text: text,
		createdAt: moment()
	}
}


// [F] Format Group Message //
function formatGroupMessage(user_idFrom, text) {
	return {
		from: user_idFrom,
		text: text,
		createdAt: moment()
	}
}


// [EXPORT] //
module.exports = {
	formatMessage,
	formatGroupMessage
}
