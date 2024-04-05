import  { FC, useState } from 'react';
import SliderPopular from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PopularSLider.scss";
import { Link, useLocation } from 'react-router-dom';
import { IProducts } from '../../types/ICard';
import noImage from '../../assets/images/no-img.png';

interface PopularSliderProp {
	filteredData: IProducts[]
}

const PopularSlider: FC<PopularSliderProp> = ({filteredData}) => {
	const [imageErrors, setImageErrors] = useState(new Array(filteredData.length).fill(false));
	const location = useLocation();

	//Оброботчик ошибок фото
	const handleImageError = (index: number) => {
		const updatedErrors = [...imageErrors];
		updatedErrors[index] = true;
		setImageErrors(updatedErrors);
	};
	
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		speed: 2000,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplaySpeed: 8000,
		autoplay: true,
		responsive: [
			{
			  breakpoint: 1280,
			  settings: {
				 slidesToShow: 4,
				 slidesToScroll: 3,
				 infinite: true,
				
			  }
			},
			{
			  breakpoint: 1024,
			  settings: {
				 slidesToShow: 3,
				 slidesToScroll: 2,
				 initialSlide: 2
			  }
			},
			{
				breakpoint: 620,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 2,
				  initialSlide: 2
				}
			 },
			{
			  breakpoint: 475,
			  settings: {
				 slidesToShow: 1,
				 slidesToScroll: 1
			  }
			}
		 ]
	 };
	return (
		<div className='w-full mt-8'>
			<SliderPopular {...settings} className="popularSlider">
			{filteredData.map((item, index) => {
				const model: string = `?model=${item.name.split(' ').splice(1).join('_')}`
					return (
					<div className="cursor-pointer" key={index}>
							<div>
								<Link to={`sneakers/${item.id + model}`} state={{from:location}}>
								<img 
								onError={() => handleImageError(index)} 
								className='h-[200px]' src={imageErrors[index] ? noImage : item.imagePath[0]} 
								alt={item.name} /> 
								<p className='p-2 text-center font-medium'>{item.name.split(' ').splice(0,2).join(' ')}</p>
								</Link>
							</div>
							
					</div>
					)
				})}

			</SliderPopular>
			
		</div>
	);
};

export default PopularSlider;