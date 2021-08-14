// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';

// Icons
import { FaAssistiveListeningSystems, FaTruck, FaUserSecret, FaUsersCog, FaBell, FaChartLine } from 'react-icons/fa';
import { AiOutlineSketch } from 'react-icons/ai';

class Dashboard extends Component {
	
  render() {
    return (
    <div className="grid grid-cols-12">
		<div className="col-span-2">
			<Sidebar/>
		</div>
		<div className="col-span-10 bg-gray-100">
			<div className="bg-layout  min-h-screen rounded-tl-lg py-4 px-12">
			 <h1 className="text-pink-dark text-4xl font-bold mb-8">Menu Aplikasi</h1>
			 <div className="space-x-6 font-xs">
				<Link to="/konsultasi" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaAssistiveListeningSystems size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Konsultasi</div>
				</Link>
				<Link to="/order" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaTruck size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Order</div>
				</Link>
				<Link to="/produk" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<AiOutlineSketch size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Produk</div>
				</Link>
				<Link to="/agent" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaUserSecret size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Agent</div>
				</Link>
				<Link to="/user" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaUsersCog size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">User</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50 shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaBell size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Coming Soon...</div>
				</Link>
			 </div>
			 <h1 className="text-pink-dark text-3xl font-semibold mt-8 mb-4">Laporan</h1>
			 <div className="space-x-6 font-xs">
				<Link to="/laporan-produk" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaChartLine size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Laporan Produk</div>
				</Link>
				<Link to="/laporan-agent" className="inline-flex flex-col text-white shadow">
					<div className="flex bg-pink-400 px-8 py-4 rounded-t">
						<FaChartLine size={40} className="m-auto"/>
					</div>
					<div className="bg-pink-dark p-2 text-md font-bold text-center">Laporan Agent</div>
				</Link>
			 </div>
			</div>
		</div>
    </div>
    );
  }
}

export default withRouter(Dashboard);