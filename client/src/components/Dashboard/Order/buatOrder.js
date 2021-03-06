import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

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
		this.onChangeOrderProduct = this.onChangeOrderProduct.bind(this);
		this.onChangeJumlahOrder = this.onChangeJumlahOrder.bind(this);
		this.onChangeOptionPengiriman = this.onChangeOptionPengiriman.bind(this);
		this.onChangeAgentSelected = this.onChangeAgentSelected.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			namaDepan: '',
			namaBelakang: '',
			alamat: '',
			noTelp: '',
			products: undefined,
			orderProduct: undefined,
			jumlahOrder: 0,
			optionPengiriman: '',
			agents: undefined,
			agentSelected: undefined
		}
	}
	
	componentDidMount() {
		this.getProducts();
		this.getAgents();
	}
	
	async getProducts() {
		
		const res = await axios.get('/backend/produk');
		const data = res.data;
		
		const products = data.map(d => ({
			label: d.nama_produk,
			value: d._id
		}))
		
		console.log(products);
		
		this.setState({ products: products })
		console.log(this.state.products);
	}
	
	async getAgents() {
		
		const res = await axios.get('/backend/agent');
		const data = res.data;
		
		const agents = data.map(d => ({
			label: d._id + ' - ' + d.nama_depan + ' ' +  d.nama_belakang,
			value: d._id
		}))
		
		console.log(agents);
		
		this.setState({ agents: agents })
		console.log(this.state.agents);
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
	
	onChangeOrderProduct = (option) => {
		// isMulti
		// const idProduct = option.map(a => a.value);
		this.setState({
			orderProduct: option
		});
	}
	
	onChangeJumlahOrder(e){
		this.setState({
			jumlahOrder: e.target.value
		});
	}
	
	onChangeOptionPengiriman(e) {
		this.setState({
			optionPengiriman: e.target.value
		});
	}
	
	onChangeAgentSelected = (option) => {
		this.setState({
			agentSelected: option
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const order = {
			namaDepan: this.state.namaDepan,
			namaBelakang: this.state.namaBelakang,
			alamat: this.state.alamat,
			noTelp: this.state.noTelp,
			kodeProduk: this.state.orderProduct,
			jumlahOrder: this.state.jumlahOrder,
			optionPengiriman: this.state.optionPengiriman,
			kodeAgent: this.state.agentSelected.value,
		}
		
		axios.post('/backend/order/add', order).then((res)  => { 
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
		
		const customStyles = {
			control: (base, state) => ({
				...base,
				background: 'white',
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
			<Header />
				<div className="body__form__container">
					<div className="flex">
						<Link to="/order" className="button--back">
							<FaChevronLeft size={20} className="icon--header"/>
							<span>
								Tabel Order
							</span>
						</Link>
						<div className="button--input">
							<span>
								FORMULIR ORDER PUSAT
							</span>
						</div>
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
							<label className="block mb-2">Kode Agent: </label>
							<Select
							  className={`my-4 rounded-t text-sm w-full border`}
							  onChange={this.onChangeAgentSelected}
							  options={this.state.agents}
							  placeholder="Search..."
							/>
						</div>
						
						<div className="form__group">
							<label className="block mb-2">Order Produk: </label>
							<Select
							  className={`my-4 rounded-t text-sm w-full border`}
							  styles={customStyles}
							  onChange={this.onChangeOrderProduct}
							  options={this.state.products}
							/>
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