import  { useCallback, useEffect, useState } from 'react';

const useHideScrolTop = () => {
		// const [backToTop, setBackToTop] = useState<boolean>(false);
		const [scrollTop, setScrollTop] = useState<number>(0);
		const [lastScroll, setLastScroll] = useState<number>(100);



	const handleScroll = useCallback(() => {
		const scrollPosition = window.scrollY || window.pageXOffset;
		setScrollTop(scrollPosition);
		
	}, [])

	useEffect(() => {
		console.log('scroll');
		document.addEventListener('scroll', handleScroll)
		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return {scrollTop, lastScroll, setLastScroll};
};

export default useHideScrolTop;