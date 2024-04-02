import { FC } from 'react';

const MessageInfo:FC = () => {
	return (
		<div className='fixed top-0 left-0 z-[300] flex items-center justify-center w-full h-full p-5'>
			<div className='max-w-[400px] w-full p-5 bg-slate-600 rounded-md'>
				<p className='text-center font-semibold text-white text-2xl'>Your order has been accepted. Thank you for your order! </p>
			</div>
		</div>
	
	);
};

export default MessageInfo;