// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Auth
import UserContext from "../../Auth/userContext";

// Icons
import { FaUserCircle, FaTruck, FaBoxOpen, FaUserSecret, FaUsersCog, FaArrowAltCircleLeft } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoStatsChartSharp } from 'react-icons/io5';

// Styling
import '../../../Assets/css/index.css';
import "../Sidebar/accordion.css";

// Assets & Components include
import logo from '../../../Assets/img/Logo_JGLOW-removebg-preview.png';
import Accordion from "../Sidebar/accordion";
import logoSaturated from '../../../Assets/img/Logo JGLOW saturated.png';

// SweetAlert 2
import Swal from 'sweetalert2';

class Sidebar extends Component {
	// React.useContext
	 static contextType = UserContext
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			role: '',
			
			// Loading
			loading: true
		}
		
		this.onLogout = this.onLogout.bind(this);
		
	}
	
  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
  }
  
  componentDidMount(){
	// to make useEffect() in App.js to run
	this.context.userStatus();
	
	// loading screen
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator')
	  const _this = this;
      if(ele){
        // fade out
        ele.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = '';
		  
		  // loading false
		  _this.setState({ loading: false })
        }, 2000)
      }
    })
  }
	
	/*
	componentDidMount() {
	  const _this = this;
	  const { email } = this.state;
	  
	  setTimeout(function() {
		
		// Retrieving User Context
		console.log('Trying to fetch from UserContext: (delayed)');
		const user = _this.context.userData.user;
		console.log(user);
		
		// setState
		_this.setState({ email: user.email, role: user.role })
		
		if(user === null) {
			// Set user status to 'false'
			// So useEffect() in App.js runs again
			// To verify token expiration every page refresh
			_this.context.userStatus();
			
			// Notify
			Swal.fire({
				icon: 'warning',
				title: 'Autentikasi anda bermasalah...',
				text: 'Silakan login kembali!'
			});
			
			// Push to login
			_this.props.history.push('/')
		}
	  }, 2000);
	}
	*/
	
	componentDidUpdate() {
		  const user = this.context.userData.user;
		  const { email } = this.state;
		  if(!this.state.loading) {
			// console.log(user);
			if(user !== undefined) {
				if(user === null) {
					// Set user status to 'false'
					// So useEffect() in App.js runs again
					// To verify token expiration every page refresh
					this.context.userStatus();
					localStorage.setItem("auth-token", "");
					
					// Notify
					Swal.fire({
						icon: 'warning',
						title: 'Session anda telah habis...',
						text: 'Silakan login kembali!'
					});
					
					// Push to login
					this.props.history.push('/')
					
					return false;
				}
			
				if(email === '') {
					this.setState({ email: user.email, role: user.role })
				}
			}
		}
	}
	
	async onLogout(e) {
		e.preventDefault();
		
		this.context.userStatus();
		
		localStorage.setItem("auth-token", "");
		this.props.history.push("/");
	};
		
  render() {
	 const { email, role } = this.state;
	
    return (
    <div id="sidebar" className="h-full bg-pink-400 text-lg text-white">
	 <div className="ipl-progress-indicator shadow-lg" id="ipl-progress-indicator">
      <div className="ipl-progress-indicator-head">
        <div className="first-indicator"></div>
        <div className="second-indicator"></div>
      </div>
      <div className="insp-logo-frame">
		<img src={logoSaturated} className="w-2/12 m-auto mb-8" alt="logo saturated"/>
      </div>
    </div>
	
	
		<Link to="/beranda">
			<img src={logo} alt="logo" className="block m-auto px-4 bg-white py-4 shadow-md"/>
		</Link>
		<div className="flex px-6 py-2 grid grid-cols-12 text-xs gap-2 bg-gradient-to-r from-pink-600 to-pink-500">
			<div className="col-span-3 flex">
				<FaUserCircle size={70}/>
			</div>
			<div className="m-auto ml-1 col-span-9">
				<Link to="/profile" className="font-bold text-xl leading-5">JGLow {role}</Link>
				<p className="font-light font-italic text-sm">{email}</p>
			</div>
		</div>
		<div className="divide-y-2 divide-gray-400 divide-dashed">
			<Link to="/beranda" className='accordion w-full' id="test123">
				<div className='flex px-4'>
					<AiFillHome size={20} className='m-auto fa-sm mr-3' />
					<p className="font-bold">Beranda</p>
				</div>
			</Link>
			<Accordion
			   fontAwesome={FaTruck}
			   title="Order"
			/>
			{(role === 'klinik' || role === 'distributor') ? (
			<>
				<Link to="/produk" className='accordion w-full' id="test123">
					<div className='flex px-4'>
						<FaBoxOpen size={20} className='m-auto fa-sm mr-3' />
						<p className="font-bold">Produk</p>
					</div>
				</Link>
			</>
			) : ''}
			{role === 'klinik'  ? (
			<>
				<Link to="/agent" className='accordion w-full' id="test123">
					<div className='flex px-4'>
						<FaUserSecret size={20} className='m-auto fa-sm mr-3' />
						<p className="font-bold">Agent</p>
					</div>
				</Link>
				<Link to="/user" className='accordion w-full' id="test123">
					<div className='flex px-4'>
						<FaUsersCog size={20} className='m-auto fa-sm mr-3' />
						<p className="font-bold">Kelola User</p>
					</div>
				</Link>
				<Accordion
				   fontAwesome={IoStatsChartSharp}
				   title="Laporan"
				/>
			</>
			) : ''}
			{/*
			<Accordion
			   fontAwesome={FaBoxOpen}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Produk"
			/>
			<Accordion
			   fontAwesome={FaUserSecret}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Agent"
			/>
			<Accordion
			   fontAwesome={FaUsersCog}
			   additionalClass="text-gray-200"
			   isDisabled={true}
			   title="Kelola User"
			/>
			*/}
			<button onClick={this.onLogout} className='accordion w-full' id="test234">
				<div className='flex px-4'>
					<FaArrowAltCircleLeft className='m-auto mr-3' />
					<p className="font-bold">Keluar</p>
				</div>
			</button>
		</div>
    </div>
    );
  }
}

export default withRouter(Sidebar);