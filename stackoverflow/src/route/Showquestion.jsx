import React from 'react'
import {
	useDispatch, useSelector, batch
} from 'react-redux'
import {
	useNavigate, useParams, Navigate, Link
} from 'react-router-dom'
import {answerAdd, answerGet, handle} from '@s/answer'
import {questionShow} from '@s/question'
import '@/style/show-question.sass'

export default function Showquestion() {
	const {id, slug} = useParams()
	const to = useNavigate()
	const dispatch = useDispatch()
	const [input, setinput] = React.useState({
		answer: ''
	})
	const [update, setupdate] = React.useState(null)
	const change = (e) => setinput({...input, [e.target.name]: e.target.value})
	const quest = useSelector((data) => data.question.data)
	const answer = useSelector((data) => data.answer.data)
	const show = useSelector((data) => data.question.show)
	const date = React.useMemo(() => {
		var data = new Date(show.createdAt)
		return data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear()
	}, [show.createdAt])
	React.useEffect(() => {
		dispatch(questionShow(id))
	}, [])
	React.useEffect(() => {
		if(id){
			batch(() => {
				dispatch(handle({
					name: 'data', value: []
				}))
				dispatch(answerGet(id))
			})
		}
	}, [id, update])
	const submit = (e) => {
		e.preventDefault()
		dispatch(answerAdd({...input, quest_id: id})).then(() => {
			setupdate(Date.now())
			setinput({answer: ''})
		})
	}
	return(
		<>
			<section className="show-question">
				<div>
					<h2>{show.quest}</h2>
					<div className="info">
						<div>
							<span>Asked</span>
							<span>{date}</span>
						</div>
						<div>
							<span>Active</span>
							<span>today</span>
						</div>
						<div>
							<span>Viewed</span>
							<span>{show.views || 0} times</span>
						</div>
					</div>
					<div className="answer">
						<p>Know someone who can answer? Share a link to this question via email, Twitter, or Facebook.</p>
						<div className="grid">
							{answer.map((value) => (
								<div key={value.createdAt} className="flex space-x-2 items-center">
									<img width="80px" height="80px" src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=80&q=60" alt=""/>
									<div>
										<Link to={'/profile/' + value?.user_id?._id} className="font-medium">{value?.user_id?.name}</Link>
										<p className="text-gray-300">{value.answer}</p>
										<p>{value.createdAt}</p>
									</div>
								</div>
							))}
						</div>
						<p>Your Answer</p>
						<div>
							<textarea value={input.answer} onChange={change} name="answer" className="input-primary" placeholder="Type Here"></textarea>
						</div>
						<button onClick={submit} className="btn-primary">Post Your Answer</button>
					</div>
				</div>
			</section>
		</>
	)
}