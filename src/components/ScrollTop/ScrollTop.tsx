import { useEffect, useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import scss from './ScrollTop.module.scss';
import useHideScrolTop from '../../hooks/useHideScrolTop';


const ScrollTop = () => {

const {backToTop} = useHideScrolTop()
	
	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	
	return (
		<div>
				<button 
				onClick={scrollUp} 
				className={`${scss.blob} ${backToTop && scss.active}`}>
					<SlArrowUp 
					size={25} 
					color='white'/>
				</button>
		</div>
	);
};

export default ScrollTop;