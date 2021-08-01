import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';


// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// SweetAlert 2
import Swal from 'sweetalert2';

export default class CreateOrder extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNamaDepan = this.onChangeNamaDepan.bind(this);
		this.onChangeNamaBelakang = this.onChangeNamaBelakang.bind(this);
		this.onChangeAlamat = this.onChangeAlamat.bind(this);
		this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
		this.onChangeNoAgent = this.onChangeNoAgent.bind(this);
		this.onChangeOrderProduct = this.onChangeOrderProduct.bind(this);
		this.onChangeJumlahOrder = this.onChangeJumlahOrder.bind(this);
		this.onChangeOptionPengiriman = this.onChangeOptionPengiriman.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			namaDepan: '',
			namaBelakang: '',
			alamat: '',
			noTelp: '',
			noAgent: '',
			orderProduct: '',
			jumlahOrder: 0,
			optionPengiriman: '',
		}
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
	
	onChangeNoAgent(e) {
		this.setState({
			noAgent: e.target.value
		});
	}
	
	onChangeOrderProduct(e) {
		this.setState({
			orderProduct: e.target.value
		});
	}
	
	onChangeJumlahOrder(e) {
		this.setState({
			jumlahOrder: e.target.value
		});
	}
	
	onChangeOptionPengiriman(e) {
		this.setState({
			optionPengiriman: e.target.value
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const nama = this.state.namaDepan + ' ' + this.state.namaBelakang;
		
		const order = {
			nama: nama,
			alamat: this.state.alamat,
			noTelp: this.state.noTelp,
			orderProduct: this.state.orderProduct,
			jumlahOrder: this.state.jumlahOrder,
			optionPengiriman: this.state.optionPengiriman,
			noAgent: this.state.noAgent,
		}
		
		axios.post('/order/add', order).then((res)  => { 
		console.log(res.data);
		
			Swal.fire(  
			'Konsultasi telah dibuat!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
		}).catch((err) => {
			console.log(err.response.data);
		});
		
		/*
		const formData = new FormData();
		
		formData.append('nama',nama);
		formData.append('alamat',this.state.alamat);
		formData.append('noTelp',this.state.noTelp);
		formData.append('orderProduct',this.state.orderProduct);
		formData.append('jumlahOrder',this.state.jumlahOrder);
		formData.append('optionPengiriman',this.state.optionPengiriman);
		formData.append('noAgent',this.state.noAgent);
		
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		
		
		axios.post('http://localhost:5000/order/add', formData, config).then((res)  => { 
		console.log(res.data);
		
			Swal.fire(  
			'Konsultasi telah dibuat!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
		}).catch((err) => {
			console.log(err.response.data);
		});
		
		console.log(formData.get("nama"));
		*/
	}
	
	render() {
		return (
		
    <div className="grid grid-cols-12">
		<div className="col-span-2">
			<Sidebar/>
		</div>
		<div className="bg-layout col-span-10 bg-gray-100">
			<Header/>
			<div className="bg-white min-h-screen rounded-tl-lg ml-12 p-12">
			<div className="flex">
				<Link to="/order" className="bg-pink-dark text-white text-xl py-2 pl-4 pr-6 rounded-full">
					<FontAwesomeIcon icon={faChevronLeft} className='fa-lg w-16 mr-2' />
					<span className="font-bold">
						Tabel Order
					</span>
				</Link>
				<h1 className="m-auto ml-4 inline-block text-4xl">FORMULIR ORDER PUSAT</h1>
			</div>
			<form className="mt-10" onSubmit={this.onSubmit}>
				<label className="block mb-2">Nama Lengkap: </label>
					<div className="form-group grid grid-cols-12 gap-2">
						<div className="col-span-6">
							<input type="text" className="form-control" value={this.state.namaDepan} onChange={this.onChangeNamaDepan}
							placeholder="Nama Depan"/>
							<small>Nama Depan</small>
						</div>
						<div className="col-span-6">
							<input type="text" className="form-control" value={this.state.namaBelakang} onChange={this.onChangeNamaBelakang} placeholder="Nama Belakang"/>
							<small>Nama Belakang</small>
						</div>
				</div>
				<div className="form-group">
					<label className="block mb-2">Alamat: </label>
					<input type="text" className="form-control" value={this.state.alamat} onChange={this.onChangeAlamat} placeholder="Alamat"/>
				</div>
				<div className="form-group">
					<label className="block mb-2">No Telp: </label>
					<input type="text" className="form-control" value={this.state.noTelp} onChange={this.onChangeNoTelp}/>
				</div>
				<div className="form-group">
					<label className="block mb-2">No Agent: </label>
					<input type="text" className="form-control" value={this.state.noAgent} onChange={this.onChangeNoAgent}/>
				</div>
				<div className="form-group">
					<label className="block mb-2">Order Product: </label>
					<input type="text" className="form-control" value={this.state.orderProduct} onChange={this.onChangeOrderProduct}/>
				</div>
				<div className="form-group">
					<label className="block mb-2">Jumlah Order: </label>
					<input type="text" className="form-control" value={this.state.jumlahOrder} onChange={this.onChangeJumlahOrder}/>
				</div>
				<div className="form-group">
					<label className="block mb-2">Option Pengiriman: </label>
					<input type="text" className="form-control" value={this.state.optionPengiriman} onChange={this.onChangeOptionPengiriman}/>
				</div>
				<div className="form-group">
					<input type="submit" value="Buat order" className="hover:bg-green-700 bg-green-300 text-white w-full py-4 cursor-pointer duration-500"/>
				</div>
			</form>
		</div>
	</div>
</div>
		)
	}
}