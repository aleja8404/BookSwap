import React, { useState } from 'react';

const UserReviewSection = ({ user, currentUser, onAddUserReview }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const handleReviewSubmit = () => {
    if (reviewText.trim() && currentUser) {
      onAddUserReview(user.id, currentUser.id, reviewText, reviewRating);
      setReviewText('');
      setReviewRating(5);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Reseñas de {user.username}</h3>
      {user.reviews && user.reviews.length > 0 ? (
        <div className="max-h-60 overflow-y-auto pr-2">
          {user.reviews.map((review, index) => (
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
        <p className="text-gray-600 text-sm">No hay reseñas para este usuario aún.</p>
      )}
      {currentUser && currentUser.id !== user.id && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">Deja tu reseña para {user.username}:</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none mb-2"
            rows="3"
            placeholder="Escribe tu comentario aquí..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <div className="flex items-center mb-3">
            <label htmlFor="userRating" className="mr-2 text-gray-700">Calificación:</label>
            <select
              id="userRating"
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
  );
};

export default UserReviewSection;