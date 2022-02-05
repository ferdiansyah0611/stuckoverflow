var mongoose = require('mongoose');
var Schema = mongoose.Schema

const Question = new Schema({
	user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },
	quest: String,
	tag: Array,
	views: Number,
	createdAt: { type: Date, default: Date.now }
})

var models = mongoose.model('Question', Question)

module.exports = models