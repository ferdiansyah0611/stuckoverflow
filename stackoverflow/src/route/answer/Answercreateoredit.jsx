import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, Link, useParams, useLocation
} from 'react-router-dom'
import {answerAdd, answerUpdate, answerGetId} from '@s/answer'

export default function nameCreateOrEdit(props) {
	const to = useNavigate()
	const {id} = useParams()
	const dispatch = useDispatch()
	const answer = useSelector(state => state.answer.data)
	// change your field input
	const [input, setinput] = React.useState({
		answer: ''
	})
	// if edit
	React.useEffect(() => {
		(async() => {
			if(id){
				var find = await dispatch(answerGetId(id))
				find = find.payload.data
				if(find){
					setinput({
						...input,
						...find
					})
				}
			}
		})()
	}, [id])
	// input change
	const change = (e) => setinput({...input, [e.target.name]: e.target.value})
	// submit form
	const submit = (e) => {
		e.preventDefault()
		if(id){
			dispatch(answerUpdate({...input, id: id})).then(() => {
				console.log('Edited')
			})
		}else{
			dispatch(answerAdd(input)).then(() => {
				console.log('Saved')
			})
		}
	}
	return(
		<div className="form-container">
			<form onSubmit={submit} action="/">
				<div className="container-form contents">
					<h3>{id ? 'Edit' :'Add'} Data</h3>
					<div>
						<label htmlFor="">Anwer</label>
						<textarea className="input-primary" placeholder="Your Answer" name="answer" value={input.answer} onChange={change}/>
					</div>
					<button type="submit" className="btn-primary">Submit</button>
				</div>
			</form>
		</div>
	)
}