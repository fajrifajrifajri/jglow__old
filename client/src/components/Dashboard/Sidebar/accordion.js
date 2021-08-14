// Import React
import React, { useState, useRef } from "react";
import {
	Link
} from 'react-router-dom';

// Styling
import "./accordion.css";

// Components include
import Chevron from "./chevron";

function Accordion(props) {
 const [setActive, setActiveState] = useState("");
 const [setHeight, setHeightState] = useState("0px");
 const [setRotate, setRotateState] = useState("accordion__icon");
 
 const content = useRef(null);
 
 function toggleAccordion() {
	setActiveState(setActive === "" ? "active" : "");
	setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
	setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate");
	console.log(content.current.scrollHeight);
 }
 
 const TheIcon = props.fontAwesome;
 
 return (
   <div className="accordion__section">
     <button className={`accordion ${setActive}`} onClick={toggleAccordion} disabled={props.isDisabled === true ? true : false}>
		<div className='flex px-4'>
			<TheIcon className={`m-auto mr-3 ${props.additionalClass}`} />
			<p className={props.additionalClass}>{props.title}</p>
		</div>
	   <Chevron className={`${setRotate} ${props.additionalClass}`} width={10} fill={"#777"} />
     </button>
     <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion__content">
       <ul
         className="accordion__text list-none"
         /* dangerouslySetInnerHTML={{ __html: props.content  }} */
       >
		   <li><Link to="/konsultasi/">Konsultasi</Link></li>
		   <li><Link to="/order/">Order</Link></li>
	   </ul>
     </div>
   </div>
 );
}

export default Accordion;