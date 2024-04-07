// import { useEffect, useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import scss from './ScrollTop.module.scss';
import Headroom from "react-headroom";
import './ScrollHideStyle.scss';

const ScrollTop = () => {


	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	
	return (
		<Headroom className="scroll" disableInlineStyles>
				<button 
				onClick={scrollUp} 
				className={`${scss.blob}`}>
					<SlArrowUp 
					size={25} 
					color='white'/>
				</button>
		</Headroom>
		
	);
};

export default ScrollTop;