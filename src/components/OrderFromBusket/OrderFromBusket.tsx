
import { useAppSelector } from '../../hooks/reduxHook';

const OrderFromBusket = () => {
	const busketData = useAppSelector(state => state.cartReducer.cart);
	const total = busketData.map(item => item.price * item.count).reduce((acc, total) => acc + total, 0);
	
	return (
		<ul>
		{busketData.length === 0 && <p className='text-[18px] font-semibold'>You don not have any items</p>}
		{busketData.map((card) => (
			<li className='border-b-2 p-2 mb-3' 
			key={card.id}>
				<div className='flex'>
				<img className='rounded-md h-[80px]' 
				src={card.imagePath[0]} 
				alt={card.name} 
				height="80" 
				width="80"/>
				<div className='max-w-[200px] w-full'>
				<div className='flex sm:justify-between justify-end'>
				<p className='ml-5 text-black font-bold text-[18px] sm:block hidden'>{card.name.split(' ').splice(0,3).join(' ')}</p>
				<div style={{height:"26px", padding:"12px", border:"1px solid gray",background:`${card.color[0]}`, marginLeft:"10px", borderRadius:"4px"}}></div>
				</div>
				<p className='text-[18px] ml-5'>size: {card.size[0]}</p>
				</div>
				<div className='flex items-center ml-10'>
					<p className='font-bold sm:block flex items-center'>x<span className='text-[20px] font-semibold'> {card.count}</span></p>
				</div>
				<p className='flex items-center ml-10 text-[20px] font-semibold'><span className='text-[18px] mr-1 font-normal'>price: </span> {card.price * card.count}$</p>
				</div>
			</li>
		))}
		<div>
			<p className='flex justify-end mr-[50px] text-[25px] font-semibold'><span className='font-normal mr-1'>total:</span> {total}$</p>
		</div>
		</ul>
	);
};

export default OrderFromBusket;