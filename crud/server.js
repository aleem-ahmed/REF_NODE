
/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% SERVER INDEX %%% *
 * %%%%%%%%%%%%%%%%%%%% *
 * 
*/
/*** [REQUIRE] ***/
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")

/*** [REQUIRE] Personal + ENV ***/
const Data = require('./routes/api/Data')

require('dotenv').config()

/*** [INIT] ***/
const app = express()

/*** [USE] ***/
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

/*** [INIT USE] For "this" route use "this" ***/
app.use('/api/data', Data)

/*** [PORT + LISTEN] ***/
const port = process.env.PORT || 5000

app.listen(port, function () {
	console.log(`Server Running on Port: ${port}`)
})