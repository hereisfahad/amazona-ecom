import bcrypt from 'bcrypt';
import faker from 'faker';

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
for (let i = 0; i < 100; i++) {
  users.push(
    {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('testing123', 8),
      isAdmin: false,
      image: faker.image.avatar(),
      createdAt: faker.date.past()
    }
  )
}
export default users;