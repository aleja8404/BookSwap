export const defaultBooks = [
  {
    id: '1',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    category: 'Novela',
    price: 150.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro1',
    description: 'Una obra maestra de la literatura latinoamericana.',
    sellerId: 'user1',
    rating: 4.8,
    reviews: [
      { userId: 'user2', comment: 'Excelente libro, llegó en perfecto estado.', rating: 5 },
      { userId: 'user3', comment: 'Un clásico que hay que leer.', rating: 4 }
    ],
    publicationYear: 1967,
    publisher: 'Editorial Sudamericana'
  },
  {
    id: '2',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    category: 'Clásico',
    price: 200.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro2',
    description: 'La novela cumbre de la literatura española.',
    sellerId: 'user2',
    rating: 4.5,
    reviews: [
      { userId: 'user1', comment: 'Demasiado largo para mi gusto, pero buena edición.', rating: 3 },
      { userId: 'user4', comment: 'Imprescindible.', rating: 5 }
    ],
    publicationYear: 1605,
    publisher: 'Francisco de Robles'
  },
  {
    id: '3',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    category: 'Ficción',
    price: 80.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro3',
    description: 'Un cuento poético y filosófico.',
    sellerId: 'user3',
    rating: 4.9,
    reviews: [
      { userId: 'user1', comment: 'Hermoso y conmovedor.', rating: 5 },
      { userId: 'user2', comment: 'Lo leí de niño y sigue siendo mágico.', rating: 5 }
    ],
    publicationYear: 1943,
    publisher: 'Reynal & Hitchcock'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    category: 'Distopía',
    price: 120.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro4',
    description: 'Una visión escalofriante de un futuro totalitario.',
    sellerId: 'user4',
    rating: 4.7,
    reviews: [
      { userId: 'user3', comment: 'Muy relevante hoy en día.', rating: 5 },
      { userId: 'user5', comment: 'Me hizo pensar mucho.', rating: 4 }
    ],
    publicationYear: 1949,
    publisher: 'Secker & Warburg'
  },
  {
    id: '5',
    title: 'Orgullo y prejuicio',
    author: 'Jane Austen',
    category: 'Romance',
    price: 100.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro5',
    description: 'Una de las novelas más famosas de la literatura inglesa.',
    sellerId: 'user1',
    rating: 4.6,
    reviews: [
      { userId: 'user2', comment: 'Me encantó la historia de amor.', rating: 5 },
      { userId: 'user4', comment: 'Un clásico que no pasa de moda.', rating: 4 }
    ],
    publicationYear: 1813,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    id: '6',
    title: 'Crimen y castigo',
    author: 'Fiódor Dostoievski',
    category: 'Novela',
    price: 180.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro6',
    description: 'Un profundo análisis psicológico de un asesino.',
    sellerId: 'user2',
    rating: 4.4,
    reviews: [
      { userId: 'user1', comment: 'Intenso y oscuro.', rating: 4 },
      { userId: 'user3', comment: 'Dostoievski nunca decepciona.', rating: 5 }
    ],
    publicationYear: 1866,
    publisher: 'The Russian Messenger'
  },
  {
    id: '7',
    title: 'El señor de los anillos',
    author: 'J.R.R. Tolkien',
    category: 'Fantasía',
    price: 250.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro7',
    description: 'La épica saga de la Tierra Media.',
    sellerId: 'user3',
    rating: 4.9,
    reviews: [
      { userId: 'user2', comment: 'El mejor libro de fantasía jamás escrito.', rating: 5 },
      { userId: 'user4', comment: 'Me perdí un poco con los nombres, pero la historia es genial.', rating: 4 }
    ],
    publicationYear: 1954,
    publisher: 'George Allen & Unwin'
  },
  {
    id: '8',
    title: 'Matar a un ruiseñor',
    author: 'Harper Lee',
    category: 'Clásico',
    price: 110.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro8',
    description: 'Una historia conmovedora sobre la injusticia racial.',
    sellerId: 'user4',
    rating: 4.8,
    reviews: [
      { userId: 'user1', comment: 'Un libro que te hace reflexionar.', rating: 5 },
      { userId: 'user5', comment: 'Lo leí en la escuela y me encantó.', rating: 4 }
    ],
    publicationYear: 1960,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    id: '9',
    title: 'Sapiens: De animales a dioses',
    author: 'Yuval Noah Harari',
    category: 'Historia',
    price: 160.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro9',
    description: 'Una breve historia de la humanidad.',
    sellerId: 'user1',
    rating: 4.7,
    reviews: [
      { userId: 'user2', comment: 'Cambió mi forma de ver el mundo.', rating: 5 },
      { userId: 'user3', comment: 'Muy interesante, aunque un poco denso.', rating: 4 }
    ],
    publicationYear: 2011,
    publisher: 'Debate'
  },
  {
    id: '10',
    title: 'El código Da Vinci',
    author: 'Dan Brown',
    category: 'Misterio',
    price: 90.00,
    image: 'https://via.placeholder.com/150/F3F4F6/1F2937?text=Libro10',
    description: 'Un thriller lleno de enigmas y conspiraciones.',
    sellerId: 'user2',
    rating: 4.0,
    reviews: [
      { userId: 'user1', comment: 'Entretenido, pero no es una obra maestra.', rating: 3 },
      { userId: 'user4', comment: 'Me mantuvo pegado a sus páginas.', rating: 5 }
    ],
    publicationYear: 2003,
    publisher: 'Doubleday'
  }
];

export const defaultCategories = [
  'Novela',
  'Clásico',
  'Ficción',
  'Distopía',
  'Romance',
  'Fantasía',
  'Historia',
  'Misterio'
];

export const defaultPublishers = [
  'Editorial Sudamericana',
  'Francisco de Robles',
  'Reynal & Hitchcock',
  'Secker & Warburg',
  'T. Egerton, Whitehall',
  'The Russian Messenger',
  'George Allen & Unwin',
  'J. B. Lippincott & Co.',
  'Debate',
  'Doubleday'
];

export const defaultAuthors = [
  'Gabriel García Márquez',
  'Miguel de Cervantes',
  'Antoine de Saint-Exupéry',
  'George Orwell',
  'Jane Austen',
  'Fiódor Dostoievski',
  'J.R.R. Tolkien',
  'Harper Lee',
  'Yuval Noah Harari',
  'Dan Brown'
];

export const defaultPublicationYears = [
  1605, 1813, 1866, 1943, 1949, 1954, 1960, 1967, 2003, 2011
];