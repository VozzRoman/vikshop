import { FC, useEffect} from 'react';
import Container from '../../components/Container/Container';
import { useAppSelector } from '../../hooks/reduxHook';
import Card from '../../components/Card';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLinkRoot } from '../../redux/Link/sliceLink';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import PopularSlider from '../../components/PopularSlider/PopularSlider';
import useFadePageHook from '../../hooks/fadePageHook';
import man from '../../assets/images/man.png';

const HomePage: FC = () => {
const {isVisible} = useFadePageHook();
	const {query, filteredProducts, products } = useAppSelector(state => state.productReducer);
	const {pathname} = useLocation();
	const dispatch = useDispatch();

	const filteredSneakers = products.filter(sneaker => sneaker.category === 'sneakers' && sneaker.rating >= 5);
	const filteredTshirts = products.filter(sneaker => sneaker.category === 'tshirts');
	
	const renderProducts = () => {
		if (filteredProducts.length > 0) {
			return (
				<ul className='flex flex-wrap'>
				{filteredProducts.map(card => (		
					<Card forwardRef={null} key={card.id} item={card}/>
				  ))}
				</ul>
			)
		}
		if (!products.some(item => item.name.includes(query))) {
			return <h3 className='w-full text-xl text-center font-semibold m-3'>No product found make another query</h3>
	  }
	  if(filteredProducts.length === 0) {
		return (
			<div className={`
			${isVisible ? 'opacity-100': 'opacity-0'} 
			transition-opacity duration-500`}>
			<div className='md:block hidden relative pt-7 pb-10 overflow-hidden'>
			<h1 className='text-[white]  lg:text-[60px] text-[40px] pl-10 font-semibold bg-gradient-to-r rounded-sm from-blue-700 to-transparent w-full'>Welcome </h1>
			<div className='text-[white] lg:text-[60px] text-[30px] flex justify-end font-semibold pr-10 rounded-sm bg-gradient-to-r from-transparent to-orange-400 '>Vik <span className='ml-4 lg:text-[60px] text-[30px] text-orange-700'>Express</span> </div>
			<img className='absolute top-[10px] left-1/2 -translate-x-1/2  min-[1190px]:w-[350px] min-[1190px]:h-[320px] w-[270px] h-[250px]' src={man} alt="" />
			</div>
			<div className='flex mb-10'>
				<HomeSlider/>
				<div className='md:flex items-end hidden p-5 relative w-1/3 h-96 bg-gradient-to-tr bg-purple-900 rounded overflow-hidden'>
				
				<h2 className='relative text-white z-20 text-[40px] font-semibold leading-10'><span className='block'>Up to 60% off</span> 
Save more with coupons</h2>
				<img className='absolute top-0 left-0 w-full object-cover h-full opacity-65' src="https://i8.amplience.net/i/jpl/jd_668572_a?qlt=92&w=750&h=957&v=1&fmt=auto" alt="" />
			
	
				</div>
			</div>
			<h2 className='text-black-700 font-semibold text-2xl border-b-2 pb-2'>Popular sneakers</h2>
			<div className='md:pl-7 md:pr-7 pl-14 pr-14'>
			<PopularSlider filteredData={filteredSneakers}/>
			</div>
			<h2 className='text-black-700 font-semibold text-2xl border-b-2 pb-2 mt-10'>Popular T-shirts</h2>
			<div className='md:pl-7 md:pr-7 pl-14 pr-14'>
			<PopularSlider filteredData={filteredTshirts}/>
			</div>
			
			
			</div>
		)
	  }

  }	

	useEffect(() => {
dispatch(getLinkRoot(pathname));
}, [pathname, dispatch])

	return (
		<Container>
			{renderProducts()}
		</Container>
	);
};

export default HomePage;
