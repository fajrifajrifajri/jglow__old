// Import React & Required libs
import { useState } from 'react';
import {
	withRouter,
	Link
} from 'react-router-dom';
import axios from 'axios';

// Assets & Components include
import '../../../Assets/css/index.css';
import Sidebar from '../_Main Components/sidebar';

function LaporanHarian(props) {
  return ( 
  <div className="all__container">
		<div className="sidebar__container">
			<Sidebar/>
		</div>
		<div className="body__container">
			<div className="bg-layout min-h-screen rounded-tl-lg">
				
			</div>
		</div>
	</div>
  );
}

export default withRouter(LaporanHarian);