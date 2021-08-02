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
import { FaUserCircle } from 'react-icons/fa';

// Styling
import '../../../Assets/css/index.css';
import "../Sidebar/accordion.css";

// Assets & Components include
import logo from '../../../Assets/img/Logo_JGLOW-removebg-preview.png';
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
    <div id="sidebar" className="h-full bg-pink-400 text-lg text-white">
		<Link to="/beranda">
			<img src={logo} alt="logo" className="block m-auto px-4 bg-white py-4 shadow-md"/>
		</Link>
		<div className="flex px-6 py-2 grid grid-cols-12 text-xs gap-2 bg-pink-500">
			<div className="col-span-3 flex">
				<FaUserCircle size={70}/>
			</div>
			<div className="m-auto ml-1 col-span-9">
				<p className="font-bold text-xl leading-5">JGLow Admin</p>
				<p className="font-light font-italic text-sm">admin@jglow.com</p>
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