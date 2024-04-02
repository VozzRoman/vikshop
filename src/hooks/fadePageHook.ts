import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useFadePageHook = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const {pathname} = useLocation();

	useEffect(() => {
		setIsVisible(true); //плавная подгрузка страници!!!!
			return () => setIsVisible(false);
			}, [pathname])
	return {isVisible, setIsVisible};
};

export default useFadePageHook;