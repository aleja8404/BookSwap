import React from 'react';

const LayoutHeader = ({ onNavigate, user, onLogout }) => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-3xl font-bold text-gray-900 cursor-pointer" onClick={() => onNavigate('home')}>
        BookSwap
      </h1>
      <nav className="flex items-center space-x-6">
        <button
          onClick={() => onNavigate('home')}
          className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
        >
          Explorar
        </button>
        {user ? (
          <>
            <button
              onClick={() => onNavigate('sellBook')}
              className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
            >
              Vender Libro
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
            >
              Mi Perfil ({user.username})
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('register')}
              className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
            >
              Registrarse
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium"
            >
              Iniciar Sesión
            </button>
          </>
        )}
        <button
          onClick={() => onNavigate('cart')}
          className="relative text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default LayoutHeader;