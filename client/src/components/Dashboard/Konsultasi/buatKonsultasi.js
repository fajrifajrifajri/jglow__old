import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
import withReactContent from 'sweetalert2-react-content'

export default class CreateKonsultasi extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNamaDepan = this.onChangeNamaDepan.bind(this);
		this.onChangeNamaBelakang = this.onChangeNamaBelakang.bind(this);
		this.onChangeTanggalLahir = this.onChangeTanggalLahir.bind(this);
		this.onChangeKelamin = this.onChangeKelamin.bind(this);
		this.onChangeAlamat = this.onChangeAlamat.bind(this);
		this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
		this.onChangeJenisKulit = this.onChangeJenisKulit.bind(this);
		this.onChangeKulitSensitif = this.onChangeKulitSensitif.bind(this);
		this.onChangeMudahIritasi = this.onChangeMudahIritasi.bind(this);
		this.onChangeHamilDanMenyusui = this.onChangeHamilDanMenyusui.bind(this);
		this.onChangeRiwayatSkincare = this.onChangeRiwayatSkincare.bind(this);
		this.onChangeKondisiKeluhan = this.onChangeKondisiKeluhan.bind(this);
		this.onChangePenggunaanKe = this.onChangePenggunaanKe.bind(this);
		this.onChangeNoAgent = this.onChangeNoAgent.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		// Foto
		this.fotoAgent = React.createRef();
		this.fotoKulit = React.createRef();
		
		this.state = {
			namaDepan: '',
			namaBelakang: '',
			tanggalLahir: new Date(),
			selectedKelamin: '',
			alamat: '',
			noTelp: '',
			jenisKulit: '',
			kulitSensitif: '',
			mudahIritasi: '',
			hamilDanMenyusui: '',
			riwayatSkincare: '',
			kondisiKeluhan: '',
			penggunaanKe: '',
			noAgent: '',
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
	
	onChangeTanggalLahir(date) {
		this.setState({
			tanggalLahir: date
		});
	}
	
	onChangeKelamin(e) {
		this.setState({
		  selectedKelamin: e.target.value
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
	
	onChangeJenisKulit(e) {
		this.setState({
			jenisKulit: e.target.value
		});
	}
	
	onChangeKulitSensitif(e) {
		this.setState({
			kulitSensitif: e.target.value
		});
	}
	
	onChangeMudahIritasi(e) {
		this.setState({
			mudahIritasi: e.target.value
		});
	}
	
	onChangeHamilDanMenyusui(e) {
		this.setState({
			hamilDanMenyusui: e.target.value
		});
	}
	
	onChangeRiwayatSkincare(e) {
		this.setState({
			riwayatSkincare: e.target.value
		});
	}
	
	onChangeKondisiKeluhan(e) {
		this.setState({
			kondisiKeluhan: e.target.value
		});
	}
	
	onChangePenggunaanKe(e) {
		this.setState({
			penggunaanKe: e.target.value
		});
	}
	
	onChangeNoAgent(e) {
		this.setState({
			noAgent: e.target.value
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		const formData = new FormData();
		
		const nama = this.state.namaDepan + ' ' + this.state.namaBelakang;
		
		formData.append('nama',nama);
		formData.append('tanggalLahir',this.state.tanggalLahir);
		formData.append('selectedKelamin',this.state.selectedKelamin);
		formData.append('alamat',this.state.alamat);
		formData.append('noTelp',this.state.noTelp);
		formData.append('jenisKulit',this.state.jenisKulit);
		formData.append('kulitSensitif',this.state.kulitSensitif);
		formData.append('mudahIritasi',this.state.mudahIritasi);
		formData.append('hamilDanMenyusui',this.state.hamilDanMenyusui);
		formData.append('riwayatSkincare',this.state.riwayatSkincare);
		formData.append('kondisiKeluhan',this.state.kondisiKeluhan);
		formData.append('penggunaanKe',this.state.penggunaanKe);
		formData.append('fotoAgent',this.fotoAgent.current.files[0]);
		formData.append('fotoKulit',this.fotoKulit.current.files[0]);
		formData.append('noAgent',this.state.noAgent);
		
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		
		const MySwal = withReactContent(Swal);
		
		axios.post('http://localhost:5000/konsultasi/add', formData, config).then((res)  => { 
			console.log(res.data);
		
			MySwal.fire(  
			'Konsultasi telah dibuat!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
		}).catch((err) => {
			console.log(err.response);
		});
		
		console.log(formData.get("nama"));
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
				<Link to="/konsultasi" className="bg-pink-dark text-white text-xl py-2 pl-4 pr-6 rounded-full">
					<FontAwesomeIcon icon={faChevronLeft} className='fa-lg w-16 mr-2' />
					<span className="font-bold">
						Tabel Konsultasi
					</span>
				</Link>
				<h1 className="m-auto ml-4 inline-block text-4xl">FORMULIR KONSULTASI [ADMIN]</h1>
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
						<label className="block mb-2">Tanggal Lahir: </label>
						<DatePicker
							className="form-control text-gray-400"
							selected={this.state.tanggalLahir}
							onChange={this.onChangeTanggalLahir}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
						/>
					</div>
					<div className="form-group"> 
						<label className="block mb-2">Kelamin </label>
						<label className="block mb-1">
							<input type="radio" value="Perempuan" 
							checked={this.state.selectedKelamin === "Perempuan"} 
							onChange={this.onChangeKelamin}
							name="kelamin" /> Perempuan
						</label>
						<label className="block mb-1">
							<input type="radio" value="Laki-laki" 
							checked={this.state.selectedKelamin === "Laki-laki"} 
							onChange={this.onChangeKelamin}
							name="kelamin" /> Laki-laki
						</label>
					</div>
					<div className="form-group">
						<label className="block mb-2">Alamat: </label>
						<textarea className="form-control" value={this.state.alamat} onChange={this.onChangeAlamat}/>
					</div>
					<div className="form-group">
						<label className="block mb-2">No Telp: </label>
						<input type="text" className="form-control" value={this.state.noTelp} onChange={this.onChangeNoTelp}/>
					</div>
					<div className="form-group"> 
						<label className="block mb-2">
							Jenis Kulit:
						</label>
						<label className="block mb-1">
							<input
								name="jenisKulit"
								type="radio"  value="Kering" 
								checked={this.state.jenisKulit === "Kering"}
								onChange={this.onChangeJenisKulit} /> Kering
						</label>
						<label className="block mb-1">
							<input
								name="jenisKulit"
								type="radio" value="Berminyak" 
								checked={this.state.jenisKulit === "Berminyak"}
								onChange={this.onChangeJenisKulit} /> Berminyak
						</label>
						<label className="block mb-1">
							<input
								name="jenisKulit"
								type="radio" value="Kombinasi" 
								checked={this.state.jenisKulit === "Kombinasi"}
								onChange={this.onChangeJenisKulit} /> Kombinasi
						</label>
						<label className="block mb-1">
							<input
								name="jenisKulit"
								type="radio" value="Normal" 
								checked={this.state.jenisKulit === "Normal"}
								onChange={this.onChangeJenisKulit} /> Normal
						</label>
					</div>
					<div className="form-group"> 
						<label className="block mb-2">
							Kulit Sensitif? (mudah memerah jika terkena sinar matahari atau bahan yang mengandung alkohol)
						</label>
						<label className="block mb-1">
							<input
								name="kulitSensitif" 
								type="radio" value="ya"
								checked={this.state.kulitSensitif === "ya"}
								onChange={this.onChangeKulitSensitif} /> Ya, kulit saya sensitif
						</label>
						<label className="block mb-1">
							<input
								name="kulitSensitif"
								type="radio" value="tidak"
								checked={this.state.kulitSensitif === "tidak"}
								onChange={this.onChangeKulitSensitif} /> Tidak
						</label>
					</div>
					<div className="form-group"> 
						<label className="block mb-2">
							Mudah Iritasi? (Kulit terasa gatal, perih atau mudah mengelupas) 
						</label>
						<label className="block mb-1">
							<input
								name="mudahIritasi"
								type="radio" value="ya"
								checked={this.state.mudahIritasi === "ya"}
								onChange={this.onChangeMudahIritasi} /> Ya, kulit saya Mudah Iritasi
						</label>
						<label className="block mb-1">
							<input
								name="mudahIritasi"
								type="radio" value="tidak"
								checked={this.state.mudahIritasi === "tidak"}
								onChange={this.onChangeMudahIritasi} /> Tidak
						</label>
					</div>
					<div className="form-group"> 
						<label className="block mb-2">
							Pasien dalam keadaan Hamil / Menyusui
						</label>
						<label className="block mb-1">
							<input
								name="hamilDanMenyusui"
								type="radio" value="ya"
								checked={this.state.hamilDanMenyusui === "ya"}
								onChange={this.onChangeHamilDanMenyusui} /> Ya, saya dalam keadaam Hamil dan Menyusui
						</label>
						<label className="block mb-1">
							<input
								name="hamilDanMenyusui"
								type="radio" value="tidak"
								checked={this.state.hamilDanMenyusui === "tidak"}
								onChange={this.onChangeHamilDanMenyusui} /> Tidak
						</label>
					</div>
					<div className="form-group">
						<label className="block mb-2">Riwayat Skincare : </label>
						<textarea className="form-control" value={this.state.riwayatSkincare} onChange={this.onChangeRiwayatSkincare}/>
					</div>
					<div className="form-group">
						<label className="block mb-2">Kondisi dan keluhan saat ini : </label>
						<textarea className="form-control" value={this.state.kondisiKeluhan} onChange={this.onChangeKondisiKeluhan}/>
					</div>
					<div className="form-group">
						<label className="block mb-2">Penggunaan produk J Glow ke-: </label>
						<input className="form-control" value={this.state.penggunaanKe} onChange={this.onChangePenggunaanKe}/>
					</div>
					
					<div className="form-group">
					  <label className="block mb-2">
						Foto Agent: 
					  </label>
					  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
						<div className="space-y-1 text-center">
						  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						  </svg>
						  <div className="flex text-sm text-gray-600">
							<label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
							  <input type="file" className="form-control" ref={this.fotoAgent} name="fotoAgent"/>
							</label>
						  </div>
						  <p className="text-xs text-gray-500">
							PNG, JPG, GIF up to 10MB
						  </p>
						</div>
					  </div>
					</div>
					
					
					<div className="form-group">
					  <label className="block mb-2">
						Foto Kulit: 
					  </label>
					  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
						<div className="space-y-1 text-center">
						  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						  </svg>
						  <div className="flex text-sm text-gray-600">
							<label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
							  <input type="file" className="form-control" ref={this.fotoKulit} name="fotoKulit"/>
							</label>
						  </div>
						  <p className="text-xs text-gray-500">
							PNG, JPG, GIF up to 10MB
						  </p>
						</div>
					  </div>
					</div>
					<div className="form-group">
						<label className="block mb-2">No Agent: </label>
						<input type="text" className="form-control" value={this.state.noAgent} onChange={this.onChangeNoAgent}/>
					</div>
					<div className="form-group">
						<input type="submit" value="Buat konsultasi" className="hover:bg-green-700 bg-green-300 text-white w-full py-4 cursor-pointer duration-500"/>
					</div>
				</form>
			</div>
		</div>
	</div>
		)
	}
}