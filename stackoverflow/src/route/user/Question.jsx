import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, Link, useParams, useLocation
} from 'react-router-dom'
import {questionGet, questionDelete} from '@s/questionuser'

export default function Signin(props) {
	const to = useNavigate()
	const dispatch = useDispatch()
	const locate = useLocation()
	const data = useSelector(state => state.questionuser.data)
	const [now, setnow] = React.useState(1)
	React.useEffect(() => {
  	dispatch(questionGet(now))
  }, [now])
  React.useEffect(() => {
  	let page = new URLSearchParams(locate.search).get('page')
  	dispatch(questionGet(page || now))
  }, [now, locate])
  const remove = (_id) => _id && dispatch(questionDelete({id: _id}))
	return(
		<div className="container-table">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Quest</th>
						<th>Created</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((data) => (
						<tr key={data._id}>
							<td>{data._id}</td>
							<td>{data.quest}</td>
							<td>{data.createdAt}</td>
							<td>
								<Link to={"/question/" + data._id + '/edit'}>Edit</Link>
								<button onClick={() => remove(data._id)}>Remove</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<section className="paginate mt-2">
				<Link to={"?page=" + (now - 1 || 1)}>Previous</Link>
				<Link to={"?page=" + (now + 1)}>Next</Link>
			</section>
		</div>
	)
}