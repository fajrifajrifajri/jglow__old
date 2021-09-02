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
import { FaChevronLeft, FaPlusSquare, FaTimes, FaUserLock } from 'react-icons/fa';

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
			Header: 'E-mail',
			accessor: 'email'
		},
		{
			Header: 'Password',
			accessor: 'password',
			className: 'text-center',
			Cell: ({ cell }) => (
				<button className="p-2 px-6 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-green-600">
				  <FaUserLock />
				</button>
			)
		},
		{
			Header: 'Role',
			accessor: 'role'
		},
		{
		  Header: "Cancel (Tolak)",
		  accessor: "_id",
		  Cell: ({ cell }) => (
			<button key={cell.row.values._id} onClick={ () => { this.deleteData(cell.row.values._id) }} className="p-3 transform hover:translate-x-0.5 hover:translate-y-0.5 text-white bg-red-400 rounded-full">
			  <FaTimes />
			</button>
		  )
		}];
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
		
			axios.delete('/backend/users/'+id)
				.then(res => console.log(res.data));
		  }
		})
	}
	
	// Load table data
	async getData(prevState) {
			try {
			  await axios.get("/backend/users/all")
			  .then((res) => {
				  // check if there's any update or data empty
				  // Because of JavaScript stupidity of [] === [] is false, so I have to stringify first.
				  if(JSON.stringify(this.state.data) === '[]' || JSON.stringify(prevState.data) !== JSON.stringify(res.data)) {
					  console.log(this.state.data);
					  console.log(res.data);
					  this.setState({ 
						data: res.data,
					  });
				  }
				  
				  // data is loaded
				  this.setState({ loadingData: false });
			  });
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
					<div className="col-span-6">
						<Link to="/beranda" className="button--back">
							<FaChevronLeft className='icon--header' />
							<span>
								User
							</span>
						</Link>
						<Link to="/user/buat-user" className="button--input">
							<FaPlusSquare className='icon--header' />
							<span>
								Input
							</span>
						</Link>
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