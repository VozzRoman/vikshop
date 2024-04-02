import React, { FC} from 'react';
import { useAppDispatch, useAppSelector} from '../../hooks/reduxHook';
import { deleteFromCart } from '../../redux/Cart/cartSlice';
import classNames from 'classnames';
import Quantitys from '../Quantitys/Quantitys';
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

interface BuskeProps {
	isShowCard: boolean,
	total: number,
	setIsShowCard: (value: boolean) => void;
}
const Busket: FC<BuskeProps> = ({isShowCard ,total, setIsShowCard}) => {
const dispatch = useAppDispatch();
const busketData = useAppSelector(state => state.cartReducer.cart);
const handleMakeOrder = () => {
	setIsShowCard(false)
	document.body.style.overflow = 'auto';
}
const handleDelte = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	e.stopPropagation();
		dispatch(deleteFromCart(id));
	}
	const handleCloseBasketOnbackDrop = <T extends HTMLElement>(e: React.MouseEvent<T>) => {
		if (e.target === e.currentTarget) {
			setIsShowCard(false);
			document.body.style.overflow = 'auto';
		 }
	}
	return (
		<div 
		onClick={handleCloseBasketOnbackDrop} 
		className={classNames(`absolute 
		${isShowCard ? "visible" : "invisible"} 
		${isShowCard ? "opacity-100" : "opacity-0"}
		md:top-[67px] top-[55px] md:right-0 right-3 w-full h-screen bg-transparent  transition:visible duration-500 ease-in-out z-50`)}>
		<div className={classNames(`lg:max-h-[552px] absolute rounded-sm p-4 
		${isShowCard ? "visible" : "invisible"} 
		${isShowCard ? "opacity-100" : "opacity-0"}
		md:right-0 -right-7 max-w-96 w-full bg-slate-400 transition:visible duration-500 ease-in-out z-50`)}>
		<ul className='lg:max-h-[400px] max-h-[300px] overflow-x-auto pr-2'>
			{busketData.length === 0 && <p className='font-medium'>cart is empty! Add some</p>}
		{busketData.map((card) => (
			<li 
			className='border-b-2 p-2 pl-0 mb-3' 
			key={card.id}>
				<div className='flex'>
					<div 
					className='w-[100px]'>
				<img className='rounded-md h-[70px] w-full' 
				src={card.imagePath[0]} alt={card.name} 
				height="70" 
				width="70"/>
				</div>
				<div className='mr-auto w-full'>
				<div className='flex justify-between'>
				<p className='ml-2 text-black font-bold text-sm'>
					{card.name.split(' ').splice(0,3).join(' ')}
				</p>
				<div 
				style={{padding:"12px", background:`${card.color[0]}`, marginLeft:"10px", height:"24px" , borderRadius:"4px"}}></div>
				</div>
				<p className='text-sm ml-2'>size: {card.size[0]}</p>

				<Quantitys card={card}/>
				
				</div>
				<button 
				onClick={(e) => handleDelte(card.id, e)} 
				className='text-red-500'><RiDeleteBin5Line className='ml-3 w-5 h-7 fill-orange-600 hover:fill-red-700 transition-fill duration-200'/>
				</button>
				</div>
			</li>
		))}
		
	</ul>
	<div>
			<p className='font-bold mt-5 mb-3 text-xl text-white'>
				Total: $ {total}
			</p>
		</div>
		 <Link 
		 onClick={handleMakeOrder} 
		 to='/makeOrderPage' 
		 className='bg-orange-500 block text-center relative z-[300] w-full text-white pt-2 pb-2 pl-3 pr-3 font-bold mt-5 rounded-sm hover:bg-orange-800 transition-all'>make order</Link>
	</div>
	</div>
	);
};

export default Busket;