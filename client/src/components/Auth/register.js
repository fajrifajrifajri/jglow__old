// Import React & Required libs
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

// Auth
import UserContext from "./userContext";
import ErrorNotice from "./errorNotice";

// Styling
import '../../Assets/css/index.css';

// Icons
import { FaLock, FaUnlock, FaAt, FaArrowLeft } from 'react-icons/fa';

// Assets include
import logo from '../../Assets/img/Logo JGLOW.png';
import logoSaturated from '../../Assets/img/Logo JGLOW saturated.png';

class Register extends Component {
	// React.useContext
	 static contextType = UserContext
	 
	constructor(props) {
		super(props);
		
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
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
	
    async onSubmit(e) {
		e.preventDefault();
		
		const email = this.state.email;
		const password = this.state.password; 
		const passwordCheck = this.state.passwordCheck; 
		const role = this.state.role; 
		try{
			const newUser = {
				email, 
				password, 
				passwordCheck,
				role
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
	};
	
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
	
    return (
    <div id="register" className="flex bg-pink-light min-h-screen pb-12">
		<div className="m-auto flex flex-col">
			<img src={logoSaturated} className="w-9/12 m-auto mb-8" alt="logo saturated"/>
			<form onSubmit={this.onSubmit} className="bg-white border rounded-lg p-6 shadow-lg" autocomplete="off">
				<div className="flex-col">
					<img src={logo} alt="logo" className="block m-auto"/>
					<h1 className="block m-auto text-center text-2xl font-bold">PT. JGLOW BEAUTYCARE</h1>
				</div>
				
				<div className={`flex bg-gray-100 mt-4 rounded-t text-sm shadow ${(emailError || userError) && 'border border-red-200'}`}>
					<FaAt size={42} className="text-gray-400 p-3" />
					<input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="E-mail" className="bg-gray-100 pl-2 w-full focus-within:ring-2 focus-within:ring-pink-dark outline-none rounded-r cursor-pointer"/>
				</div>
				{userRegistered && <ErrorNotice message={"Email Has Been Registered"} clearError={() => this.clearError(false)} />}
				{emailInvalid && <ErrorNotice message={"Email Invalid"} clearError={() => this.clearError(false)} />}
				{emailRequired && <ErrorNotice message={"Email Required"} clearError={() => this.clearError(false)} />}
				
				<div className={`flex bg-gray-100 mt-4 rounded-t text-sm shadow ${passwordError && 'border border-red-200'}`}>
					<FaLock size={42} className="text-gray-400 p-3" />
					<input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" className="bg-gray-100 pl-2 w-full focus-within:ring-2 focus-within:ring-pink-dark outline-none rounded-r cursor-pointer"/>
				</div>
				{passwordRequired && <ErrorNotice message={"Password Required"} clearError={() => this.clearError(false)} />}
				
				<div className={`flex bg-gray-100 my-4 rounded-t text-sm shadow ${passwordCheckError && 'border border-red-200'}`}>
					<FaUnlock size={42} className="text-gray-400 p-3" />
					<input type="password" name="passwordCheck" value={this.state.passwordCheck} onChange={this.onChangePasswordCheck} placeholder="Re-enter Password" className="bg-gray-100 pl-2 w-full focus-within:ring-2 focus-within:ring-pink-dark outline-none rounded-r cursor-pointer"/>
				</div>
				{passwordCheckRequired && <ErrorNotice message={"Password Re-enter Must be Filled"} clearError={() => this.clearError(false)} />}
				{passwordMismatch && <ErrorNotice message={"Password Doesn't Match"} clearError={() => this.clearError(false)} />}
				
				<input type="submit" value="Daftar" className="button"/>
			</form>
			<Link to="/" className="text-white mt-5 font-semibold"><FaArrowLeft className="inline-block mr-2" />Kembali ke login</Link>
		</div>
		
		
      <UserContext.Provider value={{
          token: this.state.token,
          user: this.state.user
        }}/>
    </div>
    );
  }
}

export default withRouter(Register);