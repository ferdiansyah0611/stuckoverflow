import '@style/component/Signin.sass'
import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, Link, useParams, useLocation
} from 'react-router-dom'
import {signIn} from '@s/user'

export default function Signin() {
	const to = useNavigate()
	const dispatch = useDispatch()
	const [error, seterror] = React.useState(null)
	const [input, setinput] = React.useState({
		email: '', password: ''
	})
	const change = (e) => setinput({...input, [e.target.name]: e.target.value})
	const submit = (e) => {
		e.preventDefault()
		dispatch(signIn(input)).then((res) => {
			// console.log(res)
			if(!res.error){
				to('/')
			}else{
				seterror(res.error.message)
			}
		})
	}
	// const app = useSelector(state => state.app)
	return(
		<div className="signin">
			<form onSubmit={submit} action="/">
				<div className="grid gap-2">
					<h3>Sign In</h3>
					{error && <p className="alert-error">Error: {error}</p>}
					<div className="contents">
						<label htmlFor="email">Email</label>
						<input className="input-primary" placeholder="Your Email" type="email" name="email" value={input.email} onChange={change}/>
					</div>
					<div className="contents">
						<label htmlFor="password">Password</label>
						<input className="input-primary" placeholder="Your Password" type="password" name="password" value={input.password} onChange={change}/>
					</div>
					<button type="submit" className="btn-primary">Submit</button>
				</div>
			</form>
		</div>
	)
}