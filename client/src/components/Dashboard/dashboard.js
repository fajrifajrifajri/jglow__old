// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';
import { Header } from './_Main Components/header';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAssistiveListeningSystems, faTruck, faAirFreshener, faUserSecret, faUsersCog, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';

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
			 <div className="space-x-4 font-xs">
				<Link to="/konsultasi" className="inline-flex flex-col text-white">
					<div className="flex bg-pink-400 px-2 py-4 rounded-t">
						<FontAwesomeIcon icon={faAssistiveListeningSystems} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Konsultasi</div>
				</Link>
				<Link to="/order" className="inline-flex flex-col text-white">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faTruck} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Order</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faAirFreshener} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Produk</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faUserSecret} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Agent</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faUsersCog} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">User</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faBell} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Coming Soon...</div>
				</Link>
			 </div>
			 <h1 className="text-pink-dark text-3xl font-semibold mt-8 mb-4">Laporan</h1>
			 <div className="space-x-4 font-xs">
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faChartLine} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Laporan Produk</div>
				</Link>
				<Link className="inline-flex flex-col text-white opacity-50">
					<div className="flex bg-pink-400 px-4 py-4 rounded-t">
						<FontAwesomeIcon icon={faChartLine} className="m-auto fa-lg"/>
					</div>
					<div className="bg-pink-dark p-2 text-xs font-bold text-center">Laporan Agent</div>
				</Link>
			 </div>
			</div>
		</div>
    </div>
    );
  }
}

export default withRouter(Dashboard);