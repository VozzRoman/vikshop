// import { useEffect, useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import scss from './ScrollTop.module.scss';
import useHideScrolTop from '../../hooks/useHideScrolTop';


const ScrollTop = () => {

const {trigger} = useHideScrolTop()
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
				className={`${scss.blob} ${trigger && scss.active}`}>
					<SlArrowUp 
					size={25} 
					color='white'/>
				</button>
		</div>
		
// 		<div>
// 		<button 
// 		onClick={scrollUp} 
// 		className='fixed bottom-10 right-5 h-[40px] w-[40px] bg-orange-600 flex justify-center items-center'>
// 			<SlArrowUp 
// 			size={25} 
// 			color='black'/>
// 		</button>
// </div>
	);
};

export default ScrollTop;