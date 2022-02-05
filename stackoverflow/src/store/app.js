import { createSlice } from '@reduxjs/toolkit'

var initialState = {
	name: 'STUCKOVERFLOW',
	quest: [
		{
	  	id: crypto.randomUUID(),
	  	quest: 'How to render HTML component full page in vanilla JS',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'OperationalError no such column: ""',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'alert an src by clicking a button in jquery',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'How to render HTML component full page in vanilla JS',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'OperationalError no such column: ""',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'alert an src by clicking a button in jquery',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'How to render HTML component full page in vanilla JS',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'OperationalError no such column: ""',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'alert an src by clicking a button in jquery',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'How to render HTML component full page in vanilla JS',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'OperationalError no such column: ""',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	  {
	  	id: crypto.randomUUID(),
	  	quest: 'alert an src by clicking a button in jquery',
	  	votes: 0,
	  	answers: 0,
	  	views: 2,
	  	tag: ['javascript', 'html', 'reactjs'],
	  	createdAt: Date.now()
	  },
	]
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		handle(state, action){
			state[action.payload.name] = action.payload.value
		}
	},
	extraReducers: {},
})
export const {} = appSlice.actions

export default appSlice.reducer