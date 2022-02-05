import React from 'react'
import {
	Outlet
} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sideleft from './Sideleft'
import '@/style/home.sass'

export default function Template() {
	return(
		<div>
			<Navbar/>
			<div className="containers" id="body">
				<div className="home">
					<div className="one">
						<Sideleft/>
					</div>
					<div className="two"><Outlet/></div>
					<div className="three">
						<div>
							<div className="section">
								<div className="item">
									<p>The Overflow Blog</p>
									{[0,1].map((data) => (
										<div key={data}>
											<i className="mdi mdi-pencil"></i>
											<a href="/">The complete beginners guide to dynamic programming</a>
										</div>
									))}
								</div>
								<div className="item">
									<p>Featured on Meta</p>
									{[0,1].map((data) => (
										<div key={data}>
											<i className="mdi mdi-message-outline"></i>
											<a href="/">We’ve made changes to our Terms of Service & Privacy Policy</a>
										</div>
									))}
								</div>
								<div className="item">
									<p>Hot Meta Posts</p>
									{[0,1].map(data => (
										<div key={data}>
											<span>{data}</span>
											<a href="/">A user that keeps making tag edits to get attention</a>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	)
}