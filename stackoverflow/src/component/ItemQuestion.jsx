import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	Link
} from 'react-router-dom'

function convertToSlug(Text){
	return String(Text).toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g, '')
}

export default function ItemQuestion(props) {
	const dispatch = useDispatch()
	const {data, odd} = props
	return(
		<div className={"item-question " + (odd ? 'odd': '')}>
			<div className="info">
				<p>{data.votes || Math.floor(Math.random() * 100)} votes</p>
				<p>{data.answers || Math.floor(Math.random() * 100)} answers</p>
				<p>{data.views || Math.floor(Math.random() * 100)} views</p>
			</div>
			<div>
				<Link to={"/question/" + data._id + '/' + convertToSlug(data.quest)}>{data.quest}</Link>
				<div className="flex space-x-1 items-center">
					{
						(data.tag || ['javascript', 'react js', 'node js']).map((value, key) => (
							<Link className="chip" to={"/tag/" + value} key={value}>{value}</Link>
						))
					}
				</div>
				<Link to={'/profile/' + data.user_id._id} className="text-sm mt-2 profile">by {data.user_id.name}</Link>
			</div>
		</div>
	)
}