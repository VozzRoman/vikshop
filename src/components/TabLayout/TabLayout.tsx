import { FC, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Container from '../Container/Container';
import RightSideProdInfo from '../RightSideProdInfo/RightSideProdInfo';
import { useAppSelector } from '../../hooks/reduxHook';
import { TiArrowBack } from "react-icons/ti";
import useFadePageHook from '../../hooks/fadePageHook';

const activeStyle = {
	color: 'orange',
}

const TabLayout: FC = () => {
	const {isVisible} = useFadePageHook();
	const data= useAppSelector(state => state.productReducer.products);
	const {id} = useParams<{id: string}>();
	const {state} = useLocation();
const searchLink = useRef(state?.from.search);
const backLink = useRef(state?.from.pathname);


	const item = data.find(prod => prod.id === Number(id))!;
	const model: string = `?model=${item?.name.split(' ').splice(1).join('_')}`

	return (
		<div className={`${isVisible ? 'opacity-100': 'opacity-0'} transition-opacity duration-500`}>
		<Container>
		<ul className='text-slate-800 flex mb-5 border-b-2 pb-1 font-[500]'>
		<li className='mr-6'>
			<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to={`/sneakers/${id}${model}`} end>About</NavLink>
		</li>
		<li className='mr-6'>
			<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to={`/sneakers/${id}/description${model}`}>Description</NavLink>
		</li>
		<li className='mr-6'>
			<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to={`/sneakers/${id}/reviews${ model}`}>Reviews</NavLink>
		</li>
	</ul>
	<Link to={backLink.current === '/' || backLink.current === undefined ? "/" : `${backLink.current}${searchLink.current}`} className='text-slate-500 mb-3 hover:text-orange-700 transition-colors duration-300 inline-flex items-center'><TiArrowBack style={{width:"25px", height:"25px"}}/><span>Back</span></Link>
	<section className='lg:flex border-b-2 pb-10'>
	
	<Outlet/>
	<RightSideProdInfo/>	
	</section>
	</Container>
	</div>

	);
};

export default TabLayout;