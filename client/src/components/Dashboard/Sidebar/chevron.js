// Import React
import React from "react";

// Icons
import { FaChevronRight } from 'react-icons/fa';

function Chevron(props) {
	return (
		<FaChevronRight
			className={props.className}
			width={props.width}
			style={{color: `props.fill`}}
		/>
	)
}

export default Chevron;