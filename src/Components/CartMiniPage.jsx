import React from 'react';
import { useSelector } from 'react-redux';

const CartMiniPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);


  const totalPrice = cartItems.reduce((acc,item) => acc + item.price*83,0)

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-lg p-4 z-20">
      <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="flex items-center mb-3">
            <img src={item.image} alt={item.title} className="w-10 h-10 object-contain mr-3" />
            <div>
              <p className="font-medium text-sm line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-500"> ₹{(item.price * 83).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
      Total : {totalPrice}
    </div>
  );
};

export default CartMiniPage;
