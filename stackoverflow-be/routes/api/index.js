var router = require('express').Router()
var question = require('./question')
var user = require('./user')
var authenticate = require('./authenticate')
var answer = require('./answer')

router.use('/question', question)
router.use('/user', user)
router.use('/auth', authenticate)
router.use('/answer', answer)

module.exports = router