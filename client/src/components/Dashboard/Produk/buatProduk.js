import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// Icons
import { FaChevronLeft } from 'react-icons/fa';

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default class CreateProduk extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNamaProduk = this.onChangeNamaProduk.bind(this);
		this.onChangeHarga = this.onChangeHarga.bind(this);
		this.onChangeStok = this.onChangeStok.bind(this);
		this.onChangeKategoriId = this.onChangeKategoriId.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			namaProduk: '',
			harga: '',
			stok: '',
			kategoriId: '',
		}
	}
	
	onChangeNamaProduk(e) {
		this.setState({
			namaProduk: e.target.value
		});
	}
	
	onChangeHarga(e) {
		this.setState({
			harga: e.target.value
		});
	}
	
	onChangeStok(e) {
		this.setState({
			stok: e.target.value
		});
	}
	
	onChangeKategoriId(e) {
		this.setState({
		  kategoriId: e.target.value
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const produk = {
			namaProduk: this.state.namaProduk,
			harga: this.state.harga,
			stok: this.state.stok,
			kategoriId: this.state.kategoriId
		}
		
		const MySwal = withReactContent(Swal);
		
		axios.post('/produk/add', produk).then((res)  => { 
			console.log(res.data);
		
			MySwal.fire(  
			'Produk telah ditambahkan!',
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
				<Header/>
				<div className="body__second__container">
				<div className="flex">
					<Link to="/produk" className="button--back">
						<FaChevronLeft size={30} className="m-auto inline-block mr-2"/>
						<span className="font-bold">
							Tabel Produk
						</span>
					</Link>
					<h1 className="m-auto ml-4 inline-block text-4xl">TAMBAH PRODUK</h1>
				</div>
				<form className="mt-10" onSubmit={this.onSubmit}>
					<div className="form__group">
						<label className="block mb-2">Nama Produk: </label>
						<input type="text" className="form__control" value={this.state.namaProduk} onChange={this.onChangeNamaProduk} placeholder="Nama Produk"/>
						<small>Nama Produk</small>
					</div>
					<div className="form__group"> 
						<label className="block mb-2">Kategori: </label>
						<input type="text" className="form__control" value={this.state.kategoriId} onChange={this.onChangeKategoriId} placeholder="Kategori"/>
						<small>Kategori</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Harga </label>
						<input type="text" className="form__control" value={this.state.harga} onChange={this.onChangeHarga} placeholder="Harga"/>
						<small>Harga</small>
					</div>
					<div className="form__group">
						<label className="block mb-2">Stok: </label>
						<input type="text" className="form__control" value={this.state.stok} onChange={this.onChangeStok} placeholder="Stok"/>
						<small>Stok</small>
					</div>
					<div className="form__group">
						<input type="submit" value="Buat produk" className="button"/>
					</div>
				</form>
			</div>
		</div>
	</div>
		)
	}
}