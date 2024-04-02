import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineClose } from "react-icons/md";
const modalRoot = document.getElementById('modal-root') as HTMLElement;
interface ModalProps {
	handleToggleModal: () => void;
	isOpen: boolean,
	children?: ReactNode, 
}

const ModalByIt: FC<ModalProps> = ({children, handleToggleModal , isOpen}) => {


	const handleOutSideClick = <T extends HTMLElement>(e: React.MouseEvent<T>) => {
		if (e.target === e.currentTarget) {
		handleToggleModal();
		document.body.style.overflow = 'auto';
		}
	 };
	 const closeModal = () => {
		handleToggleModal();
		document.body.style.overflow = 'auto';
	 }

	return ReactDOM.createPortal(
		<div onClick={handleOutSideClick} className={classNames(`
		${isOpen ? 'visible' : 'invisible'}
		${isOpen ? "opacity-100" : "opacity-0"} 
		fixed top-0 left-0 w-full flex justify-center items-center h-[100%] h-screen bg-slate-500 bg-opacity-35 transition-all duration-700 ease-in-out z-[300]
		`)}>

		<div className={classNames(`absolute md:p-[20px] pl-[20px] pr-[20px] pt-[20px] pb-[30px] 
		${isOpen ? "scale-100" : "scale-0"}  
		opacity-100 rounded-md max-w-[600px] w-[100%] border-black shadow-lg block object-contain transition:scale duration-300 bg-slate-400`)}>
			<div className=''>
		<button className='' 
		onClick={closeModal}>
					<MdOutlineClose className='fill-orange-500 hover:fill-red-800 transition:fill duration-300' 
				size={25}/>
		</button>
		</div>
			{children}
		</div>
	
	</div>,
	modalRoot
	)
};

export default ModalByIt;