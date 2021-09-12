import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';

// Icons
import { FaChevronLeft } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default class CreateAgent extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNamaDepan = this.onChangeNamaDepan.bind(this);
		this.onChangeNamaBelakang = this.onChangeNamaBelakang.bind(this);
		this.onChangeAlamat = this.onChangeAlamat.bind(this);
		this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
		this.onRefreshKodeAgent = this.onRefreshKodeAgent.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			namaDepan: '',
			namaBelakang: '',
			alamat: '',
			noTelp: '',
			kodeAgent: '',
			email: '',
			password: '',
			passwordCheck: '',
			
			loadingSpin: false
		}
	}
	
	componentDidMount() {
		// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
		const Random5DigitString = Math.random().toString(36).substr(2, 5).toUpperCase();
		
		this.setState({
			kodeAgent: Random5DigitString
		});
	}
	
	onChangeNamaDepan(e) {
		this.setState({
			namaDepan: e.target.value
		});
	}
	
	onChangeNamaBelakang(e) {
		this.setState({
			namaBelakang: e.target.value
		});
	}
	
	onChangeAlamat(e) {
		this.setState({
			alamat: e.target.value
		});
	}
	
	onChangeNoTelp(e) {
		this.setState({
			noTelp: e.target.value
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
	
	onSubmit(e) {
		e.preventDefault();
		
		const agent = {
			namaDepan: this.state.namaDepan,
			namaBelakang: this.state.namaBelakang,
			alamat: this.state.alamat,
			noTelp: this.state.noTelp,
			kodeAgent: this.state.kodeAgent,
		}
		
		const user = {
			email: this.state.email,
			password: this.state.password,
			passwordCheck: this.state.passwordCheck,
			role: 'agent',
			kodeAgent: this.state.kodeAgent
		}
		
		const MySwal = withReactContent(Swal);
		
		axios.post("/backend/agent/add", agent)
		  .then(res1 => {
			  
			  // console.log(res1.data); 
			  
			  axios.post("/backend/users/daftar", user)
				.then(res2 => {
				  MySwal.fire(  
					'Agent telah ditambahkan!',
					'Tinggal, tunggu distributor memproses ya!',
					'success'
				  );
				}).catch(err => {
					console.log(err.response);
				});
			}).catch(err => {
				console.log(err.response);
			});
	}
	
	render() {
		let { kodeAgent, loadingSpin } = this.state;
		return (
		<div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
				<div className="body__form__container">
				<div className="flex">
					<Link to="/agent" className="button--back">
						<FaChevronLeft size={20} className="icon--header"/>
						<span>
							Tabel Agent
						</span>
					</Link>
					<div className="button--input">
						<span>
							TAMBAH AGENT
						</span>
					</div>
				</div>
				<form className="mt-10" onSubmit={this.onSubmit} autoComplete="off">
					<label className="block mb-2">Nama Lengkap: </label>
					<div className="form__group grid grid-cols-12 gap-2">
						<div className="col-span-6">
							<input type="text" className="form__control" value={this.state.namaDepan} onChange={this.onChangeNamaDepan}
							placeholder="Nama Depan"/>
							<small>Nama Depan</small>
						</div>
						<div className="col-span-6">
							<input type="text" className="form__control" value={this.state.namaBelakang} onChange={this.onChangeNamaBelakang} placeholder="Nama Belakang"/>
							<small>Nama Belakang</small>
						</div>
					</div>
					<div className="form__group"> 
						<label className="block mb-2">Alamat: </label>
						<input type="text" className="form__control" value={this.state.alamat} onChange={this.onChangeAlamat} placeholder="Alamat"/>
						<small>Alamat</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">No. Telp </label>
						<input type="text" className="form__control" value={this.state.noTelp} onChange={this.onChangeNoTelp} placeholder="No. Telp"/>
						<small>No. Telp</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Kode Agent: </label>
						<div className="grid grid-cols-12">
							<div className="col-span-8">
								<input type="text" className="form__control" value={this.state.kodeAgent} placeholder={`${kodeAgent}`} disabled/>
							</div>
							<div className="col-span-4">
								<button className="form__control text-white bg-pink-700 transform focus:translate-y-0.5" onClick={this.onRefreshKodeAgent}>
									<FiRefreshCcw className={`inline-block ${loadingSpin ? 'animate-spin' : ''}`} size={16}/> Refresh Kode Agent
								</button>
							</div>
						</div>
						<small>Kode. Agent</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Email: </label>
						<input type="text" className="form__control" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"/>
						<small>Email</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Password: </label>
						<input type="password" className="form__control" value={this.state.password} onChange={this.onChangePassword} placeholder="Password"/>
						<small>Password</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Re-enter Password: </label>
						<input type="password" className="form__control" value={this.state.passwordCheck} onChange={this.onChangePasswordCheck} placeholder="Re-enter Password"/>
						<small>Re-enter Password</small>
					</div>
					<div className="form__group">
						<input type="submit" value="Buat agent" className="button"/>
					</div>
				</form>
			</div>
		</div>
	</div>
		)
	}
}