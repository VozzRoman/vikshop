import { FC, useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

import Container from '../../../components/Container/Container';
import { useAppSelector } from '../../../hooks/reduxHook';
import { IProducts } from '../../../types/ICard';

import Slider from '../../../components/Slider/Slider';
import useFadePageHook from '../../../hooks/fadePageHook';

const InfoSneakersPage: FC = () => {
	const [data, setData] = useState<IProducts | null>(null)
	const {isVisible} = useFadePageHook();
	const sneakers = useAppSelector(state => state.productReducer.products);
	const {id} = useParams<{id: string}>();
	useEffect(() => {
		const sneaker = sneakers.find(item => item.id === Number(id));
		if(sneaker){
			setData(sneaker);
		}
		
	}, [])

	return (
		<div className={`border-b ${isVisible ? 'opacity-100': 'opacity-0'} transition-opacity duration-500`}>
		{data !== null && <Container>
				<Slider data={data}/>
		</Container>}
		</div>
	);
};

export default InfoSneakersPage;