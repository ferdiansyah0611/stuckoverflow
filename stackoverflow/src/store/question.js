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
	name: 'question',
	data: [],
	show: {
		quest: '',
		views: 0
	}
}

export const questionGet = createAsyncThunk('question/get', async(page) => {
	var data = await API('http://localhost:8000/api/question?page=' + page, {
		headers: headers
	})
	return await data.json()
})
export const questionShow = createAsyncThunk('question/show', async(id) => {
	var data = await API('http://localhost:8000/api/question/' + id, {
		headers: headers
	})
	return await data.json()
})
export const questionAdd = createAsyncThunk('question/add', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/question', {
		method: 'POST',
		body: stringify({...body, user_id: auth().user._id}),
		headers: headers
	})
	return await data.json()
})
export const questionUpdate = createAsyncThunk('question/update', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/question/' + body.id, {
		method: 'PATCH',
		body: stringify({...body, user_id: auth().user._id}),
		headers: headers
	})
	return body
})
export const questionDelete = createAsyncThunk('question/delete', async(body, thunkAPI) => {
	var data = await API('http://localhost:8000/api/question/' + body.id, {
		method: 'DELETE',
		headers: headers
	})
	return body
})

export const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		handle(state, action){
			state[action.payload.name] = action.payload.value
		}
	},
	extraReducers: {
    	[questionGet.fulfilled]: (state, action) => {
    		state.data = action.payload.data
    	},
    	[questionShow.fulfilled]: (state, action) => {
    		state.show = action.payload.data
    	},
    	[questionAdd.fulfilled]: (state, action) => {
    		state.data.push(action.payload.input)
    	},
    	[questionUpdate.fulfilled]: (state, action) => {
    		state.data = state.data.map(e => {
    			if(e._id === action.payload._id){
    				e = action.payload
    			}
    			return e
    		})
    	},
    	[questionDelete.fulfilled]: (state, action) => {
    		state.data = state.data.filter(e => e.id !== action.payload)
    	},
  	},
})
export const {handle} = questionSlice.actions

export default questionSlice.reducer