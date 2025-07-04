import React, { useState } from 'react';

const BookDetailModal = ({ book, onClose, onAddToCart, currentUser, onAddReview }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  if (!book) return null;

  const handleReviewSubmit = () => {
    if (reviewText.trim() && currentUser) {
      onAddReview(book.id, currentUser.id, reviewText, reviewRating);
      setReviewText('');
      setReviewRating(5);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50">
          <img
            src={book.image}
            alt={book.title}
            className="w-full max-h-96 object-contain rounded-xl shadow-md"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{book.title}</h2>
            <p className="text-gray-700 text-xl font-medium mb-2">{book.author}</p>
            <p className="text-gray-500 text-lg mb-4">{book.category}</p>
            <div className="flex items-center mb-5">
              <span className="text-4xl font-bold text-gray-900 mr-4">${book.price.toFixed(2)}</span>
              <div className="flex items-center text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-800 text-2xl font-semibold">{book.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">{book.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Reseñas</h3>
            {book.reviews && book.reviews.length > 0 ? (
              <div className="max-h-40 overflow-y-auto pr-2">
                {book.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-xl mb-3 last:mb-0">
                    <div className="flex items-center mb-1">
                      <span className="font-semibold text-gray-800 mr-2">Usuario {review.userId}:</span>
                      <div className="flex items-center text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No hay reseñas para este libro aún.</p>
            )}
            {currentUser && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">Deja tu reseña:</h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none mb-2"
                  rows="3"
                  placeholder="Escribe tu comentario aquí..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <div className="flex items-center mb-3">
                  <label htmlFor="rating" className="mr-2 text-gray-700">Calificación:</label>
                  <select
                    id="rating"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num} Estrella{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleReviewSubmit}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Enviar Reseña
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => {
                onAddToCart(book);
                onClose();
              }}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg"
            >
              Agregar al carrito
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold text-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;