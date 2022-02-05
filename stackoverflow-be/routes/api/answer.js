var router = require('express').Router()
var Answer = require('../../models/Answer')
var {validate} = require('../../services/auth')

router.get('/', async(req, res) => {
	var value = await Answer.find({quest_id: req.query.quest}).populate('user_id', '-password -email -_v').exec()
	res.json({
		data: value
	})
})
router.get('/:id/id', async(req, res) => {
	var value = await Answer.findById(req.params.id).populate('user_id', '-password -email -_v').exec()
	res.json({
		data: value
	})
})
router.get('/user', validate, async(req, res) => {
	var value = await Answer.find({user_id: req.user.user._doc._id}).exec()
	res.json({
		data: value
	})
})
router.post('/', async(req, res) => {
	await Answer.create(req.body)
	res.json({
		message: 'Successfuly added'
	})
})
router.patch('/:id', async(req, res) => {
	await Answer.update({ _id: req.params.id }, req.body)
	res.json({
		message: 'Successfuly updated'
	})
})
router.delete('/:id', async(req, res) => {
	await Answer.deleteOne({ _id: req.params.id })
	res.json({
		message: 'Successfuly deleted'
	})
})

module.exports = router;