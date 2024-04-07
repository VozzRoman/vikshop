
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../ScrollTop/ScrollTop';


const Layout = () => {
	
	return (
		<div className='flex flex-col h-screen'>
		<Header/>
		<main className='flex-grow'>
			<section className='pb-10 pt-3'>
			<Outlet/>
			</section>
		</main>
		<ScrollTop/>
		<Footer/>
	
		</div>
		
	)
};

export default Layout;