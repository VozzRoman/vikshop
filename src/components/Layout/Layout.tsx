
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../ScrollTop/ScrollTop';
// import useHideScrolTop from '../../hooks/useHideScrolTop';


const Layout = () => {
	
	return (
		<div className='flex flex-col h-screen'>
		<Header/>
		<main className='flex-grow pt-[77px]'>
			<section className='pb-10 pt-3'>
			<Outlet/>
			</section>
		</main>
		<Footer/>
	<ScrollTop/>
		</div>
		
	)
};

export default Layout;