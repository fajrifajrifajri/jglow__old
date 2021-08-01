// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Auth
import UserContext from "../../Auth/userContext";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTruck, faBoxOpen, faUserSecret, faUsersCog, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

// Styling
import '../../../Assets/css/index.css';
import "../Sidebar/accordion.css";

// Assets & Components include
import logo from '../../../Assets/img/Logo_JGLOW-removebg-preview.png';
import user from '../../../Assets/img/0c3b3adb1a7530892e55ef36d3be6cb8.png';
import Accordion from "../Sidebar/accordion";

class Sidebar extends Component {
	// React.useContext
	 static contextType = UserContext
	
	constructor(props) {
		super(props);
		
		this.state = {
			// Context states
			token: undefined,
			user: undefined
		}
		
		this.onLogout = this.onLogout.bind(this);
		
	}
	
	componentDidMount() {
		const user = this.context.userData;
		console.log(user)
	}
	
	async onLogout(e) {
		e.preventDefault();
		
		this.setState({
			token: undefined,
			user: undefined
		});
		
		localStorage.setItem("auth-token", "");
		this.props.history.push("/");
	};
		
  render() {
    return (
    <div id="sidebar" className="h-full bg-gray-500 py-4 text-lg">
		<Link to="/beranda">
			<img src={logo} alt="logo" className="block m-auto px-4 bg-pink-200 py-4 shadow"/>
		</Link>
		<div className="flex p-6 grid grid-cols-12 text-xs gap-2">
			<div className="col-span-3 flex">
				<img src={user} alt="user" className="inline-block m-auto"/>
			</div>
			<div className="m-auto col-span-6">
				<p className="font-italic font-bold">sample</p>
				<p className="font-light font-italic">sample@email.com</p>
			</div>
			<div className="col-span-3">
				
			</div>
		</div>
		<div className="divide-y-2 divide-gray-400 divide-dashed">
			<Link to="/beranda" className='accordion w-full' id="test123">
				<div className='flex px-4'>
					<FontAwesomeIcon icon={faHome} className='m-auto fa-sm mr-3' />
					<p className="font-bold">Beranda</p>
				</div>
			</Link>
			<Accordion
			   fontAwesome={faTruck}
			   title="Order"
			/>
			<Accordion
			   fontAwesome={faBoxOpen}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Produk"
			/>
			<Accordion
			   fontAwesome={faUserSecret}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Agent"
			/>
			<Accordion
			   fontAwesome={faUsersCog}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Kelola User"
			/>
			<button onClick={this.onLogout} className='accordion w-full' id="test234">
				<div className='flex px-4'>
					<FontAwesomeIcon icon={faArrowAltCircleLeft} className='m-auto fa-sm mr-3' />
					<p className="font-bold">Keluar</p>
				</div>
			</button>
		</div>
    </div>
    );
  }
}

export default withRouter(Sidebar);