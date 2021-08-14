import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';

// Icons
import { FaChevronLeft } from 'react-icons/fa';

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
			'Order telah dibuat!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
		}).catch((err) => {
			console.log(err.response.data);
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
				<Link to="/order" className="button--back">
					<FaChevronLeft size={30} className="m-auto inline-block mr-2"/>
					<span className="font-bold">
						Tabel Order
					</span>
				</Link>
				<h1 className="m-auto ml-4 inline-block text-4xl">FORMULIR ORDER PUSAT</h1>
			</div>
			<form className="mt-10" onSubmit={this.onSubmit}>
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
				</div>
				<div className="form__group">
					<label className="block mb-2">No Telp: </label>
					<input type="text" className="form__control" value={this.state.noTelp} onChange={this.onChangeNoTelp}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">No Agent: </label>
					<input type="text" className="form__control" value={this.state.noAgent} onChange={this.onChangeNoAgent}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">Order Product: </label>
					<input type="text" className="form__control" value={this.state.orderProduct} onChange={this.onChangeOrderProduct}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">Jumlah Order: </label>
					<input type="text" className="form__control" value={this.state.jumlahOrder} onChange={this.onChangeJumlahOrder}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">Option Pengiriman: </label>
					<input type="text" className="form__control" value={this.state.optionPengiriman} onChange={this.onChangeOptionPengiriman}/>
				</div>
				<div className="form__group">
					<input type="submit" value="Buat order" className="button"/>
				</div>
			</form>
		</div>
	</div>
</div>
		)
	}
}