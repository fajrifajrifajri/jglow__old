// Import React & Required libs
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// Components
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Dashboard from './components/Dashboard/dashboard';
import Profile from './components/Dashboard/profile';
import Produk from './components/Dashboard/produk';
import BuatProduk from './components/Dashboard/Produk/buatProduk';
import Agent from './components/Dashboard/agent';
import BuatAgent from './components/Dashboard/Agent/buatAgent';
import User from './components/Dashboard/user';
import BuatUser from './components/Dashboard/User/buatUser';
import Konsultasi from './components/Dashboard/konsultasi';
import BuatKonsultasi from './components/Dashboard/Konsultasi/buatKonsultasi';
import Order from './components/Dashboard/order';
import BuatOrder from './components/Dashboard/Order/buatOrder';
import KonsultasiKlien from './components/buatKonsultasi';
import LaporanProduk from './components/Dashboard/Laporan/laporanProduk';
import LaporanAgent from './components/Dashboard/Laporan/laporanAgent';
import LaporanHarian from './components/Dashboard/Laporan/laporanHarian';
import LaporanMingguan from './components/Dashboard/Laporan/laporanMingguan';
import LaporanBulanan from './components/Dashboard/Laporan/laporanBulanan';
import Laporan3Bulan from './components/Dashboard/Laporan/laporan3Bulan';
import LaporanTahunan from './components/Dashboard/Laporan/laporanTahunan';

// Auth
import UserContext from './components/Auth/userContext';

function App() {
	// Auth Frontend
	const [ userData, setUserData] = useState({
		token: undefined,
		user: undefined
	});
	 
	// User Status
	const [userStatus, setUserStatus] = useState(false)
  
	useEffect(() => {
		if(!userStatus) {

			// Set Axios Default URL
			// var port = 5000;
			// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  
			  
			const checkLoggedIn = async () => {
				let token = localStorage.getItem("auth-token");
				console.log('Token: '+token);
				if(token === null){
					localStorage.setItem("auth-token", "");
					token = "";
				}
				const tokenResponse = await axios.post('/backend/users/verifikasiToken', null, {headers: {"x-auth-token": token}});
				console.log(tokenResponse);
				if (tokenResponse.data) {
					const userRes = await axios.get("/backend/users/", {
						headers: { "x-auth-token": token },
					});
					console.log(userRes);
					setUserData({
						token,
						user: userRes.data,
					});
				} else {
					console.log('Token either empty/expired/unverified!');
					setUserData({
						user: null,
					});
				}
				setUserStatus(true);
			}
			
			// Execute
			setTimeout(function() {
				checkLoggedIn();
			}, 250);
		}
	}, [userStatus]);
  
  // Routing
  return (
    <Router>
		<UserContext.Provider value={{ userData, setUserData, userStatus: setUserStatus }}>
			<Switch>
				<Route exact path="/">
				  <Login />
				</Route>
				<Route path="/daftar">
				  <Register />
				</Route>
				<Route path="/beranda">
				  <Dashboard />
				</Route>
				<Route path="/profile">
				  <Profile />
				</Route>
				<Route exact path="/produk">
				  <Produk />
				</Route>
				<Route exact path="/produk/buat-produk">
				  <BuatProduk />
				</Route>
				<Route exact path="/agent">
				  <Agent />
				</Route>
				<Route exact path="/agent/buat-agent">
				  <BuatAgent />
				</Route>
				<Route exact path="/user">
				  <User />
				</Route>
				<Route exact path="/user/buat-user">
				  <BuatUser />
				</Route>
				<Route exact path="/laporan-produk">
				  <LaporanProduk />
				</Route>
				<Route exact path="/laporan-agent">
				  <LaporanAgent />
				</Route>
				<Route exact path="/laporan-harian">
				  <LaporanHarian />
				</Route>
				<Route exact path="/laporan-mingguan">
				  <LaporanMingguan />
				</Route>
				<Route exact path="/laporan-bulanan">
				  <LaporanBulanan />
				</Route>
				<Route exact path="/laporan-3bulan">
				  <Laporan3Bulan />
				</Route>
				<Route exact path="/laporan-tahunan">
				  <LaporanTahunan />
				</Route>
				<Route exact path="/konsultasi">
				  <Konsultasi />
				</Route>
				<Route path="/konsultasi/buat-konsultasi">
				  <BuatKonsultasi />
				</Route>
				<Route exact path="/order">
				  <Order />
				</Route>
				<Route path="/order/buat-order">
				  <BuatOrder />
				</Route>
				<Route path="/konsultasi-konsumer">
				  <KonsultasiKlien />
				</Route>
				<Route path={"/formulir-konsultasi/:kodeAgent"} component={KonsultasiKlien}></Route>
			</Switch>
		</UserContext.Provider>
    </Router>
  );
}

export default App;
