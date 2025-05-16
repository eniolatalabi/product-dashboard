import React from 'react';
import { 
  FiEdit2, 
  FiTrash2,
  FiStar
} from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          
          <div className="flex-1"></div>
          
          <p className="font-bold text-lg text-indigo-700">${product.price}</p>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
          
          <div className="flex space-x-2">
            <button className="p-1 text-gray-400 hover:text-indigo-600">
              <FiEdit2 className="h-5 w-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-600">
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;