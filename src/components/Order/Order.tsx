import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';

const Order: FC = () => {
	const oreder = useAppSelector(state => state.cartReducer.buyIt);
	return (
		<div>
			<div className='border-b-2 pb-5 flex items-center'>
			<div className='mr-5 mt-5 top-0 left-0 max-w-[100px] w-full h-[100px] overflow-hidden'>
				<img className='w-full h-full object-cover rounded-md'
				src={oreder?.imagePath} 
				alt={oreder?.name} />
			</div>
			<div className='mr-auto'>
			<p className='font-bold underline'>{oreder?.name}</p>
			<p className='font-semibold'>Size: <span className='text-white font-semibold'>{oreder?.size}</span></p>
			<p className='flex font-semibold'>Color: <span className= 'ml-2 w-[20px] h-[20px] rounded-sm block' style={{background:`${oreder?.color}`}}></span></p>
			</div>
			<p className='mr-5 font-semibold'>Price: <span>{oreder?.price}$</span></p>
		</div>
		</div>
	);
};

export default Order;