/**
 * %%%%%%%%%%%%%%%%%% *
 * %%% CATS ROUTE %%% *
 * %%%%%%%%%%%%%%%%%% *
*/
/*** [REQUIRE] ***/
const express = require('express')
const mongodb = require('mongodb')

/*** [REQUIRE] Personal ***/
require('dotenv').config()

/*** [INIT] ***/
const router = express.Router()

// [COUNT] //
router.get('/count-all/', async (req, res) => {
	const blocks = await loadDataCollection()
	await blocks.countDocuments().then((count) => {
		res.send(count.toString())
	})
	
	return
})

// [CREATE] //
router.post('/create', async (req, res) => {
	const blocks = await loadDataCollection()
	await blocks.insertOne({
		email: req.body.email,
		cat_id: req.body.cat_id,
		title: req.body.title,
		createdAt: new Date()
	})

	// [RES SEND] //
	res.status(201).send()
})

// [READ ALL] //
router.get('/read-all/', async (req, res) => {
	const blocks = await loadDataCollection()
	let retrievedData = await blocks.find()
	.project()
	.toArray()

	// [RES SEND] //
	res.send(retrievedData)
})


// [READ ALL] //
router.get(`/read/:block_id`, async (req, res) => {
	const blocks = await loadDataCollection()
	let retrievedData = await blocks.findOne(
		{ _id: new mongodb.ObjectID(req.params.block_id) }
	)

	// [RES SEND] //
	res.send(retrievedData)
})


/*** [FUNCTION] Blocks Collection ***/
async function loadDataCollection() {
	const uri = process.env.MONGO_URI
	const db_name = process.env.DB || 'db_name'
	const c_name = 'data'
	
	const client = await mongodb.MongoClient.connect(
		uri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)

	// [RETURN] //
	return client.db(db_name).collection(c_name)
}

/*** [EXPORT] ***/
module.exports = router