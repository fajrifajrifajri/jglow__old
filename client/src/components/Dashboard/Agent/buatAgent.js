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

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default class CreateAgent extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNama = this.onChangeNama.bind(this);
		this.onChangeAlamat = this.onChangeAlamat.bind(this);
		this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
		this.onChangeKodeAgent = this.onChangeKodeAgent.bind(this);
		this.onChangeUserId = this.onChangeUserId.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			nama: '',
			alamat: '',
			noTelp: '',
			kodeAgent: '',
			userId: '',
			email: '',
			password: '',
		}
	}
	
	onChangeNama(e) {
		this.setState({
			nama: e.target.value
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
	
	onChangeKodeAgent(e) {
		this.setState({
			kodeAgent: e.target.value
		});
	}
	
	onChangeUserId(e) {
		this.setState({
		  userId: e.target.value
		});
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
		
		const agent = {
			nama: this.state.nama,
			alamat: this.state.alamat,
			noTelp: this.state.noTelp,
			kodeAgent: this.state.kodeAgent,
			userId: this.state.userId
		}
		
		const MySwal = withReactContent(Swal);
		
		axios.post('/agent/add', agent).then((res)  => { 
			console.log(res.data);
		
			MySwal.fire(  
			'Agent telah ditambahkan!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
		}).catch((err) => {
			console.log(err.response);
		});
	}
	
	render() {
		return (
		<div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
				<div className="body__second__container">
				<div className="flex">
					<Link to="/agent" className="button--back">
						<FaChevronLeft size={30} className="m-auto inline-block mr-2"/>
						<span className="font-bold">
							Tabel Agent
						</span>
					</Link>
					<h1 className="m-auto ml-4 inline-block text-4xl">TAMBAH AGENT (MANUAL)</h1>
				</div>
				<form className="mt-10" onSubmit={this.onSubmit}>
					<div className="form__group">
						<label className="block mb-2">Nama Lengkap: </label>
						<input type="text" className="form__control" value={this.state.nama} onChange={this.onChangeNama} placeholder="Nama Lengkap"/>
						<small>Nama Lengkap</small>
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
						<input type="text" className="form__control" value={this.state.kodeAgent} onChange={this.onChangeKodeAgent} placeholder="Kode. Agent"/>
						<small>Kode. Agent</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">UserId: </label>
						<input type="text" className="form__control" value={this.state.userId} onChange={this.onChangeUserId} placeholder="UserId"/>
						<small>UserId</small>
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
						<input type="submit" value="Buat agent" className="button"/>
					</div>
				</form>
			</div>
		</div>
	</div>
		)
	}
}