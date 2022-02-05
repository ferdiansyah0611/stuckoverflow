var ObjectId = require('mongoose').Types.ObjectId

module.exports = function objectid(req, res, next) {
	if(req.method === 'POST'){
		if(req.body.user_id){
			req.body.user_id = new ObjectId(req.body.user_id)
		}
		if(req.body.quest_id){
			req.body.quest_id = new ObjectId(req.body.quest_id)
		}
		console.log(req.method, req.body.quest_id)
	}
	next()
}