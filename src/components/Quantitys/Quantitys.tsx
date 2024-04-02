import { FC } from 'react';
import { useAppDispatch} from '../../hooks/reduxHook';
import {  updateCartMinus, updateCartPlus } from '../../redux/Cart/cartSlice';

import { ICard } from '../../types/ICard';

interface QuantityProps {
	card: ICard,
}


const Quantitys: FC<QuantityProps>= ({card}) => {
	const dispatch = useAppDispatch();

	const incrementHandler = () => {
		dispatch(updateCartPlus(card))
	}
	const decrementHandler = () => {
		dispatch(updateCartMinus(card))
	}
	
	return (
		<div className='flex items-center justify-center'>
			<button className='font-bold font-black mr-2 ml-4 text-xl text-white' onClick={incrementHandler}>+</button>
			<input className='rounded-sm  w-12 text-black text-center pl-3' type="number" readOnly value={card.count} />
			<button className='font-bold font-black ml-2 text-xl text-white' onClick={decrementHandler}>-</button>
			<p className='ml-auto font-bold text-white'> ${card.price * card.count}</p>
	
		</div>
	);
};

export default Quantitys;