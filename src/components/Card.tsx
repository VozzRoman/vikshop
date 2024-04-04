import  { FC, useState } from 'react';
import { IProducts } from '../types/ICard';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { addToCart } from '../redux/Cart/cartSlice';
import StarRating from './StarRating/StarRaiting';
import { Link, useLocation, } from 'react-router-dom';
import noImage from '../assets/images/no-img.png';
import ItemOptions from './ItemOptions';


interface CardProps {
	item: IProducts
	forwardRef:React.Ref<HTMLLIElement>;
}

const Card: FC<CardProps> = ({item, forwardRef}) => {
const {products} = useAppSelector(state => state.productReducer);
const [size, setSize] = useState<string>('');
const [color, setColor] = useState<string>('');
const [activeColor, setActiveColor] = useState<string | null>(null);
const [onImageError, setOnImageError] = useState<boolean>(false);
const location = useLocation();

//Оброботчик ошибок фото
const handleErrorImage = () => {
	setOnImageError(true)
}
const dispatch = useAppDispatch();
	const handleAddToCart = () => {
	
		const product = products.find(prod => prod.id === item.id)!
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
const model: string = `?model=${item.name.split(' ').splice(1).join('_')}`


	return (
		<li ref={forwardRef} className=' xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full sm:p-3 pb-3 pt-3' >
			<div className='border rounded-md h-full flex flex-col'>
			<div className='w-full overflow-hidden'>
				<Link 
				to={`${item.id + model}`} 
				state={{from:location}}>
				<div className='transform transition-transform duration-300 hover:scale-105'>
				<img 
				onError={handleErrorImage} 
				src={onImageError ? noImage  : item.imagePath[0]} alt={item.name} 
				className='sm:h-44 w-full h-80 object-cover rounded-t-lg'/>
				</div>
				</Link>
			</div>

			<div className='grow'>
				<StarRating item={item.rating} />
				<Link 
				to={`${item.id + model}`} 
				state={{from:location}}>
			<p className='text-black pl-[20px] pr-[20px] pt-1 pb-1 mb-auto underline decoration-1 hover:text-blue-950 transition-colors duration-200'>
				<span className='font-bold block'>
					{item.name.split(' ')[0]}
				</span> 
					{item.name.split(' ').splice(1).join(' ')}
			</p>
			</Link>
			</div>
			<div>
				<ItemOptions 
				item={item} 
				handleSelectSize={handleSelectSize} 
				activeColor={activeColor} 
				handleSelectColor={handleSelectColor}/>
			<p className='text-gray-800 font-bold pt-1 pb-1 pl-[20px] pr-[20px]'>${item.price}</p> 
			<div className='pb-5 pl-[20px] pr-[20px]'>
			<button type='button' onClick={handleAddToCart} className='text-white  w-full md:pt-1.5 md:pb-1.5 md:pl-1.5 md:pr-1.5 pt-3 pb-3 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-sm mt-3 font-bold text-sm'>add to cart</button>
			</div>
			</div>
			</div>
		</li>
	);
};

export default Card;