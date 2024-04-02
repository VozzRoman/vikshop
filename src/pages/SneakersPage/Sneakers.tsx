import { FC, useEffect} from 'react';
import Products from '../../components/Products/Products';
import { useLocation} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { getLinkRoot } from '../../redux/Link/sliceLink';
import useFadePageHook from '../../hooks/fadePageHook';

const SneakersPage: FC = () => {
	const {isVisible} = useFadePageHook();
	const {pathname} = useLocation();
	const dispatch = useAppDispatch();
	useEffect(() => {
dispatch(getLinkRoot(pathname));
	}, [])

	return (
		<div className={`
		${isVisible ? 'opacity-100': 'opacity-0'} 
		transition-opacity duration-500`}>
		<Products/>
		</div>
	); // sneakers!!!!
};

export default SneakersPage;