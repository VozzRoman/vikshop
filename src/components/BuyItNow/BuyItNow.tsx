import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
// import {} from '../../assets/database/database';
import dataCounrty from '../../assets/database/database';
import Order from '../Order/Order';
import { ICard, IOrder } from '../../types/ICard';
import { useLocation } from 'react-router-dom';
import OrderFromBusket from '../OrderFromBusket/OrderFromBusket';


interface BuyItNowProp {
	handleToggleModal?: () => void;
	setMessage: (value: boolean) => void;
	oreder: IOrder | ICard[],
}

interface SendDataForm {
	name: string,
	email: string,
	zipCode: string,
	adress: string,
	phone: string,
	[key: string]: string | number;
}
interface SendDataCountry extends SendDataForm {
	country: string,
	city: string,
	productName: string,
	size: string,
	color: string,
	price: number,
}

const BuyItNow: FC<BuyItNowProp> = ({handleToggleModal, setMessage, oreder}) => {
	const [country, setCounty] = useState<string>('');
	const [city, setCity] = useState<string[]>([]);
	const [selectCity, setSelectCity] = useState<string>('');
	const [buttonStatus, setButtonStatus] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [itemsError, setItemsError] = useState<string>('');
	
	const [dataForm, setDataForm] = useState<SendDataForm>({
		name: '',
		email: '',
		zipCode:'',
		adress:'',
		phone:''

	}) 
	const {pathname} = useLocation();
	const busketData = useAppSelector(state => state.cartReducer.cart);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
	setDataForm(prev => {
	return {
		...prev,
		[e.target.name]: e.target.value,
	}
})

	}

	const handleOnSelectChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
		setCounty(e.target.value)
		const city = dataCounrty.find(item => item.countryName === e.target.value);
		if(city?.cityName){
			setCity(city?.cityName);
		}
		
	}
	const handleOnSelectCityChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
		setSelectCity(e.target.value);
	}

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailRegex.test(dataForm.email)) {
			return setError("incorrect email")
		} else {
			if(!Array.isArray(oreder)){
				const dataSend: SendDataCountry = {
					productName: oreder?.name || '',
					size: oreder?.size || '',
					color: oreder?.color || '',
					price: oreder?.price || 0,
					city: selectCity,
					country,
					...dataForm,
	
				}
				console.log('dataSend', dataSend);
				if(handleToggleModal){
					handleToggleModal()
				}
			} else {
				const total = oreder.map(item => item.price).reduce((acc, total) => acc + total, 0);
				const sendInfo = oreder.map(item => ({
					name: item.name,
					size: item.size,
					color: item.color,
					price: item.price,
				}))
				if(busketData.length <= 0){
					return setItemsError('please add some items!');
				}
				const dataSendBusket = {
					orders: [...sendInfo],
					total,
					city: selectCity,
					country,
					...dataForm,

				}
				console.log("dataSend2", dataSendBusket);
			}
		}
	 setDataForm({
		name: '',
		email: '',
		zipCode:'',
		adress:'',
		phone:''
	})
	setError('');
	setCounty('');
	setCity([]);
	setSelectCity('');


	setMessage(true);

	setTimeout(() => {
		setMessage(false);
	}, 4000)
	}

	useEffect(() => {
		let isAnyFieldEmpty = false;
		for (const key in dataForm) {
			if (dataForm[key] === '' || selectCity === '' || country === '') {
				isAnyFieldEmpty = true;
				break;
			} 
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(emailRegex.test(dataForm.email)) {
			setError("")
		}
		setButtonStatus(isAnyFieldEmpty);
	}, [dataForm, selectCity, country, error])


	const renderMarkUp = () => {
		if(pathname !== '/makeOrderPage') {
			return <Order/>
		} else {
			return <OrderFromBusket/>
		}
	}
	

	return (
	<div>
	{renderMarkUp()}
	
		<form 
		onSubmit={handleSubmit} 
		className={`md:mt-5 mt-2 md:p-3 
		${pathname ==='/makeOrderPage' ? "max-w-[700px]" : 'w-full'} 
		${pathname ==='/makeOrderPage' ? "max-h-full" : 'max-h-[450px]'} 
		md:max-h-full overflow-auto pr-3`}>
		<div className='md:flex md:justify-between'>
			<label className='mb-2 block w-[100%] md:max-w-[250px]'>
				<span className='md:text-[16px] text-sm text-20px block font-bold mb-1'>Name</span>
				<input 
				onChange={handleOnChange} 
				className='border border-slate-400 w-full md:h-10 md:text-[16px] text-sm h-[35px] text-20px rounded-sm p-3' 
				placeholder='enter your name' 
				type="text" 
				name='name' 
				value={dataForm.name}/>
			</label>
			<label className='mb-2 block w-[100%] md:max-w-[250px]'>
				<span className='block md:text-[16px] text-sm text-20px font-bold mb-1'>Email</span>
				<input 
				onChange={handleOnChange}  
				className='border border-slate-400 w-full h-10 rounded-sm p-3 md:h-10 md:text-[16px] text-sm h-[35px]' 
				placeholder='enter your mail' 
				type="text" 
				name='email' 
				value={dataForm.email}/>
			</label>
		</div>
		<div className='md:flex md:justify-between'>
			<label className='mb-2 block w-[100%] md:max-w-[250px]'>
			<span className='block md:text-[16px] text-sm text-20px font-bold mb-1'>Country</span>
			<select 
			onChange={handleOnSelectChange} 
			className='border border-slate-400 w-full h-10 rounded-sm p-2 md:h-10 md:text-[16px] text-sm h-[35px]' 
			value={country}>
						{dataCounrty.map(item => (
							<option key={item.countryName} 
								value={item.countryName}>
								{item.countryName}
							</option>
						))}
			</select>
			</label>
			<label className='mb-2 w-[100%] md:max-w-[250px]'>
			<span className='flex md:text-[16px] text-sm text-20px items-center font-bold mb-1 text-black'>City<p className='text-sm font-normal ml-1'>(before choose country)</p></span>
			<select 
			onChange={handleOnSelectCityChange} 
			className='border border-slate-400 w-full h-10 rounded-sm p-2 md:h-10 md:text-[16px] text-sm h-[35px]' 
			value={selectCity}>
			{city.map(item => (
							<option 
							key={item} 
							value={item}>
							{item}
							</option>
						))}
					</select>
			</label>
		</div>
		<div className='md:flex md:justify-between'>
			<label className='mb-2 block w-[100%] md:max-w-[250px]'>
				<span className='block md:text-[16px] text-sm text-20px font-bold mb-1'>Zip code</span>
				<input 
				onChange={handleOnChange}  
				className='border border-slate-400 w-full h-10 h-10 rounded-sm p-3 md:h-10 md:text-[16px] text-sm h-[35px]' 
				placeholder='enter your zip code' 
				type="number" 
				name='zipCode' 
				value={dataForm.zipCode}/>
			</label>
			<label className='mb-2 block w-[100%] md:max-w-[250px]'>
				<span className='block md:text-[16px] text-sm text-20px font-bold mb-1'>Adress</span>
				<input 
				onChange={handleOnChange}  
				className='border border-slate-400 w-full h-10 rounded-sm p-3 md:h-10 md:text-[16px] text-sm h-[35px]' 
				placeholder='enter your adress' 
				type="text" 
				name='adress' 
				value={dataForm.adress}/>
			</label>
		</div>
		<label className='mb-2 block w-[100%] md:max-w-[250px]'>
				<span className='block md:text-[16px] text-sm text-20px font-bold mb-1'>Phone</span>
				<input 
				onChange={handleOnChange}  
				className='border border-slate-400 w-full h-10 rounded-sm p-3 md:h-10 md:text-[16px] text-sm h-[35px]' 
				placeholder='enter your phone' 
				type="number" 
				name='phone' 
				value={dataForm.phone}/>
		</label>
		{error && <p className='text-center text-red-700 mt-4'>{error}</p>}
		{itemsError && <p className='text-center text-red-700 mt-4'>{itemsError}</p>}
		<button 
		disabled={buttonStatus} 
		type='submit' 
		className={`
		${buttonStatus ? 'bg-slate-300' : "bg-orange-300"} 
		${buttonStatus ? 'hover:bg-slate-300' : "hover:bg-orange-400"}
		h-[35px] rounded-sm w-full md:mt-5 mt-2 text-white font-semibold  transition-colors duration-300`}>create order
		</button>
		</form>
	
	</div>

	);
};

export default BuyItNow;