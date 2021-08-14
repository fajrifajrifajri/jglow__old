// Import React & Required libs
import React from 'react';

// Assets & Components include
import '../../../Assets/css/index.css';

// Icons
import { FaAddressCard, FaChevronDown } from 'react-icons/fa';

export const Header = () => {
	return (
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
	)
}