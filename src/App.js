import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginPopup from './Pages/LoginPopup';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import banner_inera from './Components/Assets/banner_inera.png';
import banner_motornuclear from './Components/Assets/banner_motornuclear.png';
import banner_moshow from './Components/Assets/banner_moshow.png';
import { useState } from 'react';
import PlaceShipping from './Components/PlaceShipping/PlaceShipping';
import NewCollections from './Components/NewCollections/NewCollections';
import Popular from './Components/Popular/Popular';
import SearchBar from './Components/Search/SearchBar';
import NewsLetter from './Components/NewsLetter/NewsLetter';
import MyOrders from './Pages/MyOrders/MyOrders';
import ChatPlugin from './Pages/ChatPlugin/ChatPlugin';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div>
        <BrowserRouter>
          <Navbar setShowLogin={setShowLogin} />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/inera' element={<ShopCategory banner={banner_inera} category="inera" />} />
            <Route path='/motornuclear' element={<ShopCategory banner={banner_motornuclear} category="motornuclear" />} />
            <Route path='/moshow' element={<ShopCategory banner={banner_moshow} category="moshow" />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<PlaceShipping />} />
            <Route path="/newcollections" element={<NewCollections />} />
            <Route path="/populars" element={<Popular />} />
            <Route path="/myorders" element={<MyOrders /> } />
          </Routes>
          <NewsLetter setShowLogin={setShowLogin} />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
