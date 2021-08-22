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

// Icons
import { FaChevronLeft, FaLock, FaUnlock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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
		this.onSubmit = this.onSubmit.bind(this);
		this.clearError = this.clearError.bind(this);
		
		this.state = {
			email: '',
			password: '',
			passwordCheck: '',
			role: 'agent',
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
		this.setState({
			role: newValue
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const newUser = {
			email: this.state.email,
			password: this.state.password,
			passwordCheck: this.state.passwordCheck,
			role: this.state.role.value,
		};
		
		console.log(newUser);
		
		axios.post("/users/daftar", newUser).then((res) => {
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
	
		return (
		<div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
				<div className="body__form__container">
				<div>
					<Link to="/user" className="button--back">
						<FaChevronLeft size={20} className="icon--header"/>
						<span>
							Tabel User
						</span>
					</Link>
					<h1 className="m-auto ml-4 inline-block text-4xl">TAMBAH USER</h1>
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
					
					<Select
					  className={`my-4 rounded-t text-sm w-full`}
					  styles={customStyles}
					  onChange={this.onChangeRole}
					  defaultValue={roles[0]}
					  name="role"
					  options={roles}
					/>
					
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