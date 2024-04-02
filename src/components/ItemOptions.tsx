import classNames from 'classnames';
import { FC } from 'react';
import { IProducts } from '../types/ICard';

interface IItemOptions {
	item: IProducts,
	activeColor: string | null,
	handleSelectSize: (e: React.ChangeEvent<HTMLSelectElement>) => void,
	handleSelectColor: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, data: string) => void

}

const ItemOptions: FC<IItemOptions> = ({item, activeColor, handleSelectSize, handleSelectColor}) => {
	return (
		<div className='flex justify-between p-1'>
		<ul className='flex'>
		{item.color.map((color, index) => (
		<li  style={{background:`${color}`}} 
			onClick={(e) => handleSelectColor(e, color)} 
			data-value={color} 
		className={classNames(`cursor-pointer mr-2 p-3.5 border border-orange-600 rounded-md hover:opacity-100 transition-opacity duration-300`, {
			'opacity-100': activeColor === color,
			'opacity-40': activeColor !== color
	  })} 
		key={index}>
		</li>))}
		</ul>
		<select className='font-medium cursor-pointer border rounded-md p-1 ' 
		defaultValue={item.size[0]} 
		onChange={handleSelectSize}>
			{item.size.map((size, index) => (<option key={index} value={size}>{size}</option>))}
		</select>
		</div>
	);
};

export default ItemOptions;