import React from 'react'
import {
	useDispatch, useSelector
} from 'react-redux'
import {
	useNavigate, useParams, Navigate, Link
} from 'react-router-dom'
import {answerGet} from '@s/answer'

export default function answerShow() {
	const {id} = useParams()
	const to = useNavigate()
	const dispatch = useDispatch()
	// show store
	const store = useSelector((data) => data.answer.data)
	const data = useMemo(() => {
		var find = store.find((value) => value.id === id)
		if(!find){
			(async() => {
				find = await dispatch(answerGet(id))
				find = find.payload
			})()
		}
		return find || {}
	}, [id])
	return(
		<section className="show">
			{/*show your data in here*/}

		</section>
	)
}