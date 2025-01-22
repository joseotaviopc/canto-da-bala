import mongoose, { Types } from 'mongoose'
import { ProductsRepository } from '../repositories/Products/ProductsRepository' // Adjust the import path as necessary
import { importedProducts } from './imported-products'

// MongoDB connection string
const MONGO_USERNAME = 'carvalhojose'
const MONGO_PASSWORD = 'ffqG288mXIBc7dmL'
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@banco-prod.el4pf.mongodb.net/?retryWrites=true&w=majority&appName=Banco-prod`

const userId = '67903df0940b21d56caa56f0'
// Seed function
const seedProducts = async () => {
  try {
    await mongoose.connect(mongoURL)
    const productsRepository = new ProductsRepository()

    for (const product of importedProducts) {
      await productsRepository.create({
        ...product,
        isDefault: false,
        userId,
      })
      console.log(`Inserted: ${product.name}`)
    }

    console.log('Seeding completed!')
  } catch (error) {
    console.error('Error seeding products:', error)
  } finally {
    await mongoose.disconnect()
  }
}

// Run the seed function
seedProducts()
