import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// you can choose fetch/axios/or more lib
const API = fetch
const auth = () => JSON.parse(localStorage.getItem('auth')) || {}
// setup your headers in here
const headers = {
	'Content-Type': 'application/json'
}
const stringify = (data) => JSON.stringify(data)

var initialState = {
	name: 'ferdiansyah0611',
	photoURL: 'https://i.stack.imgur.com/psDIc.jpg?s=50&g=1',
	token: '',
	user: {}
}

export const signIn = createAsyncThunk('user/signin', async(data) => {
	var data = await API('http://localhost:8000/api/auth/signin', {
		method: 'POST',
		headers: headers,
		body: stringify(data)
	})
	return await data.json()
})
export const signUp = createAsyncThunk('user/signup', async(data) => {
	var data = await API('http://localhost:8000/api/auth/signup', {
		method: 'POST',
		headers: headers,
		body: stringify(data)
	})
	return await data.json()
})

export const userSlice = createSlice({
	name: 'store/user.js',
	initialState,
	reducers: {
		handle(state, action){
			state[action.payload.name] = action.payload.value
		},
		validate(state){
			var user = auth()
			if(user?.token){
				state.user = user.user
				state.token = user.token
				state.name = user.user.name
			}
		},
		logout(state){
			localStorage.removeItem('auth')
			state.user = {}
			state.token = null
			state.name = {}
		}
	},
	extraReducers: {
		[signIn.fulfilled]: (state, action) => {
			localStorage.setItem('auth', JSON.stringify(action.payload))
			state.user = action.payload.user
			state.token = action.payload.token
			state.name = action.payload.user.name
		},
		[signUp.fulfilled]: (state, action) => {}
	},
})
export const {handle, validate, logout} = userSlice.actions

export default userSlice.reducer