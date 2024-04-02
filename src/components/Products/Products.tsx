import  { FC, useEffect, useState } from 'react';

import Container from '../Container/Container';
import Card from '../Card';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { filteredSneakers } from '../../redux/Products/productSlice';
import { useSearchParams } from 'react-router-dom';
import { IoFilterCircleSharp } from "react-icons/io5";
import Filter from '../Filter/Filter';
import { IProducts } from '../../types/ICard';
import { useInView } from 'react-intersection-observer';


const Products: FC = () => {
const [searchParams, setSearchParams] = useSearchParams();
const [isFilter, setIsFilter] = useState<boolean>(false);
searchParams;	
const {products, filteredProducts , query} = useAppSelector(state => state.productReducer);

//Filter only sneakers
const sneakers = products.filter(sneaker => sneaker.category === 'sneakers');
const sneakersFiltered = filteredProducts.filter(sneaker => sneaker.category === 'sneakers');
const dispatch = useAppDispatch();

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
	const startIndex = (currentPage - 1) * itemsPerPage;
	const newProd = sneakers.slice(startIndex, startIndex + itemsPerPage);
	setScrollProducts([...scrollProducts, ...newProd]);
}, [currentPage]);

useEffect(() => {
		if(inView === true){
			if(scrollProducts.length !== sneakers.length){
				return setCurrentPage(prev => prev + 1)
			} else {
				console.log('no page');
			}
			
	
	}
	

},[inView])

	const renderProducts = () => {
		if (sneakersFiltered.length > 0) return sneakersFiltered.map(card => (		
			<Card 
			forwardRef={ref} 
			key={card.id} 
			item={card}/>
		  ))
	  if (!sneakers.some(item => item.name.includes(query))) {
			return <h3 
			className='w-full text-xl text-center font-semibold m-3'>No product found make another query</h3>
  
	  } else {
		return scrollProducts.map(card => (<Card 
			forwardRef={ref} 
			key={card.id} 
			item={card}/>	));
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
				<button 
				onClick={handleFilterOpen} 
				className='ml-3 fill-orange-400 hover:fill-orange-300 transition-colors duration-300'>
				<IoFilterCircleSharp 
				size={40} 
				stroke={'white'} 
				className='fill-inherit'/>
				</button>
				{!sneakers.some(item => item.name.includes(query)) && 
				<div 
				className='flex w-full'>
				<button 
				className=' hover:text-orange-500 underline transition-colors duration-300 p-0.5 rounded-md text-gray-900 font-medium max-w-[100px] w-full' 
				onClick={handleBackToList}>Back to list</button>
				</div>}
				</div>
            <ul 
				className='flex flex-wrap'>
                {renderProducts()}
            </ul>
				<Filter 
				data={sneakers} 
				setIsFilter={setIsFilter} 
				isFilter={isFilter}/>
        </Container>
	);
};

export default Products;