var router = require('express').Router()
var ObjectId = require('mongoose').Types.ObjectId
var Question = require('../../models/Question')
var Answer = require('../../models/Answer')
var User = require('../../models/User')
var {validate} = require('../../services/auth')

const limit = 20

router.get('/', async(req, res) => {
	var page = Number(req.query.page) || 1
	var value = await Question.find().populate('user_id', '-email -password').limit(limit * 1).skip((page - 1) * limit).exec()
	res.json({
		data: value,
		currentPage: page
	})
})
router.get('/user/:user', async(req, res) => {
	var page = Number(req.query.page) || 1
	var value = await Question.find({'user_id': new ObjectId(req.params.user)}).limit(limit * 1).skip((page - 1) * limit).exec()
	res.json({
		data: value
	})
})
router.post('/', validate, async(req, res) => {
	var data = await Question.create(req.body)
	res.json({
		message: 'Successfuly added',
		input: data
	})
})
router.patch('/:id', validate, async(req, res) => {
	await Question.updateOne({ _id: req.params.id }, req.body)
	res.json({
		message: 'Successfuly updated'
	})
})
router.delete('/:id', validate, async(req, res) => {
	await Question.deleteOne({ _id: req.params.id })
	await Answer.deleteMany({quest_id: new ObjectId(req.params.id)})
	res.json({
		message: 'Successfuly deleted'
	})
})

module.exports = router;