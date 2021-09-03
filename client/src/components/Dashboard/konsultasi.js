// Import React & Required libs
import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';
import { Table } from './_Main Components/table';
import EditKonsultasi from './Konsultasi/editKonsultasi';

// Icons
import { FaChevronLeft, FaPlusSquare, FaTimes, FaPencilAlt, FaTruck } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { BsInfo } from 'react-icons/bs';

// SweetAlert 2
import Swal from 'sweetalert2';

// React-modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

class Konsultasi extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: [],
			konsultasiCount: 0,
			orderCount: 0,
			
			loadingData: true,
			openPopup: false,
			idKonsultasi: ''
		}
		
		this.editData = this.editData.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
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
					<p className="truncate font-bold">[{cell.row.original.no_agent}]</p>
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
					<p><span className="font-bold">Kulit Sensitif: </span>{cell.row.original.kulit_sensitif}</p>
					<p><span className="font-bold">Mudah Iritasi? </span>{cell.row.original.mudah_iritasi}</p>
					<p><span className="font-bold">Pasien dalam keadaan Hamil/ Menyusui? </span>{cell.row.original.hamil_dan_menyusui}</p>
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
		},
		{
		  Header: "Aksi",
		  accessor: "_id",
		  maxWidth: 95,
		  Cell: ({ cell }) => (
		  <>
			<button onClick={ () => { this.editData(cell.row.values._id) }} className="p-3 mb-2 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-blue-400 rounded-full">
			  <FaPencilAlt />
			</button>
			<button onClick={ () => { this.deleteData(cell.row.values._id) }} className="p-3 mb-2 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-red-400 rounded-full">
			  <FaTimes />
			</button>
		  </>
		  )
		}];
	}
	
	editData = (id) => { 
		console.log(id);
		this.setState({
			openPopup: true,
			idKonsultasi: id
		})
	}
	
	onCloseModal() {
		this.setState({
			openPopup: false
		})
	}
	
	deleteData = (id) => { 
		
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
	let { openPopup, idKonsultasi } = this.state;
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
				<div className="form__popup">
					<Modal
						isOpen={openPopup}
						onRequestClose={this.onCloseModal}
					  >
						<button onClick={this.onCloseModal} className="float-right"> X </button>
						{ openPopup ?
							<EditKonsultasi idKonsultasi={idKonsultasi} onCloseModal={this.onCloseModal}/> : '' 
						}
					  </Modal>
				</div>
			</div>
		</div>
    </div>
    );
  }
}

export default Konsultasi;