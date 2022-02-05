var router = require('express').Router()
var {signin, signup} = require('../../services/auth')

router.post('/signin', async(req, res) => {
	var services = await signin(req.body)
	res.status(services?.error ? 500: 200).json(services)
})
router.post('/signup', async(req, res) => {
	var services = await signup(req.body)
	res.status(services?.error ? 500: 200).json(services)
})

module.exports = router;