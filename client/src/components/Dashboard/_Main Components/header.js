// Import React & Required libs
import React from 'react';
import {
	Link
} from 'react-router-dom';

// Assets & Components include
import '../../../Assets/css/index.css';

// Icons
import { FaAddressCard, FaChevronDown } from 'react-icons/fa';

export const Header = () => {
	return (
		<div className="bg-pink-dark grid grid-cols-10 text-white text-center pb-2 bg-gradient-to-b from-pink-400 to-pink-600">
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
		/*
		<div className="grid grid-cols-12 gap-x-3 my-8 text-pink-dark">
			<div className="col-start-9 col-span-3 text-right">
				<h5 className="text-sm">Masuk sebagai</h5>
				<button>
					<FaChevronDown className='mr-4' />
					<span className="text-3xl font-bold underline">DISTRIBUTOR</span>
				</button>
			</div>
			<div className="col-span-1">
				<FaAddressCard />
			</div>
		</div>
		*/
	)
}