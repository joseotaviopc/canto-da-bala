import fs from 'fs'
import csv from 'csv-parser'
import { Product } from '../entities/product'

// Define a type for your product
type ImportProduct = Omit<Product, '_id' | 'user' | 'isDefault' | 'amount'>

// Function to read CSV and transform it into an array of Product objects
const readCSV = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const products: Set<ImportProduct> = new Set()

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Transform the data into the ImportProduct format
        const product: ImportProduct = {
          category: data.CATEGORIA || '',
          code: data['CODIGO-BARRA'] || '', // Default to empty string if not available
          costValue: parseFloat(
            data['PRECO-CUSTO']?.replace('R$ ', '').replace(',', '.') || '0',
          ),
          name: data.DESCRICAO || '',
          stock: 0,
          value: parseFloat(
            data['PRECO-VENDA']?.replace('R$ ', '').replace(',', '.') || '0',
          ),
        }
        products.add(product)
      })
      .on('end', () => {
        // Convert Set to Array and write to imported-products.ts
        const productsArray = Array.from(products)
        const fileContent = `export const importedProducts = ${JSON.stringify(
          productsArray,
          null,
          2,
        )};`

        fs.writeFileSync('./imported-products.ts', fileContent)
        console.log('Products saved to imported-products.ts')
        resolve()
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

// Usage example
const filePath = '../../Lista-de-produtos-Canto-da-Bala.csv' // Adjust the path as needed
readCSV(filePath)
  .then(() => {
    console.log('Products imported successfully:')
  })
  .catch((error) => {
    console.error('Error reading CSV file:', error)
  })
