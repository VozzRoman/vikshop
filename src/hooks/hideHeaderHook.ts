import { useCallback, useEffect, useState } from "react";

const useHideHeader = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [lastScroll, setLastScroll] = useState<number>(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  const onScroll = useCallback(() => {
    setTimeout(() => {
      const scrollPosition = window.scrollY || window.pageXOffset;
      setScrollTop(scrollPosition);
      
      if (scrollPosition > lastScroll && !isHeaderHidden) {
        setIsHeaderHidden(true);
      } else if (scrollPosition < lastScroll && isHeaderHidden) {
        setIsHeaderHidden(false);
      }
    }, 100); // Задержка в 500 миллисекунд
  }, [lastScroll, isHeaderHidden]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      if (scrollTop) {
        setLastScroll(scrollTop);
      }
    };
  }, [scrollTop, onScroll]);

  return { scrollTop, setScrollTop, lastScroll, isHeaderHidden };
};

export default useHideHeader;