import {
	useNavigate, Link, useLocation
} from 'react-router-dom'
import {
	useDispatch, useSelector
} from 'react-redux'
import { useState, useEffect } from 'react'
import ItemQuestion from '@c/ItemQuestion'
import Sideleft from '@c/Sideleft'

import {questionGet} from '@s/question'

export default function Home(){
	const dispatch = useDispatch()
  const to = useNavigate()
  const locate = useLocation()
  // const quest = useSelector((data) => data.app.quest)
  const quest = useSelector((data) => data.question.data)
  const [tab, settab] = useState('')
  const [now, setnow] = useState(1)
  useEffect(() => {
  	var data = new URLSearchParams(locate.search).get('tabs')
  	settab(data || '')
  }, [locate])
	useEffect(() => {
  	let page = new URLSearchParams(locate.search).get('page')
  	dispatch(questionGet(page || now))
  }, [now, locate])
	return(
		<>
			<section>
				<div className="flex items-center">
					<h1 className="flex-1 font-bold text-2xl">Top Questions</h1>
					<Link to="/question/add" className="btn-primary">Ask Question</Link>
				</div>
			</section>
			<div>
				<div className="btn-group-outline justify-end">
					<div></div>
					<Link to="/" className={"rounded-sm " + (tab === '' ? 'active': '')}>Interesting</Link>
					<Link to="/?tabs=bountied" className={tab === 'bountied' ? 'active': ''}>Bountied</Link>
					<Link to="/?tabs=hot" className={tab === 'hot' ? 'active': ''}>Hot</Link>
					<Link to="/?tabs=week" className={tab === 'week' ? 'active': ''}>Week</Link>
					<Link to="/?tabs=month" className={"rounded-sm " + (tab === 'month' ? 'active': '')}>Month</Link>
				</div>
			</div>
			<section>
				{
					quest.map((data, key) => (
						<ItemQuestion odd={key % 2} data={data} key={data._id} />
					))
				}
			</section>
			<section className="paginate">
				<Link to={"/?page=" + (now - 1 || 1)}>Previous</Link>
				<Link to={"/?page=" + (now + 1)}>Next</Link>
			</section>
			<section className="py-10">
				<p>Looking for more? Browse the complete list of questions, or popular tags. Help us answer unanswered questions.</p>
			</section>
		</>
	)
}