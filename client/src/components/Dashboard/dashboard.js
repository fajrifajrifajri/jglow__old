// Import React & Required libs
import React, { Component } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';

// Auth
import UserContext from "../Auth/userContext";

// Assets & Components include
import '../../Assets/css/index.css';
import Sidebar from './_Main Components/sidebar';

// Icons
import { FaAssistiveListeningSystems, FaTruck, FaUserSecret, FaUsersCog, FaBell, FaChartLine } from 'react-icons/fa';
import { AiOutlineSketch } from 'react-icons/ai';

class Dashboard extends Component {
	// React.useContext
	 static contextType = UserContext;
	 
	 constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			role: '',
			// Loading
			loading: true,
		}
		
	}
	 
	componentDidMount(){
		const _this = this;
		
		setTimeout(() => {
		  
		  // loading false
		  _this.setState({ loading: false })
        }, 2000)
	}
	
	componentDidUpdate() {
		 const user = this.context.userData.user;
		 const { email } = this.state;
		 
		 if(!this.state.loading) {
			// console.log(user);
			if(user !== undefined) {
				if(email === '') {
					this.setState({ email: user.email, role: user.role })
				}
			}
		 }
	}
	
  render() {
	const { email, role } = this.state;
    return (
    <div className="grid grid-cols-12">
		<div className="col-span-2">
			<Sidebar/>
		</div>
		<div className="col-span-10 bg-gray-100">
			<div className="bg-layout min-h-screen rounded-tl-lg">
				<div className="mb-10 bg-pink-dark grid grid-cols-10 text-white text-center pb-2 bg-gradient-to-b from-pink-400 to-pink-600">
					<div className="col-span-2">
						<Link to='/laporan-harian' className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Tabel Harian</Link>
					</div>
					<div className="col-span-2">
						<Link to='/laporan-mingguan'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Tabel Mingguan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/laporan-bulanan'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Tabel Bulanan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/laporan-3bulan'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Laporan 3 Bulan</Link>
					</div>
					<div className="col-span-2">
						<Link to='/laporan-tahunan'  className="inline-block text-xl font-bold border-b-4 rounded border-pink-700 pt-14 w-10/12  shadow transform hover:translate-y-0.5">Tabel Tahunan</Link>
					</div>
				</div>
				<div className="pb-4 px-12">
					 <h1 className="text-pink-dark text-4xl font-bold mb-8">Menu Aplikasi</h1>
					 <div className={`relative font-xs pb-4 ${role === "klinik" ? 'x-scroll' : ''}`}>
						<div className="relative flex overflow-x-auto space-x-6 whitespace-nowrap custom__scrollbar pb-2">
							<Link to="/konsultasi" className="inline-flex flex-col text-white border-4 border-yellow-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex pattern--konsultasi p-20">
									<FaAssistiveListeningSystems size={40} className="m-auto"/>
								</div>
								<div className="bg-yellow-500 py-4 text-md font-bold text-center">Konsultasi</div>
							</Link>
							<Link to="/order" className="inline-flex flex-col text-white border-4 border-green-500 rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex pattern--order p-20">
									<FaTruck size={40} className="m-auto"/>
								</div>
								<div className="bg-green-500 py-4 text-md font-bold text-center">Order</div>
							</Link>
							{(role === 'klinik' || role === 'distributor') ? (
							<>
								<Link to="/produk" className="inline-flex flex-col text-white border-4 border-blue-500 rounded shadow-lg transform hover:translate-y-0.5">
									<div className="flex pattern--produk p-20">
										<AiOutlineSketch size={40} className="m-auto"/>
									</div>
									<div className="bg-blue-500 py-4 text-md font-bold text-center">Produk</div>
								</Link>
							</>
							) : ''}
							{role === 'klinik'  ? (
							<>
								<Link to="/agent" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
									<div className="flex pattern--agent p-20">
										<FaUserSecret size={40} className="m-auto"/>
									</div>
									<div className="bg-pink-dark py-4 text-md font-bold text-center">Agent</div>
								</Link>
								<Link to="/user" className="inline-flex flex-col text-white border-4 border-red-500 rounded shadow-lg transform hover:translate-y-0.5">
									<div className="flex pattern--user p-20">
										<FaUsersCog size={40} className="m-auto"/>
									</div>
									<div className="bg-red-500 py-4 text-md font-bold text-center">User</div>
								</Link>
							</>
							) : ''}
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
				{role === 'klinik'  ? (
				<>
					<div className="pb-4 px-12">
						<h1 className="text-pink-dark text-4xl font-semibold my-4">Laporan</h1>
						<div className="space-x-6 font-xs">
							<Link to="/laporan-produk" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex pattern--laporan p-20">
									<FaChartLine size={40} className="m-auto"/>
								</div>
								<div className="bg-pink-dark py-4 text-md font-bold text-center">Laporan Produk</div>
							</Link>
							<Link to="/laporan-agent" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex pattern--laporan p-20">
									<FaChartLine size={40} className="m-auto"/>
								</div>
								<div className="bg-pink-dark py-4 text-md font-bold text-center">Laporan Agent</div>
							</Link>
							<Link to="/laporan-distributor" className="inline-flex flex-col text-white border-4 border-pink-dark rounded shadow-lg transform hover:translate-y-0.5">
								<div className="flex pattern--laporan p-20">
									<FaChartLine size={40} className="m-auto"/>
								</div>
								<div className="bg-pink-dark py-4 text-md font-bold text-center">Laporan Distributor</div>
							</Link>
						 </div>
					</div>
				</>
				) : ''}
			</div>
		</div>
    </div>
    );
  }
}

export default withRouter(Dashboard);