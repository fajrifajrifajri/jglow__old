// Import React & Required libs
import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';
import { Header } from './_Main Components/header';
import { Table } from './_Main Components/table';

// Icons
import { FaChevronLeft, FaPlusSquare, FaTimes }  from 'react-icons/fa';

// SweetAlert 2
import Swal from 'sweetalert2';

// Set Axios Default URL
// var port = 5000;
// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  

class Order extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: [],
			orderCount: 0,
			konsultasiCount: 0,
			loadingData: true
		}
		
		this.deleteData = this.deleteData.bind(this);
		
		this.serverBaseURI = 'https://jglow.sgp1.digitaloceanspaces.com';
		
		this.columns = [
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
		},
		{
		  Header: "Delete",
		  accessor: "_id",
		  Cell: ({ cell }) => (
			<button key={cell.row.values._id} onClick={ () => { this.deleteData(cell.row.values._id) }} className="p-2 px-3 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-red-400 rounded-full">
			  <FaTimes />
			</button>
		  )
		}
	];
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
			axios.delete('/backend/order/'+id)
				.then(res => {
					Swal.fire(
					  'Deleted!',
					  'Data telah telah terhapus.',
					  'success'
					)
					console.log(res.data)
				});
		  }
		})
	}
	
	// Load table data
	async getData(prevState) {
			try {
			  await axios.all([
			  axios
				.get("/backend/order/"),
			  axios
				.get("/backend/konsultasi/")
			  ])
			  .then(axios.spread((res1, res2) => {
				  // check if there's any update or data empty
				  // Because of JavaScript stupidity of [] === [] is false, so I have to stringify first.
				  if(JSON.stringify(prevState.data) !== JSON.stringify(res1.data)) {
					  console.log(this.state.data);
					  console.log(res1.data);
					  // count how many data
					  const orderCount = Object.keys(res1.data).length;
					  const konsultasiCount = Object.keys(res2.data).length;
					  this.setState({ 
						data: res1.data,
						orderCount: orderCount,
						konsultasiCount: konsultasiCount,
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
			<Header />
			<div className="body__table__container">
				<div className="grid grid-cols-12 mb-8">
					<div className="col-span-6">
						<Link to="/beranda" className="button--back">
							<FaChevronLeft size={20} className='icon--header' />
							<span>
								Order
							</span>
						</Link>
						<Link to="/order/buat-order" className="button--input">
							<FaPlusSquare size={20} className='icon--header' />
							<span>
								Input
							</span>
						</Link>
					</div>
					<div className="col-span-6 flex gap-x-1">
						<button className="flex-1 bg-green-400 p-2 font-bold border-2 border-black">{this.state.orderCount} ORDER</button>
						<button className="flex-1 bg-yellow-400 p-2 font-bold border-2 border-black">{this.state.konsultasiCount} KONSULTASI</button>
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

export default Order;