var router = require('express').Router()
var User = require('../../models/User')

router.get('/', async(req, res) => {
	var value = await User.find({}, {password: 0, email: 0}).exec()
	res.json({
		message: value
	})
})
router.post('/', async(req, res) => {
	await User.create(req.body)
	res.json({
		message: 'Successfuly added'
	})
})
router.patch('/:id', async(req, res) => {
	await User.update({ _id: req.params.id }, req.body)
	res.json({
		message: 'Successfuly updated'
	})
})
router.delete('/:id', async(req, res) => {
	await User.deleteOne({ _id: req.params.id })
	res.json({
		message: 'Successfuly deleted'
	})
})

module.exports = router;