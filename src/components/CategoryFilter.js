import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Categorías</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory('Todas')}
          className={`px-5 py-2 rounded-full text-lg font-medium transition-colors ${
            selectedCategory === 'Todas'
              ? 'bg-black text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2 rounded-full text-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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