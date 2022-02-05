import React from 'react'
import { Link } from 'react-router-dom'
import {
	useDispatch, useSelector
} from 'react-redux'

export default function Footer() {
	const dispatch = useDispatch()
	const app = useSelector(state => state.app)
	const [menu, setmenu] = React.useState({
		one: [
			{
				title: 'Questions',
			},
			{
				title: 'Jobs',
			},
			{
				title: 'Developer Jobs Directory',
			},
			{
				title: 'Salary Calculator',
			},
			{
				title: 'Help',
			},
			{
				title: 'Mobile',
			},
			{
				title: 'Disable Responsiveness',
			},
		],
		two: [
			{
				title: 'Teams',
			},
			{
				title: 'Talent',
			},
			{
				title: 'Advertising',
			},
			{
				title: 'Enterprise',
			},
		],
		three: [
			{
				title: 'About',
			},
			{
				title: 'Press',
			},
			{
				title: 'Work Here',
			},
			{
				title: 'Legal',
			},
			{
				title: 'Privacy Policy',
			},
			{
				title: 'Terms of Service',
			},
			{
				title: 'Contact Us',
			},
			{
				title: 'Cookie Settings',
			},
			{
				title: 'Cookie Policy',
			},
		],
		fourth: [
			{
				title: 'Technology',
			},
			{
				title: 'Culture & recreation',
			},
			{
				title: 'Life & arts',
			},
			{
				title: 'Science',
			},
			{
				title: 'Professional',
			},
			{
				title: 'Business',
			},
			{
				title: 'API',
			},
			{
				title: 'Data',
			},
		]
	})
	return(
		<div className="footer containers">
			<div className="one">
				<div>
					<div className="flex items-center space-x-2">
						<svg aria-hidden="true" width="20" height="23" viewBox="0 0 32 37">
							<path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
							<path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path>
						</svg>
						<h5>{app.name}</h5>
					</div>
					<ul>
					{menu.one.map((data) => (
						<li key={data.title}>
							<Link to="/">{data.title}</Link>
						</li>
					))}
					</ul>
				</div>
				<div>
					<h5>PRODUCTS</h5>
					<ul>
					{menu.two.map((data) => (
						<li key={data.title}>
							<Link to="/">{data.title}</Link>
						</li>
					))}
					</ul>
				</div>
				<div>
					<h5>Company</h5>
					<ul>
					{menu.three.map((data) => (
						<li key={data.title}>
							<Link to="/">{data.title}</Link>
						</li>
					))}
					</ul>
				</div>
				<div>
					<h5>STACK EXCHANGE NETWORK</h5>
					<ul>
					{menu.fourth.map((data) => (
						<li key={data.title}>
							<Link to="/">{data.title}</Link>
						</li>
					))}
					</ul>
				</div>
			</div>
		</div>
	)
}