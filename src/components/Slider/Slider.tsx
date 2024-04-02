import SliderProduct from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import './slickSLider.scss';
import './slickTheme.scss';
import { IProducts } from "../../types/ICard";
import { FC, useState } from "react";
import noImage from '../../assets/images/no-img.png';
import Modal from "../Modal/Modal";

interface SliderProps {
	data: IProducts,
}

const Slider: FC<SliderProps> = ({data}) => {
const [isOpen, setIsOpne ] = useState<boolean>(false);
const [imgIndex, setImagIndex] = useState<number>( -1);
const [imageErrors, setImageErrors] = useState(new Array(data.imagePath.length).fill(false));

const handleOnImageError = (index: number) => {
	const updatedErrors = [...imageErrors];
	updatedErrors[index] = true;
	setImageErrors(updatedErrors);
 };

const onCLose = () => {
	setIsOpne(false)
	document.body.style.overflow = 'auto';
}

const onOpen = (index: number) => {
	setIsOpne(true)
	setImagIndex(index);
	document.body.style.overflow = 'hidden';
}
const handleNexBth = () => {
	if(imgIndex >= data.imagePath.length) return
	setImagIndex(imgIndex + 1);
}
const handlePrevBth = () => {
	if(imgIndex <= 0) return
	setImagIndex(imgIndex -1);
	
}
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots: React.ReactNode) => ( // если чилдренны то нужно указывать ReactNode
			<div
			  style={{
				position:"static",
				 backgroundColor: "#ddd",
				 borderRadius: "10px",
				 fontSize:"0",
			  }}
			>
			  <ul className="flex rounded-md"> {dots} </ul>
			</div>
		),
		customPaging: (i: number) => (
				<div style={{height:"70px"}}>
			<img 
			onError={() => handleOnImageError(i)} 
			style={{height:"70px", width:"100%", borderRadius:"4px", objectFit:"cover"}} 
			src={imageErrors[i] ? noImage  : data.imagePath[i]} alt={data.name}/>
			</div>
		),

	 };

	return (
		<>
		<div className="max-w-[480px] w-full m-auto">
		    <SliderProduct {...settings} className="productSLider">
				{data.imagePath.map((image, index) => {
					return (
						<div className="cursor-pointer" key={index}>
						<img onError={() => handleOnImageError(index)} 
						className="rounded-md" 
						onClick={() => onOpen(index)} src={imageErrors[index] ? noImage  : image} 
						alt={data.name} /> 
					</div>
					)
				})}
    		</SliderProduct>
			</div>
			
		<Modal data={data} 
		imgIndex={imgIndex} 
		handleNexBth={handleNexBth} 
		handlePrevBth={handlePrevBth}  
		isOpen={isOpen} 
		onClose={onCLose}/>
		</>
	);
};

export default Slider;