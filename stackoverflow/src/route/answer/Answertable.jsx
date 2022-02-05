import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, useParams, Navigate, Link, useLocation
} from 'react-router-dom'
import {answerGetUser, answerDelete} from '@s/answer'

export default function nameTable() {
	const to = useNavigate()
	const dispatch = useDispatch()
	const locate = useLocation()
	const [now, setnow] = React.useState(1)
	React.useEffect(() => {
  	let page = new URLSearchParams(locate.search).get('page')
  	dispatch(answerGetUser(page || now))
  }, [now, locate])
	// list store
	const data = useSelector((data) => data.answer.data)
	// remove data
	const remove = React.useCallback((e, _id) => {
		if(e.preventDefault){
			e.preventDefault()
		}
		(async() => {
			try{
				var res = await dispatch(answerDelete(_id))
			}catch(err){}
		})()
	}, [data])
	return(
		<section className="container-table">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>answer</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((value) => (
						<tr key={value._id}>
							<td>{value._id}</td>
							<td>{value.answer}</td>
							<td>
								<Link className="edit" to={value._id + '/edit'}>edit</Link>
								<a className="delete" href="/" onClick={(e) => remove(e, value._id)}>delete</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="paginate mt-2">
				<Link to={"?page=" + (now - 1 || 1)}>Previous</Link>
				<Link to={"?page=" + (now + 1)}>Next</Link>
			</div>
		</section>
	)
}