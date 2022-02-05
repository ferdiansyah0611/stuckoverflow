import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useLocation, Link
} from 'react-router-dom'

export default function Sideleft() {
	const dispatch = useDispatch()
	const locate = useLocation()
	return(
		<div>
			<div>
				<Link to="/" className={locate.pathname === '/' ? 'active': ''}>Home</Link>
			</div>
			<div>
				<p>PUBLIC</p>
				<Link to="/question" className={locate.pathname.match('/question') && !(locate.pathname === '/user/question') ? 'active': ''}>Questions</Link>
				<a href="/">Tags</a>
				<a href="/">Users</a>
			</div>
			<div>
				<p>USER</p>
				<Link to="/user/question" className={locate.pathname === '/user/question' ? 'active': ''}>Questions</Link>
				<Link to="/user/answer" className={locate.pathname === '/user/answer' ? 'active': ''}>Answer</Link>
			</div>
			<div>
				<p>COLLECTIVES</p>
				<a href="/">Explore Collectives</a>
			</div>
			<div>
				<p>FIND A JOB</p>
				<a href="/">Jobs</a>
				<a href="/">Companies</a>
			</div>
		</div>
	)
}