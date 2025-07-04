export const defaultUsers = [
  {
    id: 'user1',
    username: 'AnaGzz',
    email: 'ana@example.com',
    password: 'password123',
    rating: 4.9,
    reviews: [
      { userId: 'user2', comment: 'Excelente vendedora, muy atenta.', rating: 5 },
      { userId: 'user3', comment: 'Libros en perfecto estado.', rating: 5 }
    ]
  },
  {
    id: 'user2',
    username: 'LuisMtz',
    email: 'luis@example.com',
    password: 'password123',
    rating: 4.5,
    reviews: [
      { userId: 'user1', comment: 'Buena comunicación, pero tardó un poco en enviar.', rating: 4 },
      { userId: 'user4', comment: 'Comprador serio.', rating: 5 }
    ]
  },
  {
    id: 'user3',
    username: 'SofíaRdz',
    email: 'sofia@example.com',
    password: 'password123',
    rating: 4.7,
    reviews: [
      { userId: 'user1', comment: 'Todo perfecto.', rating: 5 },
      { userId: 'user2', comment: 'Recomendada.', rating: 5 }
    ]
  },
  {
    id: 'user4',
    username: 'CarlosPerez',
    email: 'carlos@example.com',
    password: 'password123',
    rating: 4.2,
    reviews: [
      { userId: 'user3', comment: 'El libro llegó bien, pero la descripción no era tan precisa.', rating: 3 },
      { userId: 'user5', comment: 'Buen vendedor.', rating: 5 }
    ]
  },
  {
    id: 'user5',
    username: 'ElenaSanz',
    email: 'elena@example.com',
    password: 'password123',
    rating: 4.8,
    reviews: [
      { userId: 'user1', comment: 'Excelente compradora, pago rápido.', rating: 5 },
      { userId: 'user4', comment: 'Muy amable.', rating: 5 }
    ]
  }
];