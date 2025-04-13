import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { clearSelectedProduct, fetchProductById } from '../features/product/productSlice';
import {  HashLoader } from 'react-spinners';

const ProductDetail = () => {



  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const isInCart = cartItems.some((item) => item.id === selectedProduct?.id);

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(selectedProduct.id));
    } else {
      dispatch(addToCart(selectedProduct));
    }
  };



  if (loading || !selectedProduct) return <div className="p-4 flex items-center justify-center mt-[15rem]"> <HashLoader color="#4fa027" />
  </div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;



  return (
    <div className="max-w-4xl mx-auto p-6 flex mt-[5rem] bg-green-100" >
      <div className="flex flex-col md:flex-row gap-6">
        <img src={selectedProduct.image} alt={selectedProduct.title} className="w-72 h-72 object-contain mx-auto" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{selectedProduct.title}</h1>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <p className="text-lg font-semibold mb-4">
            Category: {selectedProduct.category}
          </p>
          <p className="text-xl font-bold mb-4">
            ₹{(selectedProduct.price * 83).toFixed(2)}
          </p>
          <button
            className={`mt-4 py-2 px-4 rounded text-white cursor-pointer ${isInCart ? 'bg-red-500' : 'bg-green-600'}`}
            onClick={handleClick}
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
