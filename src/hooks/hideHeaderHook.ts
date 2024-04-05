import { useCallback, useEffect, useState } from "react";

const useHideHeader = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [lastScroll, setLastScroll] = useState<number>(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  const onScroll = useCallback(() => {
   
      const scrollPosition = window.scrollY || window.pageXOffset;
      setScrollTop(scrollPosition);
      if (scrollPosition >= lastScroll && !isHeaderHidden) {	
        setIsHeaderHidden(true);
      } else if (scrollPosition <= lastScroll && isHeaderHidden) {
        setIsHeaderHidden(false);
      }
   
  }, [lastScroll]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      if (scrollTop) {
        setLastScroll(scrollTop);
      }
    };
  }, [onScroll, lastScroll, scrollTop, isHeaderHidden]);

  return { scrollTop, setScrollTop, lastScroll, isHeaderHidden };
};

export default useHideHeader;