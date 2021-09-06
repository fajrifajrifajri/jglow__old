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

class Profile extends Component {
	// React.useContext
	static contextType = UserContext;
	
	render() {
		const user = this.context.userData.user;
		return (
		<div className="grid grid-cols-12">
			<div className="col-span-2">
				<Sidebar/>
			</div>
			<div className="col-span-10 bg-gray-100">
				<div className="bg-layout min-h-screen rounded-tl-lg">
				{user ?
					<Link to={`/formulir-konsultasi/${user ? user.kodeAgent : ''}`}>
						Form Konsultasi
					</Link>
				: '' }
				</div>
			</div>
		</div>
		);
	}
}

export default withRouter(Profile);