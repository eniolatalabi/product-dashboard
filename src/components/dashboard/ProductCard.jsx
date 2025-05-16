import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiStar, FiImage } from 'react-icons/fi';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedPrice = product.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-200 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 p-4">
            <FiImage className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500">Image not available</span>
          </div>
        ) : (
          <img 
            src={product.imageUrl}
            alt={`${product.name} - ${product.brand}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{product.brand}</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        
        {/* Rating and Price */}
        <div className="flex justify-between items-center mt-2 mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
          </div>
          <p className="font-bold text-lg text-indigo-700">{formattedPrice}</p>
        </div>
        
        {/* Stock and Actions */}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
          <span className={`text-xs ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(product)} className="p-1.5 hover:text-indigo-600">
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(product.id)} className="p-1.5 hover:text-red-600">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;