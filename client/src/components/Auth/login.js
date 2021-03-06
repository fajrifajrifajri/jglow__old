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
import { FaAt, FaLock, FaArrowRight } from 'react-icons/fa';

// Assets include
import logo from '../../Assets/img/Logo JGLOW.png';
import logoSaturated from '../../Assets/img/Logo JGLOW saturated.png';


class Login extends Component {
	// React.useContext
	 static contextType = UserContext
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			password: '',
			error: [],
			
			// Context states
			token: undefined,
			user: undefined
		}
		
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
	
	onSubmit(e) {
		e.preventDefault();
		
		const email = this.state.email;
		const password = this.state.password;
		const loginUser = {email, password};
		const _this = this;
		axios.post("/backend/users/masuk", loginUser)
		.then(function(res) {
			console.log(res);
			_this.setState({
				token: res.data.token,
				user: res.data.user
			});
			localStorage.setItem("auth-token", res.data.token);
			_this.props.history.push("/beranda");
		}).catch(function (err) {
			console.log(err.response.data.errors)
			_this.setState({error: err.response.data.errors})
		});
	};
	
	clearError() {
		console.log(this.state.error)
		this.setState({
			error: []
		});
	}
	
  render() {
	  
	let errorArray = this.state.error;
	let emailError = errorArray.some(obj => Object.keys(obj).includes("email"));
	let passwordError = errorArray.some(obj => Object.keys(obj).includes("password"));
	
	let emailInvalid = errorArray.some(obj => obj.email === "invalid");
	let emailRequired = errorArray.some(obj => obj.email === "required");
	let emailUnregistered = errorArray.some(obj => obj.user === "unregistered");
	let passwordRequired = errorArray.some(obj => obj.password === "required");
	let passwordWrong = errorArray.some(obj => obj.password === "wrong");
	
    return (
    <div id="login" className="flex bg-pink-light h-screen">
		<div className="m-auto flex flex-col">
			<img src={logoSaturated} className="w-9/12 m-auto mb-8" alt="logo saturated"/>
			<form onSubmit={this.onSubmit} className="bg-white border rounded-lg p-6 shadow-md">
				<div className="flex-col">
					<img src={logo} alt="logo" className="block m-auto"/>
					<h1 className="block m-auto text-center mb-4 text-2xl font-bold">PT. JGLOW BEAUTYCARE</h1>
				</div>
				{emailInvalid && <ErrorNotice message={"Email Invalid"} clearError={() => this.clearError(false)} />}
				{emailRequired && <ErrorNotice message={"Email Required"} clearError={() => this.clearError(false)} />}
				{emailUnregistered && <ErrorNotice message={"Email Unregistered"} clearError={() => this.clearError(false)} />}
				<div className={`flex bg-gray-100 rounded text-sm ${emailError && 'border border-red-200'}`}>
					<FaAt size={42} className="text-gray-400 p-3" />
					<input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="E-mail" className="form__control__auth"/>
				</div>
				{passwordRequired && <ErrorNotice message={"Password Required"} clearError={() => this.clearError(false)} />}
				{passwordWrong && <ErrorNotice message={"Password Wrong"} clearError={() => this.clearError(false)} />}
				<div className={`flex bg-gray-100 rounded text-sm mt-2 ${passwordError && 'border border-red-200'}`}>
					<FaLock size={42} className="text-gray-400 p-3" />
					<input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" className="form__control__auth"/>
				</div>
				
				<input type="submit" value="Log in" className="button"/>
			</form>
			{/*
			<Link to="/daftar" className="text-white ml-auto mt-3 font-semibold">Daftar Sebagai Agent<FaArrowRight className="inline-block ml-2" /></Link>
			<Link to="/konsultasi-konsumer" className="text-white ml-auto mt-3 font-semibold">Form Konsultasi<FaArrowRight className="inline-block ml-2" /></Link>
			*/}
		</div>
		
      <UserContext.Provider value={{
          token: this.state.token,
          user: this.state.user
        }}/>
    </div>
    );
  }
}

export default withRouter(Login);