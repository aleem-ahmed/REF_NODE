// [REQUIRE] //
const jwt = require("jsonwebtoken")


// [REQUIRE] Personal //
require('dotenv').config()


// [INIT] //
const secretKey = process.env.SECRET_KEY || 'secret'


class AuthorizationMiddleWare {
	static authorize(credentials = []) {
		return (req, res, next) => {
			// Outputs: "Authorization middleware" + "credentials Parameter: customer:read"
			console.log("Authorization middleware")
			console.log('Credentials Parameter:', credentials)
			console.log('req.headers.jwt_token:', req.headers.jwt_token)
	
			// Allow for a string OR array by converting anything sent to Array
			if (typeof credentials === "string") { credentials = [credentials] }
	
			// Find JWT in Headers
			const token = req.headers.jwt_token
			
			if (token) {
				// remove "Bearer" --> Store in tokenBody 
				const tokenBody = token.slice(7)
				
				// Validate JWT
				jwt.verify(tokenBody, secretKey, (err, decoded) => {
					if (err) {
						console.log(`JWT Error: ${err}`)
						return res.status(401).send("Error: Access Denied, Invalid Token")
					}
	
					// No Error, JWT is good!
					else {
						// Output: "decoded: { name: 'Jimmy', scopes: 'customer:read', iat: # }"
						console.log('decoded:', decoded)
	
						// Check for credentials being passed in
						if (credentials.length > 0) {
							if (
								decoded.scopes &&
								decoded.scopes.length &&
								// compare the content of the decoded to see if it matches the credentials
								credentials.some((cred) => ( decoded.scopes.indexOf(cred) >= 0))
							) {
								// continue to the next function in the route
								next()
							}
	
							else { return res.status(401).send("Error: Access Denied, Invalid Crendentials") }
						}
						// If no credentials required, user is authorized
						else { next() }
					}
				})
				
			}
			else { return res.status(401).send("No Token, Access Denied") }
		}
	}
}


// [EXPORT] //
module.exports = AuthorizationMiddleWare
