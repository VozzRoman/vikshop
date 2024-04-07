import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { filteredSneakers } from '../../redux/Products/productSlice';
import { FiSearch } from "react-icons/fi";

import { useNavigate, useSearchParams } from 'react-router-dom';



const SearchForm: FC = () => {
	const dispatch = useAppDispatch();
	const linkRootData = useAppSelector(state => state.linkRootReducer.root);
	const [searchParams, setSearchParams] = useSearchParams();
	searchParams;
	const navigate = useNavigate();
	

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	   const form = e.target as HTMLFormElement;
    	const queryInput = form.elements.namedItem('query') as HTMLInputElement;
		 const brend = queryInput.value;
		
		if(linkRootData === '/sneakers'){
			if(brend === "") return;
			setSearchParams({brend})
			dispatch(filteredSneakers(brend.toLocaleLowerCase().trim()))
			navigate(`/sneakers?brend=${brend}`)
			queryInput.value = '';
			return
		}
		if(linkRootData === '/'){
			if(brend === '') return;
			setSearchParams({brend});
			dispatch(filteredSneakers(brend.toLocaleLowerCase().trim()));
			navigate(`/?brend=${brend}`)
			queryInput.value = '';
			return
		}
		if(linkRootData === '/t-shirts'){
			if(brend === "") return;
			setSearchParams({brend})
			dispatch(filteredSneakers(brend.toLocaleLowerCase().trim()))
			navigate(`/t-shirts?brend=${brend}`)
			queryInput.value = '';
			return
		}
		if(linkRootData === '/makeOrderPage'){
			if(brend === "") return;
			setSearchParams({brend})
			dispatch(filteredSneakers(brend.toLocaleLowerCase().trim()))
			navigate(`/?brend=${brend}`)
			queryInput.value = '';
			return
		}
	
	}

	return (
		<form 
		onSubmit={handleSubmit} 
		className=' md:mr-10 mr-5 relative flex items-center h-[32px] max-w-[700px] w-[100%] ml-5'>
			<div className='relative w-full'>
			<input 
			className='w-full pt-2 pb-2 pl-3 pr-3 rounded-s-sm rounded-e-lg' 
			type="text" 
			placeholder='search' 
			name='query'/>
			<button className='absolute top-0 right-[0px]  w-[40px] h-[40px] bg-orange-300 hover:bg-orange-500 transition-colors duration-300 rounded-e-lg' 
			type='submit'>
		<FiSearch 
			size={40} 
			color='white' 
			className='pointer-events-none h-full pl-2 pr-2'/>
			</button>
			</div>
		</form>
	);
};

export default SearchForm;