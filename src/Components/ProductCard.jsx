import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
        <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain transform transition hover:scale-108" />
      <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
      <p className="text-blue-600 font-bold mt-2">
      ₹{(product.price * 83).toFixed(2)}
        </p>
        </Link>
      <button
        className={`mt-4 py-2 px-4 rounded text-white cursor-pointer ${isInCart ? 'bg-red-500' : 'bg-green-600'}`}
        onClick={handleClick}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
