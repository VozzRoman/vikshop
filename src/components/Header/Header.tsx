import { FC, useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import Busket from '../Busket/Busket';
import { Link, NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import SearchForm from '../SearchForm/SearchForm';
import { RxHamburgerMenu } from "react-icons/rx";
import classNames from 'classnames';
import { filteredSneakers, resetSearchQeary } from '../../redux/Products/productSlice';
import Headroom from 'react-headroom';
import './HeaderStyle.scss';






const activeStyle = {
	color: "#485667",
 };


const Header: FC = () => {
const dataCart = useAppSelector(state => state.cartReducer.cart);
const dispatch = useAppDispatch();
const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
const [isShowCard, setIsShowCard] = useState<boolean>(false);

const outCloseReff = useRef<HTMLDivElement>(null);

const handleBasketOpen = () => {
		setIsShowCard(prev => !prev);
		setIsOpenCatalog(false);
		document.body.style.overflow = isShowCard ? 'auto' : 'hidden';
	}


const total = dataCart.reduce((acc, total) => acc + (total.price * total.count), 0);

const handleOusideClick = (e: MouseEvent) => {
console.log("click");
if (outCloseReff.current && !outCloseReff.current.contains(e.target as Node)) {
	setIsShowCard(false);
	setIsOpenCatalog(false);
	
	document.body.style.overflow = 'auto';

}
}

const resetSneakersPage = () => {

	dispatch(filteredSneakers(''));
	setIsOpenCatalog(false)
}

const handleCatalogOpen = () => {
	setIsOpenCatalog(prev => !prev)
	setIsShowCard(false);
		
}
//при переходе на другую страницу закрываем меню католога!!!
const closeCatalog = () => {
	dispatch(filteredSneakers(''));
	setIsOpenCatalog(false)
	

}
const resetHomePage = () => {
	setIsOpenCatalog(false);
	dispatch(filteredSneakers(''));
	dispatch(resetSearchQeary([]));
}

const handleCloseBasketOnbackDrop = <T extends HTMLElement>(e: React.MouseEvent<T>) => {
	if (e.target === e.currentTarget) {
		setIsOpenCatalog(false);
		document.body.style.overflow = 'auto';
	 }
}

useEffect(() => {
	if(isOpenCatalog === true || isShowCard === true){
		document.addEventListener("click", handleOusideClick);
		return () => {
			document.removeEventListener("click", handleOusideClick);
		}
	}

}, [isShowCard, isOpenCatalog])




	return (
		<div>		
				<Headroom className='header' disableInlineStyles>
				<Container>
				<div 
				ref={outCloseReff} 
				className='relative'>
				<div className='flex items-center justify-between relative'>
					<Link className='md:block hidden' 
					onClick={resetHomePage}  
					to='/'>
					<p className='text-white font-medium text-[30px] font-semibold whitespace-nowrap'>Vik<span className=' font-normal text-red-400'> Express</span></p>
					</Link>
					<button 
					onClick={handleCatalogOpen} 
					className='hidden md:inline-block max-w-[150px] w-full ml-5 bg-orange-300 rounded-sm h-[35px] mr-auto hover:bg-orange-400 transition-colors duration-300 text-white font-semibold'>
					All Categories
					</button>
					<button 
					onClick={handleCatalogOpen} 
					className='md:hidden md:ml-5'>
					<RxHamburgerMenu 
					size={35} 
					color='orange'/>
					</button>
					<div onClick={handleCloseBasketOnbackDrop} className={`absolute left-0 w-full h-screen bg-transparent md:top-[63px] top-[55px] transition:visible duration-500 ease-in-out
					 ${isOpenCatalog ? "visible" : "invisible"} 
					 ${isOpenCatalog ? "opacity-100" : "opacity-0"}
					`}>
					 <ul id="sidebar" className={classNames(`absolute 
					 ${isOpenCatalog ? "visible" : "invisible"} 
					 ${isOpenCatalog ? "h-[460px]" : "h-[0px]"} 
					 ${isOpenCatalog ? "opacity-100" : "opacity-0"} 
					 md:left-[0px] -left-[10px] bg-slate-400 z-[200] p-5 max-w-[200px] w-full rounded-sm transition:visible duration-500 ease-in-out shadow-md`)}>
						<li className=''>
							<NavLink onClick={resetHomePage}  className={scss.navLink} style={({ isActive }) => (isActive ? activeStyle : undefined)}  to="/">Home</NavLink>
						</li>
						<li className='' >
							<NavLink onClick={resetSneakersPage}  className={scss.navLink} style={({ isActive }) => (isActive ? activeStyle : undefined)}  to="/sneakers">Sneakers</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={scss.navLink} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/t-shirts">T-Shirts</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={scss.navLink} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/testPage">Sports suit</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={`${scss.navLink} pointer-events-none opacity-50`} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/unabled">Caps</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={`${scss.navLink} pointer-events-none opacity-50`} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/unabled">Long sleeves</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={`${scss.navLink} pointer-events-none opacity-50`} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/unabled">Shorts</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={`${scss.navLink} pointer-events-none opacity-50`} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/unabled">Hoodie</NavLink>
						</li>
						<li>
							<NavLink onClick={closeCatalog} className={scss.navLink} style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/makeOrderPage">My orders</NavLink>
						</li>
					</ul>
					</div>
					<SearchForm />
				<div>

			<div className='relative'>
				<PiShoppingCartSimpleBold className='w-9 h-9 cursor-pointer fill-orange-500 hover:fill-orange-300 transition ease-linear duration-300' 
				onClick={handleBasketOpen}/>
				<div className='absolute bottom-1 -left-1 z-30 bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center'>
					<p className='text-red-800 text-xs font-bold'>{dataCart.length}</p>
				</div>
			</div>
				</div>
				</div>
				<Busket 
				isShowCard={isShowCard} 
				total={total} 
				setIsShowCard={setIsShowCard}/>			
				</div>
				</Container>
			</Headroom>
		</div>
	);
};

export default Header;