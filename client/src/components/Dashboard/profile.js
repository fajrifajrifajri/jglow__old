// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Auth
import UserContext from "../Auth/userContext";

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';
import { Header } from './_Main Components/header';

// Icons
import { FaLink }  from 'react-icons/fa';

class Profile extends Component {
	// React.useContext
	static contextType = UserContext;
	
	constructor(props) {
		super(props);
		
		this.state = {
			clipboard: ''
		}
	}
	
	componentDidUpdate (prevProps, prevState) {
		const user = this.context.userData.user;
	  
		if(prevState.clipboard === '') {
			if(user) {
				this.setState({
					clipboard: 'jglow.herokuapp.com/formulir-konsultasi/'+ user.kodeAgent
				})
				console.log(user.kodeAgent);
			}
		}
	}
	
	render() {
		const user = this.context.userData.user;
		return (
		<div className="grid grid-cols-12">
			<div className="col-span-2">
				<Sidebar/>
			</div>
			<div className="col-span-10 bg-gray-100">
				<Header />
				<div className="bg-layout min-h-screen rounded-tl-lg px-32 py-12">
					<h1 className="text-center text-2xl font-bold mb-10">Profile Management</h1>
					{user ?
						user.role === "agent" &&
							<div className="grid grid-cols-12">
								<div className="col-span-4">
									Link Form:
								</div>
								<div className="col-span-6">
									<Link className="form__control bg-white" to={`/formulir-konsultasi/${user ? user.kodeAgent : ''}`}>
										jglow.herokuapp.com{`/formulir-konsultasi/${user ? user.kodeAgent : ''}`}
									</Link>
								</div>
								<div className="col-span-2 flex bg-blue-300 hover:bg-blue-400 transition delay-150  text-white text-center cursor-pointer" onClick={() => {
									navigator.clipboard.writeText(this.state.clipboard)
									alert('Copied!');
									}}>
									<div className="m-auto">
										<FaLink/>
									</div>
								</div>
							</div>
					: <p className="text-center">Coming Soon</p> }
				</div>
			</div>
		</div>
		);
	}
}

export default withRouter(Profile);