
import { Route, Routes} from 'react-router-dom';
import './App.css'


import Layout from './components/Layout/Layout';
import HomePage from './pages/homePage/HomePage';
import SneakersPage from './pages/SneakersPage/Sneakers';
import InfoSneakersPage from './pages/SneakersPage/infoPage/InfoSneakersPage';
import Tshirts from './pages/Tshirts/Tshirts';
import TabLayout from './components/TabLayout/TabLayout';
import Description from './pages/TabPages/Description';
import Reviews from './pages/TabPages/Reviews';
import TestPage from './pages/TestPage/TestPage';
import MakeOrders from './pages/MakeOrders/MakeOrders';


function App() {
	
 
  return (
	<Routes>
	<Route  path='/' element={<Layout/>}>
	  <Route index element={<HomePage/>}/>
	  <Route path='sneakers' element={<SneakersPage/>}/>
	  <Route path='t-shirts' element={<Tshirts/>}/>
		<Route path='testPage' element={<TestPage/>}/>
		<Route path='makeOrderPage' element={<MakeOrders/>}/>
		
	  <Route path='sneakers/:id/' element={<TabLayout/>}>
		 <Route index element={<InfoSneakersPage/>}/>
		 <Route path='description' element={<Description/>}/>
		 <Route path='reviews' element={<Reviews/>}/>
	  </Route>

	  <Route path='/t-shirts/:id/' element={<TabLayout/>}>
		 <Route index element={<InfoSneakersPage/>}/>
		 <Route path='description' element={<Description/>}/>
		 <Route path='reviews' element={<Reviews/>}/>
	  </Route>

	  <Route path='/:id/' element={<TabLayout/>}>
		 <Route index element={<InfoSneakersPage/>}/>
		 <Route path='description' element={<Description/>}/>
		 <Route path='reviews' element={<Reviews/>}/>
	  </Route>
	</Route>
 </Routes>
  )
}

export default App
