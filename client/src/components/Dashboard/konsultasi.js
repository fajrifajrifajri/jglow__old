// Import React & Required libs
import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';
import { Table } from './_Main Components/table';

// Icons
import { FaChevronLeft, FaPlusSquare, FaTimes } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';

// SweetAlert 2
import Swal from 'sweetalert2';

class Konsultasi extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: [],
			konsultasiCount: 0,
			orderCount: 0,
			loadingData: true
		}
		
		this.deleteData = this.deleteData.bind(this);
		
		this.serverBaseURI = 'https://jglow.sgp1.digitaloceanspaces.com';
		
		this.columns = [
		{
			Header: '',
			id: 'index',
			accessor: (_row: any, i : number) => i + 1,
			maxWidth: 40
		},
		{
			Header: 'Nama',
			accessor: 'nama',
			maxWidth: 100
		},
		{
			Header: 'Alamat',
			accessor: 'alamat',
			minWidth: 150
		},
		{
			Header: 'No Telp & No Agent',
			accessor: 'noTelp',
			maxWidth: 100,
			Cell: cell => (
				<div>
					<p className="truncate">{cell.row.original.noTelp}</p>
					<p className="truncate font-bold">[{cell.row.original.noAgent}]</p>
					<a className="block" href={`https://wa.me/62${cell.row.original.noTelp.substring(1)}`}> <RiWhatsappFill size={20} className="text-green-400"/> </a>
				</div>
			  )
		},
		{
			Header: 'Spesifikasi Kulit',
			accessor: 'jenisKulit',
			minWidth: 200,
			Cell: cell => (
				<div>
					<p><span className="font-bold">Jenis Kulit: </span>{cell.row.original.jenisKulit}</p>
					<p><span className="font-bold">Kulit Sensitif: </span>{cell.row.original.kulitSensitif}</p>
					<p><span className="font-bold">Mudah Iritasi? </span>{cell.row.original.mudahIritasi}</p>
					<p><span className="font-bold">Pasien dalam keadaan Hamil/ Menyusui? </span>{cell.row.original.hamilDanMenyusui}</p>
					<p><span className="font-bold">Riwayat Skincare: </span>{cell.row.original.riwayatSkincare}</p>
				</div>
			  )
		},
		{
			Header: 'Kondisi',
			accessor: 'kondisiKeluhan',
			Cell: ({ cell }) => (
				<div>
					<p><span className="font-bold">Kondisi dan Keluhan: </span>{cell.row.original.kondisiKeluhan}</p>
					<p><span className="font-bold">Pengunaan ke- </span>{cell.row.original.penggunaanKe}</p>
				</div>
			  ),
		},
		{
			Header: 'Foto Agent',
			accessor: 'fotoAgent',
			maxWidth: 80,
			custom: true,
			Cell: ({ cell }) => (
				<img src={`${this.serverBaseURI}/${cell.row.original.fotoAgent}`} alt={cell.row.original.fotoAgent}/>
			  )
		  },
		  {
			Header: 'Foto Kulit',
			accessor: 'fotoKulitWajahDepan',
			maxWidth: 80,
			custom: true,
			Cell: ({ cell }) => (
				<>
					<img src={`${this.serverBaseURI}/${cell.row.original.fotoKulitWajahDepan}`} alt={cell.row.original.fotoKulitWajahDepan} className='mb-2'/>
					<img src={`${this.serverBaseURI}/${cell.row.original.fotoKulitWajahKiri}`} alt={cell.row.original.fotoKulitWajahKiri} className='mb-2'/>
					<img src={`${this.serverBaseURI}/${cell.row.original.fotoKulitWajahKanan}`} alt={cell.row.original.fotoKulitWajahKanan} className='mb-2'/>
				</>
			  )
		},
		{
		  Header: "Aksi",
		  accessor: "_id",
		  maxWidth: 95,
		  Cell: ({ cell }) => (
			<button key={cell.row.values._id} onClick={ () => { this.deleteData(cell.row.values._id) }} className="p-2 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-red-400 rounded-full">
			  <FaTimes />
			</button>
		  )
		}];
	}
	
	
	deleteData = (id) => {
		
		// Set Axios Default URL
		// var port = 5000;
		// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  
		
		Swal.fire({
		  title: 'Hapus data ini?',
		  text: "Data akan terhapus.",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Delete!'
		}).then((result) => {
		  if (result.isConfirmed) {
			Swal.fire(
			  'Deleted!',
			  'Data telah telah terhapus.',
			  'success'
			)
		
			axios.delete('/backend/konsultasi/'+id)
				.then(res => console.log(res.data));
		  }
		})
	}
	
	// Load table data
	async getData(prevState) {
		
		// Set Axios Default URL
		// var port = 5000;
		// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  
		
			try {
			  await axios.all([
			  axios
				.get("/backend/konsultasi/"),
			  axios
				.get("/backend/order/")
			  ])
			  .then(axios.spread((res1, res2) => {
				  // check if there's any update or data empty
				  // Because of JavaScript stupidity of [] === [] is false, so I have to stringify first.
				  if(JSON.stringify(this.state.data) === '[]' || JSON.stringify(prevState.data) !== JSON.stringify(res1.data)) {
					  console.log(this.state.data);
					  console.log(res1.data);
					  // count how many data
					  const konsultasiCount = Object.keys(res1.data).length;
					  const orderCount = Object.keys(res2.data).length;
					  this.setState({ 
						data: res1.data,
						konsultasiCount: konsultasiCount,
						orderCount: orderCount,
					  });
				  }
				  
				  // data is loaded
				  this.setState({ loadingData: false });
			  }));
			} catch (err) {
				console.log(err);
			}
	}
	
	componentDidMount () {
		if (this.state.loadingData) {
		  // if the result is not ready so you make the axios call
		  this.getData();
		}
	}
	
	componentDidUpdate (prevProps, prevState) {
	  this.getData(prevState);
	}
	
	
  render() {
    return (
    <div className="all__container">
		<div className="sidebar__container">
			<Sidebar/>
		</div>
		<div className="body__container">
			<div className="body__table__container">
				<div className="grid grid-cols-12 mb-8">
					<div className="col-start-8 col-span-4 mb-4">
						<h5 className="text-center">Konsultasi minggu ini</h5>
					</div>
					<div className="col-span-6">
						<Link to="/beranda" className="button--back">
							<FaChevronLeft size={20} className='icon--header' />
							<span>
								Konsultasi
							</span>
						</Link>
						<Link to="/konsultasi/buat-konsultasi" className="button--input">
							<FaPlusSquare size={20} className='icon--header' />
							<span>
								Input
							</span>
						</Link>
					</div>
					<div className="col-span-6 flex gap-x-1">
						<button className="flex-1 bg-yellow-400 p-2 font-bold border-2 border-black">{this.state.konsultasiCount} KONSULTASI</button>
						<button className="flex-1 bg-green-400 p-2 font-bold border-2 border-black">{this.state.orderCount} ORDER</button>
						<button className="flex-1 bg-red-400 p-2 font-bold border-2 border-black">0 CANCELLED</button>
					</div>
				</div>
				<Table 
					data={this.state.data}
					columns ={this.columns}
				/>
			</div>
		</div>
    </div>
    );
  }
}

export default Konsultasi;