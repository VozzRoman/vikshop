import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, buyItNowOneClick } from '../../redux/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import StarRating from '../StarRating/StarRaiting';
import { IProducts } from '../../types/ICard';
import ItemOptions from '../ItemOptions';
import ModalByIt from '../ModalBuyIt/ModalByIt';
import BuyItNow from '../BuyItNow/BuyItNow';
import MessageInfo from '../MessageInfo/MessageInfo';



const RightSideProdInfo: FC = () => {
const [data, setData] = useState<IProducts | null>(null)
const [size, setSize] = useState<string>('');
const [color, setColor] = useState<string>('');
const [activeColor, setActiveColor] = useState<string | null>(null);
const [message, setMessage] = useState<boolean>(false)
const [isOpen, setIsOpen] = useState<boolean>(false);

//-----
	const sneakers = useAppSelector(state => state.productReducer.products);
	const oreder = useAppSelector(state => state.cartReducer.buyIt);
	const {id} = useParams<{id: string}>();
	const dispatch = useAppDispatch();

//-----
	const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		const product = sneakers.find(prod => prod.id === data?.id)!
		const id: number = Date.now();
			if(color || size){
				return dispatch(addToCart(
					{...product,
					size: [size, ...product.size],
					color: [color, ...product.color],
					id, 
					count: 1}))
			}
				dispatch(addToCart(
					{...product,
					id,
					count: 1}))
		
	}
	const handleSelectSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSize(e.target.value);
		}
	const handleSelectColor = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, data: string) => {
			setActiveColor(prev => prev === data ? null : data)
			const value = e.currentTarget.getAttribute('data-value');
			if(value){
				if(activeColor !== data){
					setColor(value);
				}
				if(activeColor === data){
					setColor('')
				}	
			}
		}
	const handleToggleModal = () => {
		setIsOpen(prev => !prev);
		document.body.style.overflow = 'hidden';
		if(data){
			dispatch(buyItNowOneClick({
				name: data.name,
				imagePath: data.imagePath[0],
				size: size ? size : data.size[0],
				color: color ? color : data.color[0],
				price: data.price,
	
			}))
		}
	
	}

//-----
	useEffect(() => {
		const sneaker = sneakers.find(item => item.id === Number(id));
		if(sneaker){
			setData(sneaker);
		}
		
	}, [])
	return (
		<>
		<div className='lg:ml-20 mt-5'>
		{data !== null && <div className='flex flex-col h-full'>
		<StarRating item={data.rating}/>
			<p className='text-black text-3xl font-bold mb-2'>{data.name}</p>
			<p className='mb-7 border-b pb-3'>{data.description}</p>
			<div className='w-60 border-b pb-3'>
			<p className='mb-2 font-semibold '>Choose your color and size</p>
			<ItemOptions 
			item={data} 
			handleSelectSize={handleSelectSize} 
			handleSelectColor={handleSelectColor} 
			activeColor={activeColor}/>
			</div>
			<div className='flex justify-between mt-5'>
			<button 
			onClick={handleAddToCart} 
			className=' text-white w-40 pt-0.5 pb-0.5 pl-1.5 pr-1.5 bg-orange-500 hover:bg-orange-700 transition-all duration-300 rounded-sm mt-3 font-bold text-sm mr-5'>add to cart</button>
			<button 
			onClick={handleToggleModal} 
			className=' text-white w-40 pt-0.5 pb-0.5 pl-1.5 pr-1.5 bg-orange-500 hover:bg-orange-700 transition-all duration-300 rounded-sm mt-3 font-bold text-sm'>buy it now</button>
			</div>
		</div>}
		</div>
		<ModalByIt 
		handleToggleModal={handleToggleModal} 
		isOpen={isOpen}>
			{oreder && 
			<BuyItNow 
			oreder={oreder} 
			handleToggleModal={handleToggleModal} 
			setMessage={setMessage}/>}
		</ModalByIt>
		{message && <MessageInfo/>}
		</>
	);
};

export default RightSideProdInfo;