// Import React
import React from "react";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Chevron(props) {
	return (
		<FontAwesomeIcon 
			icon={faChevronRight} 
			className={props.className}
			width={props.width}
			fill={props.fill}
		/>
	)
}

export default Chevron;