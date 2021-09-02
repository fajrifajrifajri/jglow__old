// Import React & Required libs
import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Table } from '../_Main Components/table';

// Icons
import { RiWhatsappFill } from 'react-icons/ri';

// SweetAlert 2
import Swal from 'sweetalert2';

class Laporan3Bulan extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dataKonsultasi: [],
			dataOrder: [],
			loadingData: true
		}
		
		this.serverBaseURI = 'https://jglow.sgp1.digitaloceanspaces.com';
		
		this.columnsKonsultasi = [
		{
			Header: '',
			id: 'index',
			accessor: (_row: any, i : number) => i + 1,
			maxWidth: 40
		},
		{
			Header: 'Nama',
			accessor: 'nama',
			maxWidth: 120
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
		}]
		
		this.columnsOrder = [
			{
				Header: 'Nama',
				accessor: 'nama'
			},
			{
				Header: 'Alamat',
				accessor: 'alamat'
			},
			{
				Header: 'No Telp & No Agent',
				accessor: 'noTelp',
				Cell: cell => (
					<div>
						<p>{cell.row.original.noTelp}</p>
						<p className="font-bold">[{cell.row.original.noAgent}]</p>
					</div>
				  )
			},
			{
				Header: 'Order Product',
				accessor: 'orderProduct'
			},
			{
				Header: 'Jumlah Order',
				accessor: 'jumlahOrder'
			},
			{
				Header: 'Option Pengiriman',
				accessor: 'optionPengiriman'
			}
		];
	}
	
	// Load table data
	async getData(prevState) {
			try {
			 await axios.all([
			  axios
				.get("/backend/laporan-harian/konsultasi/"),
			  axios
				.get("/backend/laporan-harian/order/")
			  ])
			  .then(axios.spread((res1, res2) => {
				  // check if there's any update or data empty
				  // Because of JavaScript stupidity of [] === [] is false, so I have to stringify first.
				  if(JSON.stringify(this.state.dataKonsultasi) === '[]' || 
				  JSON.stringify(prevState.dataKonsultasi) !== JSON.stringify(res1.data) || 
				  JSON.stringify(this.state.dataOrder) === '[]' || 
				  JSON.stringify(prevState.dataOrder) !== JSON.stringify(res2.data)) {
					  
					console.log(res1.data);
					console.log(res2.data);
					this.setState({ 
						dataKonsultasi: res1.data,
						dataOrder: res2.data
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
				<div className="bg-white min-h-screen rounded-tl-lg p-20">
					<div className="mb-12">
						<h1 className="mb-12 text-3xl font-bold text-center">Laporan Konsultasi Minggu ini</h1>
						<Table 
							data={this.state.dataKonsultasi}
							columns ={this.columnsKonsultasi}
						/>
						<button className="button">EXPORT EXCEL</button>
					</div>
					<div className="mb-12">
						<h1 className="mb-12 text-3xl font-bold text-center">Laporan Konsultasi Minggu ini</h1>
						<Table 
							data={this.state.dataOrder}
							columns ={this.columnsOrder}
						/>
						<button className="button">EXPORT EXCEL</button>
					</div>
				</div>
			</div>
		</div>
	  );
  }
}

export default Laporan3Bulan;