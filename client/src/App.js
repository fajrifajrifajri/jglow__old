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
import Produk from './components/Dashboard/produk';
import BuatProduk from './components/Dashboard/Produk/buatProduk';
import Agent from './components/Dashboard/agent';
import BuatAgent from './components/Dashboard/Agent/buatAgent';
import User from './components/Dashboard/user';
import BuatUser from './components/Dashboard/User/buatUser';
import ReportingProduk from './components/Dashboard/reportingProduk';
import ReportingAgent from './components/Dashboard/reportingAgent';
import Konsultasi from './components/Dashboard/konsultasi';
import BuatKonsultasi from './components/Dashboard/Konsultasi/buatKonsultasi';
import Order from './components/Dashboard/order';
import BuatOrder from './components/Dashboard/Order/buatOrder';
import KonsultasiKlien from './components/buatKonsultasi';

// Auth
import UserContext from './components/Auth/userContext';

function App() {
  // Auth Frontend
  const [ userData, setUserData] = useState({
	token: undefined,
	user: undefined
  });
  
  useEffect(() => {
	
	// Set Axios Default URL
	var port = 5000;
	axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;  
	  
	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");
		if(token === null){
			localStorage.setItem("auth-token", "");
			token = "";
		}
		const tokenResponse = await axios.post('/users/cekToken', null, {headers: {"x-auth-token": token}});
		if (tokenResponse.data) {
			const userRes = await axios.get("/users/", {
			headers: { "x-auth-token": token },
		});
		setUserData({
			token,
			user: userRes.data,
		});
	}
	}
	checkLoggedIn();
  }, []);
  
  // Routing
  return (
    <Router>
		<UserContext.Provider value={{ userData, setUserData }}>
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
				  <ReportingProduk />
				</Route>
				<Route exact path="/laporan-agent">
				  <ReportingAgent />
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
			</Switch>
		</UserContext.Provider>
    </Router>
  );
}

export default App;
