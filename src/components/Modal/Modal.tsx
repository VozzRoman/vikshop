import classNames from 'classnames';
import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IProducts } from '../../types/ICard';
import { MdOutlineClose } from "react-icons/md";
import noImgae from '../../assets/images/no-img.png';
const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface ModalProps {
	onClose: () => void;
	isOpen: boolean;
	handlePrevBth: () => void;
	handleNexBth: () => void;
	imgIndex: number;
	data: IProducts;
}

const Modal: FC<ModalProps> = ({ data, onClose, isOpen, handlePrevBth, handleNexBth, imgIndex}) => {
	const [onImageError, setOnImageError] = useState<boolean>(false);
	//Оброботчик ошибок фото
const handleErrorImage = () => {
	setOnImageError(true)
}
const handleOutSideClick = <T extends HTMLElement>(e: React.MouseEvent<T>) => {
	if (e.target === e.currentTarget) {
	  onClose();
	}
 };
	
	return ReactDOM.createPortal (
		<div onClick={handleOutSideClick} className={classNames(`
		${isOpen ? "visible" : "invisible"} 
		${isOpen ? "opacity-100" : "opacity-0"} 
		fixed top-0 left-0 w-full flex justify-center items-center h-[100%] h-screen bg-slate-500 bg-opacity-35 transition-all duration-500 ease-in-out z-[300]`)}>
			<button className='disabled:fill-gray-500 fill-orange-500 hover:fill-red-800 transition:fill duration-300' 
			disabled={0 === imgIndex} 
			onClick={handlePrevBth}>
				< MdArrowBackIosNew 
				size={60} 
				className='fill-inherit'/>
			</button>
			<div className="relative max-w-[900px] w-[100%] max-h-[900px] h-[100vh]">
			<button className='absolute top-0 right-0 z-50 m-4 ' 
			onClick={onClose}>
				<MdOutlineClose className='fill-orange-500 hover:fill-red-800 transition:fill duration-300' 
				size={45}/>
			</button>
			<img 
			onError={handleErrorImage} 
			className={classNames(`absolute 
			${isOpen ? "scale-100" : "scale-0"}  
			opacity-100 rounded-md top-0 left-0 h-[900px] w-[100%] block object-contain transition:scale duration-300`)} 
			src={onImageError ? noImgae : data.imagePath[imgIndex]} 
			alt={data.name} />	
		</div>
			<button className='disabled:fill-gray-500 fill-orange-500 hover:fill-red-800 transition:fill duration-300' 
			disabled={data.imagePath.length - 1 === imgIndex} 
			onClick={handleNexBth}>
				<MdArrowForwardIos size={60} 
				className='fill-inherit'/>
			</button>
		</div>,
		modalRoot
	);
};

export default Modal;