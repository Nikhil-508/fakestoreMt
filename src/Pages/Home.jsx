import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import { HashLoader } from 'react-spinners';

const Home = () => {


  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  
  const productsPerPage = 8;

  // Fetch all products and categories
  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);

        setLoading(false);
      });

    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  

  //filter

  useEffect(() => {
    if (selectedCategory === 'all') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === selectedCategory);
      setProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page on filter
  }, [selectedCategory, allProducts]);

  // Pagination functinality
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };


  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };





  return (
    <div className="bg-green-100 min-h-screen p-6">
     <div className="mb-6 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
  <label htmlFor="category" className="text-sm font-medium">
    Filter by Category:
  </label>
  <select
    id="category"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-44 sm:w-52 p-2 border rounded bg-white text-sm focus:outline-none transition duration-200"
  >
    <option value="all">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </option>
    ))}
  </select>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {loading ? (
    <div className="col-span-full flex justify-center items-center h-full w-full py-20">
      <HashLoader color="#22c55e" />
    </div>
  ) : (
    currentProducts.map(product => (
      <ProductCard product={product} key={product.id} />
    ))
  )}
</div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
