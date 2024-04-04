import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {mainFilter} from '../../redux/Products/productSlice';
import { GrPowerReset } from "react-icons/gr";
import classNames from 'classnames';
import { IProducts } from '../../types/ICard';
interface FilterProps {
	setIsFilter: (value: boolean) => void;
	isFilter: boolean;
	data: IProducts[]
}

const Filter: FC<FilterProps> = ({setIsFilter, isFilter, data}) => {
	console.log(isFilter);
	const [sneakersData, setSneakersData ]= useState<IProducts[]>([]);

	const nameArray = [...new Set(sneakersData.map(sneaker => sneaker.name.split(' ').splice(0, 1).join(' ')))];
	const sizeArray = [...new Set(sneakersData.flatMap(sneaker => sneaker.size).sort())];
	const colorArray = [...new Set(sneakersData.flatMap(sneaker => sneaker.color))];
	const priceArray = [...new Set(sneakersData.map(sneaker => sneaker.price))];
	const [model, setModel] = useState<string>('');
	const [size, setSize] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [color, setColor] = useState<string>('');

	const dispatch = useAppDispatch();
	const error = useAppSelector(state => state.productReducer.error);
	const filterIsReduxOpen = useAppSelector(state => state.productReducer.isFilterAction);
	const highestPrice = Math.max(...priceArray);
	const filtredCategory = sneakersData.map(item => item.category)[0];
	
	useEffect(() => {
			setSneakersData(data);
	}, []);


	

	const handleOutSideClick = <T extends HTMLElement>(e: React.MouseEvent<T>) => {
	
		if (e.target === e.currentTarget) {
		  setIsFilter(false);
		  document.body.style.overflowY = 'auto';
		
		}
	 };
	 const handleOnChangeModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setModel(e.target.value)
	}
	const handleOnChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSize(e.target.value);
	}
	const handleOnChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		const priceValue = Number(e.target.value);
		setPrice(priceValue);
	}
	const handleOnChangecolor = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setColor(e.target.value);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
//если все значения выбраны!
if(model !=="" && size !=="" && price !== 0 && color !==""){
			const dataValue = {
				size,
				model,
				price,
				color,
				categories: filtredCategory,
			}
			
			dispatch(mainFilter(dataValue))
			if(filterIsReduxOpen === true){
				setIsFilter(true)
				return
			} else {
				setIsFilter(false);
				return
			}
		}
//если выбраны значения model size price
if(model !=="" && size !=="" && price !== 0){
	const dataValue = {
		size,
		model,
		price,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	
	return
}
//если выбраны значения model size color
if(model !=="" && size !=="" && color !==""){
	const dataValue = {
		size,
		model,
		color,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))

	return
}
//если выбраны значения size color price
if(size !=="" && color !=="" && price !== 0){
	const dataValue = {
		size,
		color,
		price,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	setIsFilter(false);
	return
}
//если выбраны значения model size
if(model !=="" && size !==""){
	const dataValue = {
		size,
		model,
		categories: filtredCategory,
		
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
	
 } 


//если выбраны значения size color
if(size !=="" && color !==""){
	const dataValue = {
		size,
		color,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
}
//если выбраны значения model color
if(model !=="" && color !==""){
	const dataValue = {
		model,
		color,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
}
//если выбраны значения model price
if(model !=="" && price !== 0){
	const dataValue = {
		model,
		price,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
}
//если выбраны значения size price
if(size !=="" && price !== 0){
	const dataValue = {
		size,
		price,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
}
//если выбраны значения color price
if(color !=="" && price !== 0){
	const dataValue = {
		color,
		price,
		categories: filtredCategory,
	}
	dispatch(mainFilter(dataValue))
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
}

if(model !== ""){
	 dispatch(mainFilter(model.toLocaleLowerCase())); 
	 setIsFilter(false);
	 return 
}
if(size !== ""){
	dispatch(mainFilter(size));
	setIsFilter(false);
	return 
}
if(color !== ""){
	dispatch(mainFilter(color));
	setIsFilter(false);
	return 
}
if(price !== 0){
	dispatch(mainFilter(price));
	setIsFilter(false);
	return 
} 
dispatch(mainFilter(''))

}

const handleRestFilter = () => {
		setModel('');
		setPrice(0);
		setSize('');
		setColor('');
		dispatch(mainFilter(''));
		
	}

	//вчера!!!
useEffect(() => {
	if(filterIsReduxOpen === true){
		setIsFilter(true)
		return
	} else {
		setIsFilter(false);
		return
	}
	
}, [filterIsReduxOpen]);	
	

	return (
		<div 
		onClick={handleOutSideClick} 
		className={classNames(`absolute visible 
		${isFilter ? "visible" : "invisible"} 
		${isFilter ? "opacity-100" : "opacity-0"} 
		transition:visible duration-300 bg-slate-500 w-full h-full left-0 top-0 z-50 bg-opacity-35`)}>
				<div className={classNames(` 
				${isFilter ? "translate-x-0" : "-translate-x-[100%]"} 
				transition:translate duration-300 max-w-[350px] p-[30px] w-full rounded-r-lg bg-slate-800 mt-[85px]`)}>
					<form 
					onSubmit={handleSubmit}>
					<label className='block'>
						<span className='block font-semibold text-white mb-2'>Model</span>
						<select className='w-full h-[30px] rounded-sm pl-2 mb-2' 
						name="model" onChange={handleOnChangeModel} 
						value={model}>
						<option 
						value="">
							Choose a model
						</option>
  								{nameArray.map((name, index) => {
									return(
										<option key={index} value={name}>{name}</option>
									)
								})}
						</select>
						</label>
						<label className='block'>
							<span className='block font-semibold text-white mb-2'>Size</span>
							<select className='w-full h-[30px] rounded-sm pl-2 mb-2' 
							name="size" 
							onChange={handleOnChangeSize} 
							value={size}>
							<option value="">Choose a size</option>
  								{sizeArray.map((size, index) => {
									return(
										<option key={index} value={size}>{size}</option>
									)
								})}
						</select>
						</label>
						<label className='block'>
							<span className='block font-semibold text-white mb-2'>Color</span>
							<select className='w-full h-[30px] rounded-sm pl-2 mb-2' 
							name="color" 
							onChange={handleOnChangecolor} 
							value={color}>
							<option value="">Choose a color</option>
  								{colorArray.map((color, index) => {
									return(
										<option key={index} value={color}>{color}</option>
									)
								})}
						</select>
						</label>
						<label className='block'>
							<span className='block font-semibold text-white mb-1'>Price</span>
						<input className='w-full' 
						onChange={handleOnChangePrice}
						 min="0" max={highestPrice} 
						 type="range" 
						 name="price" 
						 id="" 
						 value={price}/>
						<p className='font-semibold inline-block rounded-sm text-center pl-2 pr-2 pb-1 pt-1 bg-white text-gray-800'>from $: {price}</p>
						</label>
						{error && <p className='m-3 text-center text-white font-bold'>{error}</p>}
						<div className='flex justify-between mt-5'>
							
						<button className='bg-orange-300 flex items-center justify-center mr-2 h-[40px] p-3 rounded-md w-[60%] text-white font-semibold hover:bg-orange-400 transition-colors duration-300' type='submit'>Apply</button>
						<button 
						onClick={handleRestFilter}
						className='bg-orange-300 flex items-center justify-center h-[40px] p-3 rounded-md text-white font-semibold hover:bg-orange-400 transition-colors duration-300'>
							<GrPowerReset 
							size={25}/>
						</button>
						</div>
						
					</form>

				</div>
		</div>
	);
};

export default Filter;