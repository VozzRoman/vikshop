import  { useCallback, useEffect, useState } from 'react';

const useHideScrolTop = () => {
	const [scrollTop, setScrollTop] = useState<number>(0);
	const [lastScroll, setLastScroll] = useState<number>(0);
	const [trigger, setTrigger] = useState<boolean>(false);

	const onScroll = useCallback(() => {
		
	  setScrollTop(window.scrollY);
	  if(scrollTop > lastScroll){
		setTrigger(true);
	  } else {
		setTrigger(false)
	  }
	  
	}, [scrollTop ,trigger]);
 
	useEffect(() => {
	
	  document.addEventListener("scroll", onScroll);
	  return () => {
		 document.removeEventListener("scroll", onScroll);
		 if(scrollTop){
			 setLastScroll(scrollTop);
		 }
		 
	  };
	}, [onScroll]);
	return { scrollTop, setScrollTop, lastScroll, trigger};

};

export default useHideScrolTop;