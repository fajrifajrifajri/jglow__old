import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

// Auth
import ErrorNotice from "../../Auth/errorNotice";

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// Icons
import { FaChevronLeft, FaLock, FaUnlock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
		this.onChangeRole = this.onChangeRole.bind(this);
		this.onRefreshKodeAgent = this.onRefreshKodeAgent.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.clearError = this.clearError.bind(this);
		
		this.state = {
			email: '',
			password: '',
			passwordCheck: '',
			role: '',
			kodeAgent: undefined,
			agentToggle: false,
			loadingSpin: false,
			error: [],
			
			// Context states
			token: undefined,
			user: undefined
		}
	}
	
	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}
	
	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}
	
	onChangePasswordCheck(e) {
		this.setState({
			passwordCheck: e.target.value
		});
	}
	
	onChangeRole(newValue: any) {
			console.log(newValue);
		if(newValue.value === 'agent') {
			this.setState({
				agentToggle: true
			});
			console.log('1');
		} else {
			this.setState({
				agentToggle: false,
				kodeAgent: undefined,
			});
		}
		this.setState({
			role: newValue
		});
	}
	
	onRefreshKodeAgent(e) {
		e.preventDefault();
		
		this.setState({
			loadingSpin: true
		})
		
		const Random5DigitString = Math.random().toString(36).substr(2, 5).toUpperCase();
		const _this = this;
		
		setTimeout(() => {
			_this.setState({ 
				loadingSpin: false, 
				kodeAgent: Random5DigitString 
			})
        }, 500)
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const newUser = {
			email: this.state.email,
			password: this.state.password,
			passwordCheck: this.state.passwordCheck,
			role: this.state.role.value,
			kodeAgent: this.state.kodeAgent
		};
		
		console.log(newUser);
		
		axios.post("/backend/users/daftar", newUser).then((res) => {
		  console.log(res.data);
	
		  MySwal.fire(  
			'User telah ditambahkan!',
			'success'
			);		
		})
		.catch((err) => {
			console.log(err.response.data.errors);
			this.setState({error: err.response.data.errors})
		})
	}
	
	clearError() {
		console.log(this.state.error)
		this.setState({
			error: []
		});
	}
	
	render() {
	  
		let errorArray = this.state.error;
		let userError = errorArray.some(obj => Object.keys(obj).includes("user"));
		let emailError = errorArray.some(obj => Object.keys(obj).includes("email"));
		let passwordError = errorArray.some(obj => Object.keys(obj).includes("password"));
		let passwordCheckError = errorArray.some(obj => Object.keys(obj).includes("passwordCheck"));
		
		let userRegistered = errorArray.some(obj => obj.user === "registered");
		let emailInvalid = errorArray.some(obj => obj.email === "invalid");
		let emailRequired = errorArray.some(obj => obj.email === "required");
		let passwordRequired = errorArray.some(obj => obj.password === "required");
		let passwordCheckRequired = errorArray.some(obj => obj.passwordCheck === "invalid");
		let passwordMismatch = errorArray.some(obj => obj.password === "mismatch");
		
		const roles = [{ value: 'agent', label: 'Agent' }, { value: 'distributor', label: 'Distributor' }, { value: 'klinik', label: 'Klinik' }];
		
		const customStyles = {
			control: (base, state) => ({
				...base,
				background: 'rgba(243, 244, 246, 1)',
				border: state.isFocused ? '2px solid' : 0,
				// Removes weird border around container
				boxShadow: state.isFocused ? null : null,
				"&:hover": {
				  // Overwrittes the different states of border
				  borderColor: state.isFocused ? "black" : null
				}
			}),
			menu: base => ({
				...base,
				// override border radius to match the box
				borderRadius: 0,
				// kill the gap
				marginTop: 0
			}),
			menuList: base => ({
				...base,
				// kill the white space on first and last option
				padding: 0
			})
		};
		
		const { kodeAgent, loadingSpin, agentToggle } = this.state;
	
		return (
		<div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
			<Header />
				<div className="body__form__container">
				<div className="flex">
					<Link to="/user" className="button--back">
						<FaChevronLeft size={20} className="icon--header"/>
						<span>
							Tabel User
						</span>
					</Link>
					<div className="button--input">
						<span>
							TAMBAH USER
						</span>
					</div>
				</div>
				<form onSubmit={this.onSubmit}>
					<div className={`flex bg-gray-100 mt-4 rounded-t text-sm ${(emailError || userError) && 'border border-red-200'}`}>
						<MdEmail size={42} className="text-gray-400 p-3" />
						<input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="E-mail" className="bg-gray-100 pl-2 w-full"/>
					</div>
					{userRegistered && <ErrorNotice message={"Email Has Been Registered"} clearError={() => this.clearError(false)} />}
					{emailInvalid && <ErrorNotice message={"Email Invalid"} clearError={() => this.clearError(false)} />}
					{emailRequired && <ErrorNotice message={"Email Required"} clearError={() => this.clearError(false)} />}
					
					<div className={`flex bg-gray-100 mt-4 rounded-t text-sm ${passwordError && 'border border-red-200'}`}>
						<FaLock size={42} className="text-gray-400 p-3" />
						<input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" className="bg-gray-100 pl-2 w-full"/>
					</div>
					{passwordRequired && <ErrorNotice message={"Password Required"} clearError={() => this.clearError(false)} />}
					
					<div className={`flex bg-gray-100 my-4 rounded-t text-sm ${passwordCheckError && 'border border-red-200'}`}>
						<FaUnlock size={42} className="text-gray-400 p-3" />
						<input type="password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.onChangePasswordCheck} placeholder="Re-enter Password" className="bg-gray-100 pl-2 w-full"/>
					</div>
					{passwordCheckRequired && <ErrorNotice message={"Password Re-enter Must be Filled"} clearError={() => this.clearError(false)} />}
					{passwordMismatch && <ErrorNotice message={"Password Doesn't Match"} clearError={() => this.clearError(false)} />}
					
					<div className="flex bg-gray-100 my-4 rounded-t text-sm">
						<FaUnlock size={42} className="text-gray-400 p-3" />
						<Select
						  className="rounded-t text-sm w-full"
						  styles={customStyles}
						  onChange={this.onChangeRole}
						  options={roles}
						  placeholder="Role"
						/>
					</div>
					
					{ agentToggle ? (
						<div className="form__group">
							<div className="grid grid-cols-12">
								<div className="col-span-8">
									<input type="text" className="py-4 bg-gray-100 pl-2 w-full" value={this.state.kodeAgent} placeholder={`${kodeAgent}`} placeholder="..." disabled/>
								</div>
								<div className="col-span-4">
									<button className="form__control text-white bg-pink-700 transform focus:translate-y-0.5" onClick={this.onRefreshKodeAgent}>
										<FiRefreshCcw className={`inline-block ${loadingSpin ? 'animate-spin' : ''}`} size={16}/> Generate Kode Agent
									</button>
								</div>
							</div>
						</div>
					) : '' }
					
					<div className="form-group">
						<input type="submit" value="Buat produk" className="button"/>
					</div>
				</form>
			</div>
		</div>
	</div>
		)
	}
}