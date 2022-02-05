import Answercreateoredit from '@r/answer/Answercreateoredit'
import Answershow from '@r/answer/Answershow'
import Answertable from '@r/answer/Answertable'
import {
	BrowserRouter, Routes, Route, Outlet
} from 'react-router-dom'
import {
	useDispatch, useSelector
} from 'react-redux'
import { useState, useEffect } from 'react'
import Template from '@c/template'
import {validate} from '@s/user'
// route
import Home from './Home'
import About from './About'
import Showquestion from './Showquestion'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Questadd from './question/Questadd'
import QuestionUser from './user/Question'

export default function route(){
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(validate())
	}, [])
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Template/>}>
					<Route index element={<Home/>}/>
					<Route path="about" element={<About/>}/>
					<Route path="auth" element={<Outlet/>}>
						<Route path="signin" element={<Signin/>}/>
						<Route path="signup" element={<Signup/>}/>
					</Route>
					<Route path="user">
						<Route path="question" element={<QuestionUser/>}/>
						<Route path="answer">
							<Route index element={<Answertable/>}/>
							<Route path=":id/edit" element={<Answercreateoredit/>}/>
						</Route>
					</Route>
					<Route path="question" element={<Outlet/>}>
						<Route index element={<Home/>}/>
						<Route path="add" element={<Questadd/>}/>
						<Route path=":id/:slug" element={<Showquestion/>}/>
						<Route path=":id/edit" element={<Questadd edit={true}/>}/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}