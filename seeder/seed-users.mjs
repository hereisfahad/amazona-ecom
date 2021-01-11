import mongoose from 'mongoose'
import User from '../models/User.mjs'
import users from '../data/users.mjs'

const seedUsers = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )
    console.log('removing users...')
    await User.deleteMany({})
    console.log('removed all users successfully')
    console.log('seeding users...')
    await User.insertMany(users)
    console.log('seeded users successfully');
    mongoose.disconnect()
    process.exit()
  } catch (error) {
    console.log('can not seed users')
    process.exit()
  }
}

seedUsers()
