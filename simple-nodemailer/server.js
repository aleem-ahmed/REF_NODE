// [REQUIRE] //
const nodemailer = require('nodemailer')
require('dotenv').config()

// Step 1
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL || '', // your gmail account
		pass: process.env.EMAIL_PASSWORD || '' // your gmail password
	}
})

// Step 2
let mailOptions = {
	from: process.env.EMAIL || '', // email sender
	to: '', // email receiver
	subject: 'Nodemailer - Test',
	text: 'Success'
}

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
	if (err) { return console.log(`Caught Error --> ${err}`) }
	return console.log('Email sent:', data)
})
