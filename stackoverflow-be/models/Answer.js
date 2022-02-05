var mongoose = require('mongoose');
var Schema = mongoose.Schema

const Answer = new Schema({
	user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },
	quest_id: {
        type: Schema.ObjectId,
        ref: 'Question'
    },
	answer: String,
	createdAt: { type: Date, default: Date.now }
})

var models = mongoose.model('Answer', Answer)

module.exports = models