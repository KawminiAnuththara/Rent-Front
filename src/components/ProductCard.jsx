import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-80 flex flex-col justify-between h-[400px]">
      {/* Product Image */}
      <img
        src={item.image?.[0] || 'https://via.placeholder.com/150'}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      
      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 text-sm">{item.category}</p>
        <p className="text-gray-700 mt-1 text-sm">{item.description}</p>
        
        {/* Price & Availability */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${item.price}</span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${item.availability ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {item.availability ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      
      <Link to={"/product/"+item.key} className=" text-center mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Add to Cart
      </Link>
    </div>
  );
};

export default ProductCard;
