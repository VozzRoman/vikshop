import { useEffect, useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import scss from './ScrollTop.module.scss';


const ScrollTop = () => {
	const [backToTop, setBackToTop] = useState<boolean>(false);

	const handleScroll = () => {
		if(window.scrollY > 100) {
			
			setBackToTop(true);
		} else {
			
			setBackToTop(false);
		}
	}

	useEffect(() => {
		console.log('scroll');
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [backToTop])

	// const scrollUp = () => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		behavior: 'smooth',
	// 	})
	// }
	return (
		<div>
				<button 
				// onClick={scrollUp} 
				className={`${scss.blob} ${backToTop && scss.active}`}>
					<SlArrowUp 
					size={25} 
					color='white'/>
				</button>
		</div>
	);
};

export default ScrollTop;