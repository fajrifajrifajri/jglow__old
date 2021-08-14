import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Auth
import ErrorNotice from "../../Auth/errorNotice";

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// Icons
import { FaChevronLeft, FaUser, FaLock, FaUnlock, FaAt } from 'react-icons/fa';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.clearError = this.clearError.bind(this);
		
		this.state = {
			email: '',
			username: '',
			password: '',
			passwordCheck: '',
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
	
	onChangeUsername(e) {
		this.setState({
			username: e.target.value
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
	
	async onSubmit(e) {
		e.preventDefault();
		
		const email = this.state.email;
		const username = this.state.username; 
		const password = this.state.password; 
		const passwordCheck = this.state.passwordCheck; 
		try{
			const newUser = {
				email, 
				username, 
				password, 
				passwordCheck
			};
			await axios.post("/users/daftar", newUser);
			const loginResponse = await axios.post("/users/masuk", {
				email, password
			});
			this.setState({
				token: loginResponse.data.token,
				user: loginResponse.data.user
			});
			localStorage.setItem("auth-token", loginResponse.data.token);
			this.props.history.push("/beranda");
		} catch(err) {
			
			console.log(err.response.data.errors);
			this.setState({error: err.response.data.errors})
		}
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
		let usernameError = errorArray.some(obj => Object.keys(obj).includes("username"));
		let passwordError = errorArray.some(obj => Object.keys(obj).includes("password"));
		let passwordCheckError = errorArray.some(obj => Object.keys(obj).includes("passwordCheck"));
		
		let userRegistered = errorArray.some(obj => obj.user === "registered");
		let emailInvalid = errorArray.some(obj => obj.email === "invalid");
		let emailRequired = errorArray.some(obj => obj.email === "required");
		let usernameRequired = errorArray.some(obj => obj.username === "required");
		let passwordRequired = errorArray.some(obj => obj.password === "required");
		let passwordCheckRequired = errorArray.some(obj => obj.passwordCheck === "invalid");
		let passwordMismatch = errorArray.some(obj => obj.password === "mismatch");
	
		return (
		<div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
				<Header/>
				<div className="body__second__container">
				<div className="flex">
					<Link to="/user" className="button--back">
						<FaChevronLeft size={30} className="m-auto inline-block mr-2"/>
						<span className="font-bold">
							Tabel User
						</span>
					</Link>
					<h1 className="m-auto ml-4 inline-block text-4xl">TAMBAH USER</h1>
				</div>
				<form onSubmit={this.onSubmit}>
					<div className={`flex bg-gray-100 mt-4 rounded-t text-sm ${(emailError || userError) && 'border border-red-200'}`}>
						<FaAt size={42} className="text-gray-400 p-3" />
						<input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="E-mail" className="bg-gray-100 pl-2 w-full"/>
					</div>
					{userRegistered && <ErrorNotice message={"Email Has Been Registered"} clearError={() => this.clearError(false)} />}
					{emailInvalid && <ErrorNotice message={"Email Invalid"} clearError={() => this.clearError(false)} />}
					{emailRequired && <ErrorNotice message={"Email Required"} clearError={() => this.clearError(false)} />}
					
					<div className={`flex bg-gray-100 mt-4 rounded-t text-sm ${usernameError && 'border border-red-200'}`}>
						<FaUser size={42} className="text-gray-400 p-3" />
						<input type="text" name="username" value={this.state.username} onChange={this.onChangeUsername} placeholder="Username" className="bg-gray-100 pl-2 w-full"/>
					</div>
					{usernameRequired && <ErrorNotice message={"Username Required"} clearError={() => this.clearError(false)} />}
					
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