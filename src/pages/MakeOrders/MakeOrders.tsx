import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import BuyItNow from '../../components/BuyItNow/BuyItNow';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import MessageInfo from '../../components/MessageInfo/MessageInfo';
import { getLinkRoot } from '../../redux/Link/sliceLink';
import { useLocation } from 'react-router-dom';

const MakeOrders = () => {
	const [message, setMessage] = useState<boolean>(false)
	const busket = useAppSelector(state => state.cartReducer.cart);
	const {pathname} = useLocation()
	
const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getLinkRoot(pathname));
	
		}, [pathname, dispatch])

	return (
		<Container>
			<BuyItNow 
			oreder={busket} 
			setMessage={setMessage}/>
			{message && 
			<MessageInfo/>}
		</Container>
	);
};

export default MakeOrders;