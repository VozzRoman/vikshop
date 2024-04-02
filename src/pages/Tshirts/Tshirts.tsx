import  { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { filteredSneakers } from '../../redux/Products/productSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { IoFilterCircleSharp } from "react-icons/io5";

import { IProducts } from '../../types/ICard';
import { useInView } from 'react-intersection-observer';
import Card from '../../components/Card';
import Container from '../../components/Container/Container';
import { getLinkRoot } from '../../redux/Link/sliceLink';
import Filter from '../../components/Filter/Filter';


const Tshirts: FC = () => {
	const {products, filteredProducts , query} = useAppSelector(state => state.productReducer);
	const {pathname} = useLocation();
	
	//Filter only tShirts
	const tShirts = products.filter(sneaker => sneaker.category === 'tshirts');
	const tShirtsFiltered = filteredProducts.filter(sneaker => sneaker.category === 'tshirts');
	
	
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isFilter, setIsFilter] = useState<boolean>(false);
	console.log(searchParams);
	//InfinitScroll
	const [scrollProducts, setScrollProducts] = useState<IProducts[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	
	//Monitor element
	const {ref, inView} = useInView({
		threshold: 1, // Порог для определения видимости
		triggerOnce: true,
	});
	const itemsPerPage = 10;

	useEffect(() => {
		dispatch(getLinkRoot(pathname));
		}, [pathname, dispatch])
	
	
	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const newProd = tShirts.slice(startIndex, startIndex + itemsPerPage);
		console.log("NewProd", newProd);
		setScrollProducts([...scrollProducts, ...newProd]);
	
	}, [currentPage]);
	
	useEffect(() => {	
			if(inView === true){
				if(scrollProducts.length !== tShirts.length){
					return setCurrentPage(prev => prev + 1)
				} else {
					console.log('no page');
				}
		}
		
	
	},[inView])
	
		const renderProducts = () => {
			if (tShirtsFiltered.length > 0) return tShirtsFiltered.map(card => (		
				<Card forwardRef={ref} key={card.id} item={card}/>
			  ))
		  if (!tShirts.some(item => item.name.includes(query))) {
				return <h3 className='w-full text-xl text-center font-semibold m-3'>No product found make another query</h3>
	  
		  } else {
			return scrollProducts.map(card => (<Card forwardRef={ref} key={card.id} item={card}/>	));
		  } 
	  }
	
	  const handleBackToList = () => {
		dispatch(filteredSneakers(''));
		setSearchParams({});
		
	  }
	  const handleFilterOpen = () => {
		setIsFilter(prev => !prev);
		document.body.style.overflow = 'hidden';
	  }
		return (
				  <Container>
					<div className='flex'>
					<button onClick={handleFilterOpen} className='ml-5 fill-orange-400 hover:fill-orange-300 transition-colors duration-300'><IoFilterCircleSharp size={40} stroke={'white'} className='fill-inherit'/></button>
					{!tShirts.some(item => item.name.includes(query)) && 
					<div className='flex w-full'>
						<button className=' hover:text-orange-500 underline transition-colors duration-300 p-0.5 rounded-md text-gray-900 font-medium max-w-[200px] w-full' onClick={handleBackToList}>Back to list</button>
					</div>}
					</div>
					<ul className='flex flex-wrap'>
						 {renderProducts()}
					</ul>
					<Filter data={tShirts} setIsFilter={setIsFilter} isFilter={isFilter}/>
			  </Container>
		);
	};

export default Tshirts;