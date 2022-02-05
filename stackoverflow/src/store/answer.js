import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// you can choose fetch/axios/or more lib
const API = fetch
const auth = () => JSON.parse(localStorage.getItem('auth')) || {}
// setup your headers in here
const headers = {
	'Content-Type': 'application/json',
	'x-access-token': auth().token
}
const stringify = (data) => JSON.stringify(data)

var initialState = {
	name: 'answer',
	data: [],
	show: {}
}

export const answerGet = createAsyncThunk('answer/get', async(quest) => {
	var data = await API('http://localhost:8000/api/answer?quest=' + quest, {
		headers: headers
	})
	return await data.json()
})
export const answerGetUser = createAsyncThunk('answer/get/user', async(page) => {
	var data = await API('http://localhost:8000/api/answer/user?page=' + page, {
		headers: headers
	})
	return await data.json()
})
export const answerGetId = createAsyncThunk('answer/get/id', async(id) => {
	var data = await API('http://localhost:8000/api/answer/' + id + '/id', {
		headers: headers
	})
	return await data.json()
})
export const answerAdd = createAsyncThunk('answer/add', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/answer', {
		method: 'POST',
		body: stringify({...body, user_id: auth().user._id}),
		headers: headers
	})
	return await data.json()
})
export const answerUpdate = createAsyncThunk('answer/update', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/answer/' + body.id, {
		method: 'PATCH',
		body: stringify({...body, user_id: auth().user._id}),
		headers: headers
	})
	return await data.json()
})
export const answerDelete = createAsyncThunk('answer/delete', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/answer/' + body.id, {
		method: 'DELETE',
		headers: headers
	})
	return await data.json()
})

export const answerSlice = createSlice({
	name: 'answer',
	initialState,
	reducers: {
		handle(state, action){
			state[action.payload.name] = action.payload.value
		}
	},
	extraReducers: {
    	[answerGet.fulfilled]: (state, action) => {
    		state.data = action.payload.data
    	},
    	[answerGetUser.fulfilled]: (state, action) => {
    		state.data = action.payload.data
    	},
    	[answerGetId.fulfilled]: (state, action) => {
    		state.show = action.payload.data
    	},
    	[answerAdd.fulfilled]: (state, action) => {
    		state.data.push(action.payload)
    	},
    	[answerUpdate.fulfilled]: (state, action) => {
    		state.data = state.data.map(e => {
    			if(e.id === action.payload.id){
    				e = action.payload.data
    			}
    			return e
    		})
    	},
    	[answerDelete.fulfilled]: (state, action) => {
    		state.data = state.data.filter(e => e.id !== action.payload)
    	},
  	},
})
export const {handle} = answerSlice.actions

export default answerSlice.reducer