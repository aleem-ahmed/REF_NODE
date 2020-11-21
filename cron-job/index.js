// [REQUIRE] //
const cron = require('node-cron')
const shelljs = require('shelljs')

// Run "script.sh" every 5 seconds //
cron.schedule('*/5 * * * * *', () => {
	shelljs.exec('bash script.sh') 
})