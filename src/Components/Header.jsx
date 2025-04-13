import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import CartMiniPage from './CartMiniPage';
import logo from '../Components/Assets/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="bg-green-200 shadow-md p-4 flex justify-around items-center sticky top-0 z-10">
      <Link to="/">
      <img  src={logo} alt="" className="w-6 h-6 sm:w-8 sm:h-8 object-contain cursor-pointer"/>
      </Link>
      <div className="text-2xl font-bold text-blue-600">FakeStore App</div>

      <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
        <FaShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
        {showCart && <CartMiniPage />}
      </div>
    </header>
  );
};

export default Header;
