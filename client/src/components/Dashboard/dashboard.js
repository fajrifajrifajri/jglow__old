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
			<div className="bg-layout min-h-screen rounded-tl-lg">
				<div className="mb-10 bg-pink-dark grid grid-cols-10 text-white text-center pb-2 bg-gradient-to-b from-pink-400 to-pink-600">
					<div className="col-span-2">
						<Link to='/' className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan Harian</Link>
					</div>
					<div className="col-span-2">
						<Link to='/'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan Mingguan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan Bulanan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan 3 Bulan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan Tahunan</Link>
					</div>
				</div>
				<div className="pb-4 px-12">
					 <h1 className="text-pink-dark text-4xl font-bold mb-8">Menu Aplikasi</h1>
					 <div className="relative font-xs pb-4 x-scroll">
						<div className="relative flex overflow-x-auto space-x-6 whitespace-nowrap custom__scrollbar pb-2">
							<Link to="/konsultasi" className="inline-flex flex-col text-white border-4 border-yellow-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex bg-yellow-400 p-20">
									<FaAssistiveListeningSystems size={40} className="m-auto"/>
								</div>
								<div className="bg-yellow-500 py-4 text-md font-bold text-center">Konsultasi</div>
							</Link>
							<Link to="/order" className="inline-flex flex-col text-white border-4 border-green-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex bg-green-400 p-20">
									<FaTruck size={40} className="m-auto"/>
								</div>
								<div className="bg-green-500 py-4 text-md font-bold text-center">Order</div>
							</Link>
							<Link to="/produk" className="inline-flex flex-col text-white border-4 border-blue-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex bg-blue-400 p-20">
									<AiOutlineSketch size={40} className="m-auto"/>
								</div>
								<div className="bg-blue-500 py-4 text-md font-bold text-center">Produk</div>
							</Link>
							<Link to="/agent" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex bg-pink-400 p-20">
									<FaUserSecret size={40} className="m-auto"/>
								</div>
								<div className="bg-pink-dark py-4 text-md font-bold text-center">Agent</div>
							</Link>
							<Link to="/user" className="inline-flex flex-col text-white border-4 border-red-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex bg-red-400 p-20">
									<FaUsersCog size={40} className="m-auto"/>
								</div>
								<div className="bg-red-500 py-4 text-md font-bold text-center">User</div>
							</Link>
							{/*
							<Link to="/beranda" className="inline-flex flex-col text-white opacity-50 shadow">
								<div className="flex bg-pink-400 p-20">
									<FaBell size={40} className="m-auto"/>
								</div>
								<div className="bg-pink-dark py-4 text-md font-bold text-center">Coming Soon...</div>
							</Link>
							*/}
						</div>
					</div>
				</div>
				<div className="pb-4 px-12">
					<h1 className="text-pink-dark text-4xl font-semibold mt-8 mb-4">Laporan</h1>
					<div className="space-x-6 font-xs">
						<Link to="/laporan-produk" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
							<div className="flex bg-pink-400 p-20">
								<FaChartLine size={40} className="m-auto"/>
							</div>
							<div className="bg-pink-dark py-4 text-md font-bold text-center">Laporan Produk</div>
						</Link>
						<Link to="/laporan-agent" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
							<div className="flex bg-pink-400 p-20">
								<FaChartLine size={40} className="m-auto"/>
							</div>
							<div className="bg-pink-dark py-4 text-md font-bold text-center">Laporan Agent</div>
						</Link>
					 </div>
				</div>
			</div>
		</div>
    </div>
    );
  }
}

export default withRouter(Dashboard);