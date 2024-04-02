import  { FC, ReactNode } from 'react';
import scss from './Container.module.scss';

interface ContainerProp {
children?: ReactNode
}

const Container: FC<ContainerProp> = ({children}) => {
	return (
		<div className={scss.container}>
			{children}
		</div>
	);
};

export default Container;