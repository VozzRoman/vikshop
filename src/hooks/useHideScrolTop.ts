import  { useCallback, useEffect, useState } from 'react';

const useHideScrolTop = () => {
	const [scrollTop, setScrollTop] = useState<number>(0);
	const [lastScroll, setLastScroll] = useState<number>(0);
 
	const onScroll = useCallback(() => {
	  setScrollTop(window.scrollY);
	}, []);
 
	useEffect(() => {
	 
	  document.addEventListener("scroll", onScroll);
	  return () => {
		 document.removeEventListener("scroll", onScroll);
		 if(scrollTop){
			 setLastScroll(scrollTop);
		 }
		 
	  };
	}, [onScroll, scrollTop]);
	return { scrollTop, setScrollTop, lastScroll };

};

export default useHideScrolTop;