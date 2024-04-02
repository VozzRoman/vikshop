import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { IProducts } from '../../types/ICard';
import useFadePageHook from '../../hooks/fadePageHook';

const Description: FC = () => {
	const [data, setData] = useState<IProducts | null>(null)
	const {isVisible} = useFadePageHook();
	const sneakersInfo = useAppSelector(state => state.productReducer.products);
	const {id} = useParams();
	

	useEffect(() => {
		const info = sneakersInfo.find(item => item.id === Number(id));
		if(info){
			setData(info);
		}
	}, [])

	return (
		<div className={`flex-none flex-grow-0 flex-shrink-1 w-510 
		${isVisible ? 'opacity-100': 'opacity-0'} 
		transition-opacity duration-500`}>
		<p className='text-black font-bold mb-5 text-[20px]'>Descriptions</p>
	<table className="border-collapse">
  <tbody className='w-full'>
  <tr className='w-full'>
      <td className="relative break-all w-60 font-semibold">Model</td>
      <td className="">{data?.name}</td>
    </tr>
    <tr className='w-full'>
      <td className="relative break-all w-60 font-semibold">Lining Material</td>
      <td className="">{data?.material}</td>
    </tr>
	 <tr className='w-full'>
      <td className="relative break-all w-60 font-semibold">Season</td>
      <td className="">{data?.seasons.map((name, index) => (<span key={index} className='mr-2'>{name}</span>))}</td>
    </tr>
	 <tr className='w-full'>
      <td className="relative break-all w-60 font-semibold">Shose Width</td>
      <td className="">{data?.size.map((size, index) => (<span className='mr-2' key={index}>{size}</span>))}</td>
    </tr>
	 <tr className='w-full'>
      <td className="relative break-all w-60 font-semibold">sex</td>
      <td className="">{data?.sex}</td>
    </tr>

  </tbody>
</table>
		</div>
	
	);
};

export default Description;