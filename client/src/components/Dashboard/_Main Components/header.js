// Import React & Required libs
import React, { Component } from 'react';

// Assets & Components include
import '../../../Assets/css/index.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
	return (
			<div className="grid grid-cols-12 gap-x-3 my-8 text-pink-dark">
				<div className="col-start-9 col-span-3 text-right">
					<h5 className="text-sm">Masuk sebagai</h5>
					<button>
						<FontAwesomeIcon icon={faChevronDown} className='fa-lg w-16 mr-4' />
						<span className="text-3xl font-bold underline">DISTRIBUTOR</span>
					</button>
				</div>
				<div className="col-span-1">
					<FontAwesomeIcon icon={faAddressCard} className="fa-3x" />
				</div>
			</div>
	)
}