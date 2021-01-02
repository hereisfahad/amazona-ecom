import bcrypt from 'bcrypt';

const users = [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('testing123', 8),
      isAdmin: true,
      image: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('testing123', 8),
      isAdmin: false,
      image: 'https://bit.ly/sage-adebayo',
    },
];
export default users;