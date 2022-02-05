import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, Link, useParams, useLocation
} from 'react-router-dom'
import {questionAdd, questionUpdate, questionShow} from '@s/question'

export default function questadd(props) {
	const to = useNavigate()
	const {id} = useParams()
	const dispatch = useDispatch()
	const question = useSelector(state => state.question.data)
	const [input, setinput] = React.useState({
		quest: '', tag: [], inputtag: ''
	})
	React.useEffect(() => {
		(async() => {
			if(id){
				var find
				find = question.find((v) => v._id === id)
				if(!find){
					find = await dispatch(questionShow(id))
					find = find.payload.data
				}
				if(find){
					setinput({
						...input,
						quest: find.quest,
						tag: find.tag || []
					})
				}
			}
		})()
	}, [question, id])
	const change = (e) => setinput({...input, [e.target.name]: e.target.value})
	const addtag = () => {
		setinput({
			...input,
			tag: [input.inputtag, ...input.tag],
			inputtag: ''
		})
	}
	const removetag = (e, text) => {
		e.preventDefault()
		setinput({
			...input, tag: input.tag.filter((d) => d !== text)
		})
	}
	const submit = (e) => {
		e.preventDefault()
		if(id){
			dispatch(questionUpdate({...input, id: id, _id: id})).then(() => {
				alert('Edited')
			})
		}else{
			dispatch(questionAdd(input)).then(() => {
				to('/')
			})
		}
	}
	return(
		<div className="signin">
			<form onSubmit={submit} action="/">
				<div className="container-form">
					<h3>{id ? 'Edit' :'Add'} Quest</h3>
					<textarea className="input-primary" placeholder="Question" name="quest" value={input.quest} onChange={change}/>
					<input type="text" className="input-primary" placeholder="Add tag in here" name="inputtag" value={input.inputtag} onChange={change} />
					<button type="button" className="btn-primary" onClick={addtag}>Add tag</button>
					<div className="flex space-x-1">
						{
							(input.tag).map((value, key) => (
								<a className="chip" href="/" onClick={(e) => removetag(e, value)} key={value}>{value}</a>
							))
						}
					</div>
					<button type="submit" className="btn-primary">Submit</button>
				</div>
			</form>
		</div>
	)
}