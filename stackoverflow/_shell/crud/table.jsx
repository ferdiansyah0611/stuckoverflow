import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, useParams, Navigate, Link, useLocation
} from 'react-router-dom'
import {storenameGet, storenameDelete} from '@s/storename'

export default function nameTable() {
	const to = useNavigate()
	const dispatch = useDispatch()
	const locate = useLocation()
	const [now, setnow] = React.useState(1)
	// list store
	React.useEffect(() => {
  	let page = new URLSearchParams(locate.search).get('page')
  	dispatch(answerGetUser(page || now))
  }, [now, locate])
	const data = useSelector((data) => data.storename.data)
	// remove data
	const remove = React.useCallback((e, id) => {
		e.preventDefault()
		(async() => {
			try{
				var res = await dispatch(storenameDelete(id))
			}catch(e){}
		})()
	}, [])
	return(
		<section className="table">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((value) => (
						<tr key={value.id}>
							<td>{value.id}</td>
							<td>
								<Link to={'/storename/' + value.id + '/edit'}>edit</Link>
								<a href="/" onClick={remove}>delete</a>
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