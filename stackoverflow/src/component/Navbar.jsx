import React from 'react'
import {
	Link, useNavigate
} from 'react-router-dom'
import {
	useDispatch, useSelector
} from 'react-redux'
import '@/style/navbar.sass'
import Sideleft from '@c/Sideleft'
import {logout} from '@s/user'

export default function Navbar() {
	const dispatch = useDispatch()
	const to = useNavigate()
	const app = useSelector(state => state.app)
	const user = useSelector(state => state.user)
	const [sideleft, opensideleft] = React.useState(false)
	const sidelefthandle = (e) => {
		e.preventDefault();
		opensideleft(!sideleft)
	}
	const out = (e) => {
		e.preventDefault()
		dispatch(logout())
		to('/')
	}
	return(
		<>
			{/*sideleft*/}
			<div className={"sideleft " + (sideleft ? 'open': '')}>
				<Sideleft/>
			</div>
			<div onClick={sidelefthandle} className={"sideleft-layer " + (sideleft ? 'open': '')}></div>
			<nav className="navbar containers">
				<div>
					<a className="menu-icon" onClick={sidelefthandle} href="/">
						<i className="mdi mdi-menu"></i>
					</a>
					<div className="flex items-center space-x-2">
						<svg aria-hidden="true" width="20" height="23" viewBox="0 0 32 37">
							<path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
							<path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path>
						</svg>
						<Link to="/" className="font-bold">{app.name}</Link>
					</div>
				</div>
				<div className="flex-1">
					<a href="/" className="text-gray-600">Products</a>
					{/*<a href="/" className="text-gray-600">Search</a>*/}
					<input className="input-primary" type="text" placeholder="Search" />
				</div>
				<div className="justify-end">
				{
					user.token ?
					<>
						<a href="/">
							<img width="23px" src={user.photoURL} alt="avatar"/>
						</a>
						<a onClick={out} href="/" className="auth">
							<i className="mdi mdi-logout"></i>
						</a>
						<a href="/">
							<i className="mdi mdi-trophy-outline"></i>
						</a>
						<a href="/">
							<i className="mdi mdi-help-circle-outline"></i>
						</a>
					</>
					: <>
						<Link to="/auth/signin">Sign In</Link>
					</>
				}
				</div>
			</nav>
		</>
	)
}