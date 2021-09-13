import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';

// Icons
import { FaChevronLeft } from 'react-icons/fa';

// SweetAlert 2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

// React-select Creatable
const createOption = (label: string, id) => ({
  label,
  value: id,
});

// Set Axios Default URL
// var port = 5000;
// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  

export default class CreateProduk extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeNamaProduk = this.onChangeNamaProduk.bind(this);
		this.onChangeHarga = this.onChangeHarga.bind(this);
		this.onChangeStok = this.onChangeStok.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleCreate = this.onHandleCreate.bind(this);
		
		// Foto
		this.gambarProduk = React.createRef();
		
		this.state = {
			namaProduk: '',
			harga: '',
			stok: '',
			
			// React Select
			selectOptions: [],
			kategoriId: undefined,
			isLoadingSelect: false,
		}
	}
	
	async getOptions() {
		
		const res = await axios.get('/backend/produk/kategori');
		const data = res.data;
		
		const options = data.map(d => ({
			label: d.nama_kategori,
			value: d._id
		}))
		
		this.setState({ selectOptions: options })
	}
	
	onHandleChange = (newValue: any, actionMeta: any) => {
		console.group('Value Changed');
		console.log(newValue);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
		
		// Action delete: kategori
		if( actionMeta.action === 'clear' ) {
			const id = this.state.kategoriId.value;
			const options = this.state.selectOptions;
			// Filter (delete) the selected option
			const newOptions = options.filter(function (obj) {
				return obj.value !== id;
			});
			Swal.fire({
			  title: 'Hapus data ini?',
			  text: "Data akan terhapus.",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Delete!'
			}).then((result) => {
			  // Fired if yes
			  if (result.isConfirmed) {
				this.setState({ selectOptions: newOptions })
				axios.delete('/backend/produk/kategori/'+id)
					.then(res => console.log(res.data));
				Swal.fire(
				  'Deleted!',
				  'Data telah telah terhapus.',
				  'success'
				);
			  }
			})
		}
		this.setState({ kategoriId: newValue });
	};
	
	onHandleCreate = (inputValue: any) => {
		this.setState({ isLoadingSelect: true });
		console.group('Option created');
		console.log('Wait a moment...');
		setTimeout(() => {
			const { selectOptions } = this.state;

			const produk = {
				namaKategori: inputValue
			}
			  
			axios.post('/backend/produk/add-kategori', produk).then((res)  => { 
				// Value kategori baru dan ID nya
				const newOption = createOption(inputValue, res.data.id);
				
				this.setState({
					isLoadingSelect: false,
					selectOptions: [...selectOptions, newOption],
					kategoriId: inputValue,
				});
				
				console.log(this.state.kategoriId)
				
				console.log(newOption);
				console.groupEnd();
			}).catch((err) => {
				console.log(err.response);
			});
		}, 1000);
	};
	
	componentDidMount(){
      this.getOptions()
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
	
	onSubmit(e) {
		e.preventDefault();
		
		const formData = new FormData();
		
		formData.append('namaProduk',this.state.namaProduk);
		formData.append('harga',this.state.harga);
		formData.append('stok',this.state.stok);
		formData.append('kategoriId',this.state.kategoriId.value);
		formData.append('gambarProduk',this.gambarProduk.current.files[0]);
		
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		
		const MySwal = withReactContent(Swal);
		
		axios.post('/backend/produk/add', formData, config).then((res)  => { 
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
			<Header />
				<div className="body__form__container">
				<div className="flex">
					<Link to="/produk" className="button--back">
						<FaChevronLeft size={20} className="icon--header"/>
						<span>
							Tabel Produk
						</span>
					</Link>
					<div className="button--input">
						<span>
							TAMBAH PRODUK
						</span>
					</div>
				</div>
				<form className="mt-10" onSubmit={this.onSubmit}>
				
					<div className="form__group">
					  <label className="block mb-2">
						Upload Gambar Produk
					  </label>
					  <div className="form__upload">
						<div className="space-y-1 text-center">
						  <svg className="form__upload--img" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						  </svg>
						  <div className="form__upload--file">
							<label htmlFor="file-upload">
							  <input type="file" className="form__control" ref={this.gambarProduk} name="gambarProduk"/>
							</label>
						  </div>
						  <p className="text-xs text-gray-500">
							PNG, JPG, JPEG up to 10MB
						  </p>
						</div>
					  </div>
					</div>
				
					<div className="form__group">
						<label className="block mb-2">Nama Produk: </label>
						<input type="text" className="form__control" value={this.state.namaProduk} onChange={this.onChangeNamaProduk} placeholder="Nama Produk"/>
						<small>Nama Produk</small>
					</div>
					
					<div className="form__group"> 
						<label className="block mb-2">Kategori: </label>
						<CreatableSelect
							isClearable
							isDisabled={this.state.isLoadingSelect}
							isLoading={this.state.isLoadingSelect}
							onChange={this.onHandleChange}
							onCreateOption={this.onHandleCreate}
							options={this.state.selectOptions}
							value={this.state.kategoriId}
						  />
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