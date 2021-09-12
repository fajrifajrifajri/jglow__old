// Import React & Required libs
import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';
import ReactExport from "react-export-excel";

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';
import { Header } from '../_Main Components/header';
import { Table } from '../_Main Components/table';

// Icons
import { RiWhatsappFill } from 'react-icons/ri';

// SweetAlert 2
import Swal from 'sweetalert2';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// Set Axios Default URL
var port = 5000;
axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  

class LaporanMingguan extends Component {
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
			accessor: (_row: any, i : number) => i + 1 + '.',
			maxWidth: 40
		},
		{
			Header: 'Nama',
			accessor: 'nama',
			Cell: cell => (
				<p>{cell.row.original.nama_depan} {cell.row.original.nama_belakang}</p>
			),
			maxWidth: 100
		},
		{
			Header: 'Alamat',
			accessor: 'alamat',
			minWidth: 150
		},
		{
			Header: 'No Telp & No Agent',
			accessor: 'no_telp',
			maxWidth: 100,
			Cell: cell => (
				<div>
					<p className="truncate">{cell.row.original.no_telp}</p>
					<p className="truncate font-bold">[{cell.row.original.kode_agent}]</p>
					<a className="block" href={`https://wa.me/62${(cell.row.original.no_telp ? cell.row.original.no_telp.substring(1) : '')}`}> <RiWhatsappFill size={20} className="text-green-400"/> </a>
				</div>
			  )
		},
		{
			Header: 'Spesifikasi Kulit',
			accessor: 'jenis_kulit',
			minWidth: 200,
			Cell: cell => (
				<div>
					<p><span className="font-bold">Jenis Kulit: </span>{cell.row.original.jenis_kulit}</p>
					<p>
						<span className="font-bold">Kulit Sensitif: </span>
						<span className={`px-1 py-0.5 rounded-lg text-xs text-white ${cell.row.original.mudah_iritasi === 'Ya' ? 'bg-green-400' : 'bg-red-400'}`}>
							{cell.row.original.kulit_sensitif}
						</span>
					</p>
					<p>
						<span className="font-bold">Mudah Iritasi? </span>
						<span className={`px-1 py-0.5 rounded-lg text-xs text-white ${cell.row.original.mudah_iritasi === 'Ya' ? 'bg-green-400' : 'bg-red-400'}`}>
							{cell.row.original.mudah_iritasi}
						</span>
					</p>
					<p>
						<span className="font-bold">Pasien dalam keadaan Hamil/ Menyusui? </span>
						<span className={`px-1 py-0.5 rounded-lg text-xs text-white ${cell.row.original.hamil_dan_menyusui === 'Ya' ? 'bg-green-400' : 'bg-red-400'}`}>
							{cell.row.original.hamil_dan_menyusui}
						</span>
					</p>
					<p><span className="font-bold">Riwayat Skincare: </span>{cell.row.original.riwayat_skincare}</p>
				</div>
			  )
		},
		{
			Header: 'Kondisi',
			accessor: 'kondisi_keluhan',
			Cell: ({ cell }) => (
				<div>
					<p><span className="font-bold">Kondisi dan Keluhan: </span>{cell.row.original.kondisi_keluhan}</p>
					<p><span className="font-bold">Pengunaan ke- </span>{cell.row.original.penggunaan_ke}</p>
				</div>
			  ),
		},
		{
			Header: 'Foto Agent',
			accessor: 'foto_agent',
			maxWidth: 80,
			custom: true,
			Cell: ({ cell }) => (
				<img src={`${this.serverBaseURI}/${cell.row.original.foto_agent}`} alt={cell.row.original.foto_agent}/>
			  )
		  },
		  {
			Header: 'Foto Kulit',
			accessor: 'foto_kulit_wajah_depan',
			maxWidth: 80,
			custom: true,
			Cell: ({ cell }) => (
				<>
					<img src={`${this.serverBaseURI}/${cell.row.original.foto_kulit_wajah_depan}`} alt={cell.row.original.foto_kulit_wajah_depan} className='mb-2'/>
					<img src={`${this.serverBaseURI}/${cell.row.original.foto_kulit_wajah_kiri}`} alt={cell.row.original.foto_kulit_wajah_kiri} className='mb-2'/>
					<img src={`${this.serverBaseURI}/${cell.row.original.foto_kulit_wajah_kanan}`} alt={cell.row.original.foto_kulit_wajah_kanan} className='mb-2'/>
				</>
			  )
		}]
		
		this.columnsOrder = [
			{
				Header: 'Nama',
				Cell: cell => (
					<p>{cell.row.original.nama_depan} {cell.row.original.nama_belakang}</p>
				),
			},
			{
				Header: 'Alamat',
				accessor: 'alamat'
			},
			{
				Header: 'No Telp & No Agent',
				accessor: 'no_telp',
				Cell: cell => (
					<div>
						<p>{cell.row.original.no_telp}</p>
						<p className="font-bold">[{cell.row.original.kode_agent}]</p>
					</div>
				  )
			},
			{
				Header: 'Order Produk',
				accessor: 'nama_produk',
				/* (isMulti)
				Cell: cell => (
					<div>
						<p>{cell.row.original.orderProduct.join(', ')}</p>
					</div>
				  )
				*/
			},
			{
				Header: 'Jumlah Order',
				accessor: 'jumlah_order'
			},
			{
				Header: 'Option Pengiriman',
				accessor: 'option_pengiriman'
			}
		];
	}
	
	// Load table data
	async getData(prevState) {
			try {
			 await axios.all([
			  axios
				.get("/backend/laporan-mingguan/konsultasi/"),
			  axios
				.get("/backend/laporan-mingguan/order/")
			  ])
			  .then(axios.spread((res1, res2) => {
				  // check if there's any update or data empty
				  // Because of JavaScript stupidity of [] === [] is false, so I have to stringify first.
				  if(JSON.stringify(prevState.dataKonsultasi) !== JSON.stringify(res1.data) ||  
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
	  let { dataKonsultasi, dataOrder } = this.state;
	  return ( 
	  <div className="all__container">
			<div className="sidebar__container">
				<Sidebar/>
			</div>
			<div className="body__container">
				<div className="bg-white min-h-screen">
					<Header />
					<div className="px-12">
						<div className="mb-12">
							<h1 className="mb-12 text-3xl font-bold text-center">Laporan Harian Minggu ini</h1>
							<Table 
								data={this.state.dataKonsultasi}
								columns ={this.columnsKonsultasi}
							/>
							<ExcelFile element={<button className="button">EXPORT EXCEL</button>}>
								<ExcelSheet data={dataKonsultasi} name="Konsultasi">
									<ExcelColumn label="Nama" value="nama_depan"/>
									<ExcelColumn label="Alamat" value="alamat"/>
									<ExcelColumn label="No. Telp" value="no_telp"/>
									<ExcelColumn label="No. Agent" value="kode_agent"/>
									<ExcelColumn label="Jenis Kulit" value="jenis_kulit"/>
									<ExcelColumn label="Kulit Sensitif" value="kulit_sensitif"/>
									<ExcelColumn label="Mudah Iritasi" value="mudah_iritasi"/>
									<ExcelColumn label="Pasien dalam keadaan Hamil/ Menyusui" value="hamil_dan_menyusui"/>
									<ExcelColumn label="Riwayat Skincare" value="riwayat_skincare"/>
									<ExcelColumn label="Kondisi dan Keluhan" value="kondisi_keluhan"/>
									<ExcelColumn label="Pengunaan ke-" value="penggunaan_ke"/>
								</ExcelSheet>
							</ExcelFile>
						</div>
						<div className="mb-12">
							<h1 className="mb-12 text-3xl font-bold text-center">Laporan Konsultasi Harian ini</h1>
							<Table 
								data={this.state.dataOrder}
								columns ={this.columnsOrder}
							/>
							<ExcelFile element={<button className="button">EXPORT EXCEL</button>}>
								<ExcelSheet data={dataOrder} name="Order">
									<ExcelColumn label="Nama" value="nama_depan"/>
									<ExcelColumn label="Alamat" value="alamat"/>
									<ExcelColumn label="No. Telp" value="no_telp"/>
									<ExcelColumn label="No. Agent" value="kode_agent"/>
									<ExcelColumn label="Nama Produk" value="nama_produk"/>
									<ExcelColumn label="Jumlah Order" value="jumlah_order"/>
									<ExcelColumn label="Option Pengiriman" value="option_pengiriman"/>
								</ExcelSheet>
							</ExcelFile>
						</div>
					</div>
				</div>
			</div>
		</div>
	  );
  }
}

export default LaporanMingguan;