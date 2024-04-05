import { useEffect, useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import scss from './ScrollTop.module.scss';
import { Link } from 'react-router-dom';

const ScrollTop = () => {
	const [backToTop, setBackToTop] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if(window.scrollY > 100) {
				setBackToTop(true);
			} else {
				setBackToTop(false);
			}
		})
	}, [])

	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	return (
		<div>
				<div 
				onClick={scrollUp} 
				className={`${scss.blob} ${backToTop && scss.active}`}>
					<SlArrowUp 
					size={25} 
					color='white'/>
				</div>
		</div>
	);
};

export default ScrollTop;