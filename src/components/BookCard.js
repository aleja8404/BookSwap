import React from 'react';

const BookCard = ({ book, onAddToCart, onSelectBook, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer relative">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita que se abra el modal al hacer clic en el corazón
          onToggleFavorite(book.id);
        }}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10"
        aria-label="Agregar a favoritos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover"
        onClick={() => onSelectBook(book)}
      />
      <div className="p-5">
        <h3
          className="text-xl font-semibold text-gray-900 mb-2 truncate"
          onClick={() => onSelectBook(book)}
        >
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-1">{book.author}</p>
        <p className="text-gray-500 text-xs mb-3">{book.category}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">${book.price.toFixed(2)}</span>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700 text-sm">{book.rating.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={() => onAddToCart(book)}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default BookCard;