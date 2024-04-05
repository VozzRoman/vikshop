import  { useEffect, useState } from 'react';

const useHideScrolTop = () => {
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
		document.addEventListener('scroll', handleScroll)
		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return {backToTop};
};

export default useHideScrolTop;