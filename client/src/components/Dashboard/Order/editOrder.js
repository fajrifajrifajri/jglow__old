import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Select from 'react-select';


// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';

// Icons
import { FaChevronLeft } from 'react-icons/fa';

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default class EditKonsultasi extends Component {
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
		this.onChangeAgentSelected = this.onChangeAgentSelected.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		// Foto
		this.fotoAgent = React.createRef();
		this.fotoKulitWajahDepan = React.createRef();
		this.fotoKulitWajahKiri = React.createRef();
		this.fotoKulitWajahKanan = React.createRef();
		
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
			agents: undefined,
			agentSelected: undefined
		}
	}
	
	componentDidMount() {
		
		console.log(this.props.idKonsultasi);
		
		axios.get("/backend/konsultasi/"+this.props.idKonsultasi)
		.then(res => {
			console.log(res.data);
			
			const { nama_depan, nama_belakang, tanggal_lahir, selected_kelamin, alamat, no_telp,
					jenis_kulit, kulit_sensitif, mudah_iritasi, hamil_dan_menyusui, riwayat_skincare,
					kondisi_keluhan, penggunaan_ke, kode_agent } = res.data;
			
			this.setState({
				namaDepan: nama_depan,
				namaBelakang: nama_belakang,
				tanggalLahir: new Date(tanggal_lahir),
				selectedKelamin: selected_kelamin,
				alamat: alamat,
				noTelp: no_telp,
				jenisKulit: jenis_kulit,
				kulitSensitif: kulit_sensitif,
				mudahIritasi: mudah_iritasi,
				hamilDanMenyusui: hamil_dan_menyusui,
				riwayatSkincare: riwayat_skincare,
				kondisiKeluhan: kondisi_keluhan,
				penggunaanKe: penggunaan_ke,
				agentSelected: {
					label: kode_agent + ' - ' + nama_depan + ' ' +  nama_belakang,
					value: kode_agent
				}
			});
			this.getAgents();
			console.log(this.state.agentSelected);
		})
		.catch (err => {
			console.log(err);
		})
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
	
	onChangeAgentSelected = (option) => {
		this.setState({
			agentSelected: option
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
			
		const formData = new FormData();
		
		const { namaDepan, namaBelakang, tanggalLahir, selectedKelamin, alamat, noTelp, jenisKulit,
		kulitSensitif, mudahIritasi, hamilDanMenyusui, riwayatSkincare, kondisiKeluhan, penggunaanKe, agentSelected } =
		this.state;
		
		formData.append('namaDepan', namaDepan);
		formData.append('namaBelakang', namaBelakang);
		formData.append('tanggalLahir', tanggalLahir);
		formData.append('selectedKelamin', selectedKelamin);
		formData.append('alamat', alamat);
		formData.append('noTelp', noTelp);
		formData.append('jenisKulit', jenisKulit);
		formData.append('kulitSensitif', kulitSensitif);
		formData.append('mudahIritasi', mudahIritasi);
		formData.append('hamilDanMenyusui', hamilDanMenyusui);
		formData.append('riwayatSkincare', riwayatSkincare);
		formData.append('kondisiKeluhan', kondisiKeluhan);
		formData.append('penggunaanKe', penggunaanKe);
		formData.append('agentSelected', agentSelected.value);
		formData.append('fotoAgent', this.fotoAgent.current.files[0]);
		formData.append('fotoKulitWajahDepan', this.fotoKulitWajahDepan.current.files[0]);
		formData.append('fotoKulitWajahKiri', this.fotoKulitWajahKiri.current.files[0]);
		formData.append('fotoKulitWajahKanan', this.fotoKulitWajahKanan.current.files[0]);
		
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		
		const MySwal = withReactContent(Swal);
		
		console.log(this.props.idKonsultasi);
		
		axios.post('/backend/konsultasi/update/'+this.props.idKonsultasi, formData, config).then((res)  => { 
			console.log(res.data);
		
			MySwal.fire(  
			'Konsultasi telah diedit!',
			'Tinggal, tunggu distributor memproses ya!',
			'success'
			);
			
			this.props.onCloseModal();
			
		}).catch((err) => {
			console.log(err.response.data.message);
		});
		
		console.log(formData.get("namaDepan")+formData.get("namaBelakang"));
	}
	
	render() {
	return (
		<div className="body__modal__container">
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
					<label className="block mb-2">Tanggal Lahir: </label>
					<DatePicker
						className="form__control text-gray-400"
						selected={this.state.tanggalLahir}
						onChange={this.onChangeTanggalLahir}
						peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
					/>
				</div>
				<div className="form__group"> 
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
				<div className="form__group">
					<label className="block mb-2">Alamat: </label>
					<textarea className="form__control" value={this.state.alamat} onChange={this.onChangeAlamat}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">No Telp: </label>
					<input type="text" className="form__control" value={this.state.noTelp} onChange={this.onChangeNoTelp}/>
				</div>
				<div className="form__group"> 
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
				<div className="form__group"> 
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
				<div className="form__group"> 
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
				<div className="form__group"> 
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
				<div className="form__group">
					<label className="block mb-2">Riwayat Skincare : </label>
					<textarea className="form__control" value={this.state.riwayatSkincare} onChange={this.onChangeRiwayatSkincare}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">Kondisi dan keluhan saat ini : </label>
					<textarea className="form__control" value={this.state.kondisiKeluhan} onChange={this.onChangeKondisiKeluhan}/>
				</div>
				<div className="form__group">
					<label className="block mb-2">Penggunaan produk J Glow ke-: </label>
					<input className="form__control" value={this.state.penggunaanKe} onChange={this.onChangePenggunaanKe}/>
				</div>
				
				<div className="form__group">
				  <label className="block mb-2">
					Upload Bukti Screenshoot dengan Beauty Consultant
				  </label>
				  <div className="form__upload">
					<div className="space-y-1 text-center">
					  <svg className="form__upload--img" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
						<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					  </svg>
					  <div className="form__upload--file">
						<label htmlFor="file-upload">
						  <input type="file" className="form__control" ref={this.fotoAgent} name="fotoAgent"/>
						</label>
					  </div>
					  <p className="text-xs text-gray-500">
						PNG, JPG, JPEG up to 10MB
					  </p>
					</div>
				  </div>
				</div>
				
				
				<div className="form__group">
				  <label className="block mb-2">
					Foto kondisi kulit wajah tampak depan
				  </label>
				  <div className="form__upload">
					<div className="space-y-1 text-center">
					  <svg className="form__upload--img" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
						<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					  </svg>
					  <div className="form__upload--file">
						<label htmlFor="file-upload"  >
						  <input type="file" className="form__control" ref={this.fotoKulitWajahDepan} name="fotoKulitWajahDepan"/>
						</label>
					  </div>
					  <p className="text-xs text-gray-500">
						PNG, JPG, JPEG up to 10MB
					  </p>
					</div>
				  </div>
				</div>
				
				<div className="form__group">
				  <label className="block mb-2">
					Foto kondisi kulit wajah tampak samping kiri
				  </label>
				  <div className="form__upload">
					<div className="space-y-1 text-center">
					  <svg className="form__upload--img" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
						<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					  </svg>
					  <div className="form__upload--file">
						<label htmlFor="file-upload"  >
						  <input type="file" className="form__control" ref={this.fotoKulitWajahKiri} name="fotoKulitWajahKiri"/>
						</label>
					  </div>
					  <p className="text-xs text-gray-500">
						PNG, JPG, JPEG up to 10MB
					  </p>
					</div>
				  </div>
				</div>
				
				<div className="form__group">
				  <label className="block mb-2">
					Foto kondisi kulit wajah tampak samping kanan
				  </label>
				  <div className="form__upload">
					<div className="space-y-1 text-center">
					  <svg className="form__upload--img" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
						<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					  </svg>
					  <div className="form__upload--file">
						<label htmlFor="file-upload">
						  <input type="file" className="form__control" ref={this.fotoKulitWajahKanan} name="fotoKulitWajahKanan"/>
						</label>
					  </div>
					  <p className="text-xs text-gray-500">
						PNG, JPG, JPEG up to 10MB
					  </p>
					</div>
				  </div>
				</div>
				
				<div className="form__group">
					<label className="block mb-2">Kode Agent: </label>
					<Select
					  className={`my-4 rounded-t text-sm w-full border`}
					  value={this.state.agentSelected}
					  onChange={this.onChangeAgentSelected}
					  options={this.state.agents}
					  placeholder="Search..."
					/>
				</div>
					
				<div className="form__group">
					<input type="submit" value="Buat konsultasi" className="button"/>
				</div>
			</form>
		</div>
		)
	}
}