import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedCategory === '' 
              ? 'bg-indigo-100 text-indigo-800' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedCategory === category 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;