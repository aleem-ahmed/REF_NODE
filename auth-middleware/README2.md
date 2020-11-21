How to Get the JWT token via Postman or other HTTP App.
1) do a "get" request to localhost:5000/token
2) copy the returned token

Note: in an actual application a token is stored in "localstorage" usually 
after a user logs in.

How to Authenticate Token with Postman or other HTTP App.
1) do a "get" request to localhost:5000/customer with a headers value of:
	jwt_token: < copied JWT token here >