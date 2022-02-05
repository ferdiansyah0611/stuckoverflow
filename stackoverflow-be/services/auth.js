var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../models/User')
var exported = {}
var saltRounds = 10

var jwt = require('jsonwebtoken')
var exported = {}

exported.signin = async (body) => {
	var response = {}
	var data = await User.findOne({email: body.email}).exec()
	if(data){
		var result = await bcrypt.compare(String(body.password), data.password)
		if(result){
			const user = {...data}
			delete user.password
			const token = jwt.sign({user}, process.env.JWT_KEY, {
				expiresIn: "24h",
			})
			response = {
				message: 'Successfuly signin',
				token: token,
				user: {
					_id: data._id,
					name: data.name,
					email: data.email,
					createdAt: data.createdAt,
				}
			}
		}else{
			response = {
				message: 'Password is wrong',
				error: true
			}
		}
	}
	else{
		response = {
			message: 'User not found',
			error: true
		}
	}
	// console.log(response)
	return response
}
exported.signup = async (body) => {
	var response = {}
	var data = await User.findOne({email: body.email}).exec()
	// console.log(data)
	if(!data){
		var hash = await bcrypt.hash(String(body.password), saltRounds)
		if(hash){
			const {name, email} = body
			await User.create({name, email, password: hash})
			response = {
				message: 'Successfuly signup',
				data: {name, email}
			}
		}else{
			response = {
				message: err.message,
				error: true
			}
		}
	}
	else{
		response = {
			message: 'User has registered',
			error: true
		}
	}
	return response
}
exported.validate = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers["x-access-token"]
	try {
  		// check token
  		if(!token){
  			throw Error('Token Required')
  		}
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.user = decoded;
  	}catch (err) {
		return res.status(401).json({message: "Invalid Token"});
  	}
  	return next();
}

module.exports = exported