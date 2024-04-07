import  { FC } from 'react';
import SliderHomePage from 'react-slick';
import './HomeSlcickTheme.scss';
import './HomeSlickSlider.scss';
import { useAppSelector } from '../../hooks/reduxHook';
import { IProducts } from '../../types/ICard';
import { Link, useLocation } from 'react-router-dom';

const HomeSlider:FC = () => {

const sneakersData = useAppSelector(state => state.productReducer.products);

const advetersmentData = (value1: string, value2: string, value3: string): IProducts[] => {
	const searchValues = [value1, value2, value3];
	const filteredData = sneakersData.filter(sneaker => searchValues.includes(sneaker.name));
	return filteredData;
}

const banner = advetersmentData('Adidas 4d Futurecraft', 'Adidas Forum Mid Ftw', 'Adidas 4DFWD');
const location = useLocation();
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		waitForAnimate: false,
		autoplay: true
	 };
	return (
		<div className='md:w-2/3 w-full md:h-96 h-72 bg-gradient-to-tr md:mr-5 rounded overflow-hidden'>
			<SliderHomePage {...settings} className='homePageSLider'>
				{banner.map(slide => {
					const model: string = `?model=${slide.name.split(' ').splice(1).join('_')}`
					return (
						<div key={slide.id}>
							<Link to={`sneakers/${slide.id + model}`} state={{from: location}}>
						<img src={slide.bunerImg} alt={slide.name} />
						<div className='p-4 absolute md:top-10 -top-3 text-red-700 md:right-20 z-20'>
						<h2 className='font-semibold font-semibold text-white text-5xl w-full text-orange-300'>Sale</h2><span className='text-white font-semibold text-xl'>20% buy it now</span>
						</div>
						</Link>
						</div>
					)
				})}

			</SliderHomePage>
			</div>
	);
};

export default HomeSlider;