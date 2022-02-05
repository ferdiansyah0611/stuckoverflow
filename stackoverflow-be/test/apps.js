const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args).then(res => res.json()))
const base = 'http://localhost:8000/api/'
const string = (data) => JSON.stringify(data)

var question = base + 'question'
var user = base + 'user'

var token = fs.readFileSync('./test/token.txt')

const get = (url) => fetch(url, {
	headers: {
		'Content-Type': 'application/json',
		'x-access-token': token
	},
})
const add = (url, data) => fetch(url, {
	headers: {
		'Content-Type': 'application/json',
		'x-access-token': token
	},
	method: 'post',
	body: string(data)
})
const remove = (url, data) => fetch(url, {
	headers: {
		'Content-Type': 'application/json',
		'x-access-token': token
	},
	method: 'delete',
})

const register = () => add(base + 'auth/signup', {
	name: 'ferdiansyah', email: `ferdi1@gmail.com`, password: '11111111'
}).then(res => {
	console.log(res)
})
const login = () => add(base + 'auth/signin', {
	email: `ferdi1@gmail.com`, password: '11111111'
}).then(res => {
	console.log(res)
})
// register()
// login()

get(question)
// add(question, {
// 	user_id: 2, quest: 'hihih'
// })
// remove(question + '/61fcb742ff555016e64e5514')
.then((res) => {
	console.log(res)
})