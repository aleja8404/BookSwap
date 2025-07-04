import React from 'react';

const CartItem = ({ item, onRemoveFromCart }) => {
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-md p-5 mb-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg mr-5"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-gray-600 text-base mb-2">{item.author}</p>
        <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
      </div>
      <button
        onClick={() => onRemoveFromCart(item.id)}
        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
        aria-label="Eliminar del carrito"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;