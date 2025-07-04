import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import BookCard from './components/BookCard';
import BookDetailModal from './components/BookDetailModal';
import CartItem from './components/CartItem';
import FilterSidebar from './components/FilterSidebar'; // Importar el nuevo componente de sidebar
import UserReviewSection from './components/UserReviewSection';
import CollectionManager from './components/CollectionManager'; // Importar el nuevo componente de colecciones
import { defaultBooks, defaultCategories, defaultPublishers, defaultAuthors, defaultPublicationYears } from './mock/books';
import { defaultUsers } from './mock/users';
import { calculateAverageRating } from './utils/helpers';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [books, setBooks] = useState(defaultBooks);
  const [users, setUsers] = useState(defaultUsers);
  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [collections, setCollections] = useState([]); // Estado para las colecciones

  // Estados para los filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPublisher, setSelectedPublisher] = useState('Todas');
  const [selectedAuthor, setSelectedAuthor] = useState('Todos');
  const [selectedYear, setSelectedYear] = useState('Todos');

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    const storedCollections = localStorage.getItem('userCollections');
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userCollections', JSON.stringify(collections));
  }, [collections]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedBook(null);
    setLoginError('');
    setRegisterError('');
  };

  const handleAddToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      handleNavigate('home');
    } else {
      setLoginError('Correo o contraseña incorrectos.');
    }
  };

  const handleRegister = (username, email, password) => {
    if (users.some((u) => u.email === email)) {
      setRegisterError('Este correo ya está registrado.');
      return;
    }
    const newUser = {
      id: `user${users.length + 1}`,
      username,
      email,
      password,
      rating: 0,
      reviews: [],
      booksSold: []
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    handleNavigate('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    handleNavigate('home');
  };

  const handleSellBook = (newBook) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para vender un libro.');
      return;
    }
    const bookWithId = {
      ...newBook,
      id: `book${books.length + 1}`,
      sellerId: currentUser.id,
      rating: 0,
      reviews: []
    };
    setBooks((prevBooks) => [...prevBooks, bookWithId]);
    handleNavigate('home');
  };

  const handleAddBookReview = (bookId, userId, comment, rating) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          const updatedReviews = [...book.reviews, { userId, comment, rating }];
          const newAverageRating = calculateAverageRating(updatedReviews);
          return { ...book, reviews: updatedReviews, rating: newAverageRating };
        }
        return book;
      })
    );
  };

  const handleAddUserReview = (targetUserId, reviewerId, comment, rating) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === targetUserId) {
          const updatedReviews = [...user.reviews, { userId: reviewerId, comment, rating }];
          const newAverageRating = calculateAverageRating(updatedReviews);
          return { ...user, reviews: updatedReviews, rating: newAverageRating };
        }
        return user;
      })
    );
  };

  // Funciones para colecciones
  const handleAddCollection = (name) => {
    const newCollection = {
      id: `collection${collections.length + 1}`,
      name,
      books: [],
    };
    setCollections((prevCollections) => [...prevCollections, newCollection]);
  };

  const handleRemoveCollection = (collectionId) => {
    setCollections((prevCollections) => prevCollections.filter((col) => col.id !== collectionId));
  };

  const handleAddBookToCollection = (collectionId, bookId) => {
    setCollections((prevCollections) =>
      prevCollections.map((col) =>
        col.id === collectionId && !col.books.includes(bookId)
          ? { ...col, books: [...col.books, bookId] }
          : col
      )
    );
  };

  const handleRemoveBookFromCollection = (collectionId, bookId) => {
    setCollections((prevCollections) =>
      prevCollections.map((col) =>
        col.id === collectionId
          ? { ...col, books: col.books.filter((id) => id !== bookId) }
          : col
      )
    );
  };

  const isBookFavorite = (bookId) => {
    return collections.some(collection => collection.books.includes(bookId));
  };

  const handleToggleFavorite = (bookId) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para guardar libros en colecciones.');
      return;
    }
    // Por simplicidad, si no hay colecciones, crea una por defecto "Mis Favoritos"
    let favoriteCollection = collections.find(col => col.name === 'Mis Favoritos');
    if (!favoriteCollection) {
      const newCollectionId = `collection${collections.length + 1}`;
      favoriteCollection = { id: newCollectionId, name: 'Mis Favoritos', books: [] };
      setCollections(prev => [...prev, favoriteCollection]);
    }

    if (favoriteCollection.books.includes(bookId)) {
      handleRemoveBookFromCollection(favoriteCollection.id, bookId);
    } else {
      handleAddBookToCollection(favoriteCollection.id, bookId);
    }
  };


  // Lógica de filtrado y búsqueda combinada
  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || book.category === selectedCategory;
    const matchesPublisher = selectedPublisher === 'Todas' || book.publisher === selectedPublisher;
    const matchesAuthor = selectedAuthor === 'Todos' || book.author === selectedAuthor;
    const matchesYear = selectedYear === 'Todos' || book.publicationYear === parseInt(selectedYear);
    
    return matchesSearchTerm && matchesCategory && matchesPublisher && matchesAuthor && matchesYear;
  });

  const totalCartPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="flex flex-col md:flex-row container mx-auto px-6 py-8 gap-8">
            <FilterSidebar
              categories={defaultCategories}
              publishers={defaultPublishers}
              authors={defaultAuthors}
              publicationYears={defaultPublicationYears}
              selectedCategory={selectedCategory}
              selectedPublisher={selectedPublisher}
              selectedAuthor={selectedAuthor}
              selectedYear={selectedYear}
              onSelectCategory={setSelectedCategory}
              onSelectPublisher={setSelectedPublisher}
              onSelectAuthor={setSelectedAuthor}
              onSelectYear={setSelectedYear}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToCart={handleAddToCart}
                  onSelectBook={handleSelectBook}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isBookFavorite(book.id)}
                />
              ))}
            </div>
            {selectedBook && (
              <BookDetailModal
                book={selectedBook}
                onClose={handleCloseModal}
                onAddToCart={handleAddToCart}
                currentUser={currentUser}
                onAddReview={handleAddBookReview}
              />
            )}
          </div>
        );
      case 'cart':
        return (
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Tu Carrito de Compras</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-lg">Tu carrito está vacío. ¡Añade algunos libros!</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} onRemoveFromCart={handleRemoveFromCart} />
                ))}
                <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">Total: ${totalCartPrice.toFixed(2)}</span>
                  <button className="bg-black text-white py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'register':
        return (
          <div className="container mx-auto px-6 py-8 flex justify-center items-center min-h-[calc(100vh-120px)]">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Regístrate</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const username = e.target.username.value;
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  handleRegister(username, email, password);
                }}
              >
                <div className="mb-6">
                  <label htmlFor="username" className="block text-gray-700 text-lg font-medium mb-2">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    required
                  />
                </div>
                {registerError && (
                  <p className="text-red-500 text-center mb-4">{registerError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-xl"
                >
                  Registrarse
                </button>
                <p className="text-center text-gray-600 mt-6">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => handleNavigate('login')}
                    className="text-black font-semibold hover:underline"
                  >
                    Inicia Sesión
                  </button>
                </p>
              </form>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="container mx-auto px-6 py-8 flex justify-center items-center min-h-[calc(100vh-120px)]">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Iniciar Sesión</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  handleLogin(email, password);
                }}
              >
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-center mb-4">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-xl"
                >
                  Iniciar Sesión
                </button>
                <p className="text-center text-gray-600 mt-6">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => handleNavigate('register')}
                    className="text-black font-semibold hover:underline"
                  >
                    Regístrate
                  </button>
                </p>
              </form>
            </div>
          </div>
        );
      case 'sellBook':
        return (
          <div className="container mx-auto px-6 py-8 flex justify-center items-center min-h-[calc(100vh-120px)]">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Vender un Libro</h2>
              {currentUser ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const author = e.target.author.value;
                    const category = e.target.category.value;
                    const price = parseFloat(e.target.price.value);
                    const description = e.target.description.value;
                    const image = e.target.image.value || 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro';
                    const publicationYear = parseInt(e.target.publicationYear.value);
                    const publisher = e.target.publisher.value;

                    handleSellBook({ title, author, category, price, description, image, publicationYear, publisher });
                    e.target.reset();
                  }}
                >
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-lg font-medium mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="author" className="block text-gray-700 text-lg font-medium mb-2">
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-gray-700 text-lg font-medium mb-2">
                      Categoría
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    >
                      {defaultCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="publisher" className="block text-gray-700 text-lg font-medium mb-2">
                      Editorial
                    </label>
                    <input
                      type="text"
                      id="publisher"
                      name="publisher"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="publicationYear" className="block text-gray-700 text-lg font-medium mb-2">
                      Año de Publicación
                    </label>
                    <input
                      type="number"
                      id="publicationYear"
                      name="publicationYear"
                      min="1000"
                      max={new Date().getFullYear()}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="price" className="block text-gray-700 text-lg font-medium mb-2">
                      Precio
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg resize-none"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-8">
                    <label htmlFor="image" className="block text-gray-700 text-lg font-medium mb-2">
                      URL de la Imagen (Opcional)
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-xl"
                  >
                    Publicar Libro
                  </button>
                </form>
              ) : (
                <p className="text-center text-gray-600 text-lg">
                  Por favor,{' '}
                  <button
                    onClick={() => handleNavigate('login')}
                    className="text-black font-semibold hover:underline"
                  >
                    inicia sesión
                  </button>{' '}
                  o{' '}
                  <button
                    onClick={() => handleNavigate('register')}
                    className="text-black font-semibold hover:underline"
                  >
                    regístrate
                  </button>{' '}
                  para vender un libro.
                </p>
              )}
            </div>
          </div>
        );
      case 'profile':
        const userProfile = currentUser ? users.find(u => u.id === currentUser.id) : null;
        if (!userProfile) {
          return (
            <div className="container mx-auto px-6 py-8 text-center text-gray-600 text-lg">
              Por favor, inicia sesión para ver tu perfil.
            </div>
          );
        }
        const userBooks = books.filter(book => book.sellerId === userProfile.id);
        return (
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfil de {userProfile.username}</h2>
              <p className="text-gray-700 text-lg mb-2">Correo: {userProfile.email}</p>
              <div className="flex items-center text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-800 text-xl font-semibold">
                  Calificación de Vendedor: {userProfile.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <UserReviewSection
              user={userProfile}
              currentUser={currentUser}
              onAddUserReview={handleAddUserReview}
            />

            <div className="bg-white rounded-3xl shadow-2xl p-10 mt-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mis Libros en Venta</h3>
              {userBooks.length === 0 ? (
                <p className="text-gray-600 text-lg">Aún no has publicado ningún libro.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {userBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onAddToCart={handleAddToCart}
                      onSelectBook={handleSelectBook}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={isBookFavorite(book.id)}
                    />
                  ))}
                </div>
              )}
            </div>
            {selectedBook && (
              <BookDetailModal
                book={selectedBook}
                onClose={handleCloseModal}
                onAddToCart={handleAddToCart}
                currentUser={currentUser}
                onAddReview={handleAddBookReview}
              />
            )}
          </div>
        );
      case 'collections':
        return (
          <div className="container mx-auto px-6 py-8">
            <CollectionManager
              collections={collections}
              onAddCollection={handleAddCollection}
              onRemoveCollection={handleRemoveCollection}
              onAddBookToCollection={handleAddBookToCollection}
              onRemoveBookFromCollection={handleRemoveBookFromCollection}
              allBooks={books} // Pasar todos los libros para que el selector funcione
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <LayoutHeader onNavigate={handleNavigate} user={currentUser} onLogout={handleLogout} />
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;