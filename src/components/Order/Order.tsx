import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';

const Order: FC = () => {
	const oreder = useAppSelector(state => state.cartReducer.buyIt);
	return (
		<div>
			<div className='border-b-2 md:pb-5 pb-2 flex items-center'>
			<div className='mr-5 md:mt-5 top-0 left-0 md:max-w-[100px] max-w-[60px] w-full md:h-[100px] h-[60px] overflow-hidden'>
				<img className='w-full h-full object-cover rounded-md'
				src={oreder?.imagePath} 
				alt={oreder?.name} />
			</div>
			<div className='mr-auto'>
			<p className='font-bold underline md:text-[16px] text-sm'>{oreder?.name}</p>
			<p className='font-semibold md:text-[16px] text-sm'>Size: <span className='text-white font-semibold md:text-[16px] text-sm'>{oreder?.size}</span></p>
			<p className='flex font-semibold md:text-[16px] text-sm'>Color: <span className= 'ml-2 w-[20px] h-[20px] rounded-sm block md:text-[16px] text-sm' style={{background:`${oreder?.color}`}}></span></p>
			</div>
			<p className='mr-5 font-semibold md:text-[16px] text-sm'>Price: <span>{oreder?.price}$</span></p>
		</div>
		</div>
	);
};

export default Order;