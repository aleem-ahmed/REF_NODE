// [REQUIRE] //
const express = require("express")
const jwt = require("jsonwebtoken")


// [REQUIRE] Personal + ENV //
const AuthorizationMiddleware = require("./AuthorizationMiddleware")
require('dotenv').config()


// [INIT] //
const app = express()
const secretKey = process.env.SECRET_KEY || 'secret'


// [ROUTE] Request a Token (DISCLAIMER: User should be authenticated) //
app.get("/token", (req, res) => {
	const payload = {
		name: "Jimmy",
		scopes: "customer:read"
	}

	const token = jwt.sign(payload, secretKey)
	res.send(token)
})


// [ROUTE] Authenticate => Get Data //
app.get("/customer", AuthorizationMiddleware.authorize("customer:read"), (req, res) => {
	res.send("Customer Information")
})


// [PORT + LISTEN] //
const port = process.env.PORT || 5000

const server = app.listen(port, () => {
	console.log(`Server is listening on ${server.address().port}`)
})
