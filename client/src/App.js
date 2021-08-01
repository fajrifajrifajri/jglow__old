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
	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");
		if(token === null){
			localStorage.setItem("auth-token", "");
			token = "";
		}
		const tokenResponse = await axios.post('http://localhost:5000/users/cekToken', null, {headers: {"x-auth-token": token}});
		if (tokenResponse.data) {
			const userRes = await axios.get("http://localhost:5000/users/", {
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
