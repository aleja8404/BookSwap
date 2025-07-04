import React, { useState } from 'react';

const CollectionManager = ({ collections, onAddCollection, onRemoveCollection, onAddBookToCollection, onRemoveBookFromCollection, allBooks }) => {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');

  const handleAddCollectionSubmit = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      onAddCollection(newCollectionName.trim());
      setNewCollectionName('');
    }
  };

  const handleAddBookToCollectionSubmit = (e) => {
    e.preventDefault();
    if (selectedCollectionId && selectedBookId) {
      onAddBookToCollection(selectedCollectionId, selectedBookId);
      setSelectedCollectionId('');
      setSelectedBookId('');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Mis Colecciones</h2>

      {/* Crear Nueva Colección */}
      <div className="mb-10 p-6 bg-gray-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Crear Nueva Colección</h3>
        <form onSubmit={handleAddCollectionSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Nombre de la colección"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="flex-grow px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg"
          >
            Crear
          </button>
        </form>
      </div>

      {/* Añadir Libro a Colección Existente */}
      {collections.length > 0 && allBooks.length > 0 && (
        <div className="mb-10 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Añadir Libro a Colección</h3>
          <form onSubmit={handleAddBookToCollectionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="select-collection" className="block text-gray-700 text-lg font-medium mb-2">
                Seleccionar Colección
              </label>
              <select
                id="select-collection"
                value={selectedCollectionId}
                onChange={(e) => setSelectedCollectionId(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                required
              >
                <option value="">Selecciona una colección</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="select-book" className="block text-gray-700 text-lg font-medium mb-2">
                Seleccionar Libro
              </label>
              <select
                id="select-book"
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                required
              >
                <option value="">Selecciona un libro</option>
                {allBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg"
              >
                Añadir Libro
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Listado de Colecciones */}
      {collections.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">Aún no tienes colecciones. ¡Crea una!</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-gray-100 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{collection.name}</h3>
                <button
                  onClick={() => onRemoveCollection(collection.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Eliminar colección"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              {collection.books.length === 0 ? (
                <p className="text-gray-600 text-base">Esta colección está vacía.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {collection.books.map((bookId) => {
                    const book = allBooks.find(b => b.id === bookId);
                    return book ? (
                      <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <img src={book.image} alt={book.title} className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 text-base truncate">{book.title}</h4>
                          <p className="text-gray-600 text-sm">{book.author}</p>
                          <button
                            onClick={() => onRemoveBookFromCollection(collection.id, book.id)}
                            className="mt-2 w-full bg-red-400 text-white text-sm py-2 rounded-lg hover:bg-red-500 transition-colors"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionManager;