import mongoose from 'mongoose'
import Product from '../models/Product'
import products from '../data/products'

const seedProducts = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    console.log('removing products...')
    await Product.deleteMany({})
    console.log('removed all products successfully')
    console.log('seeding products...')
    await Product.insertMany(products)
    console.log('seeded products successfully');
    mongoose.disconnect()
    process.exit()
  } catch (error) {
    console.log('can not seed products')
    process.exit()
  }
}

seedProducts()
