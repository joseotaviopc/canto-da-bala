import 'reflect-metadata'
import express, { Express } from 'express'
import 'express-async-errors'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml'

import '../containers'
import { routes } from '../../routes'
import dbConnection from '../../database/mongoConfigs'
import { handleErrors } from '../../middlewares/handleErrors'

interface CustomExpress extends Express {
  mongo?: any
}

// Configurações
const app: CustomExpress = express()
const PORT = 3000

app.mongo = dbConnection
app.use(express.json())
app.use(cors())

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Vendas API',
      version: '1.0.0',
      description: 'API documentation for the Sistema de Vendas',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
}

// Load the OpenAPI Specification file
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, '../../docs', 'api-spec.yaml'), 'utf8'),
)
console.log(swaggerDocument)
// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Rotas
app.use(routes)
app.use(handleErrors)

// app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

app.get('/', async (req: any, res: any) => {
  try {
    res.status(200).send(`<h1>Servidor rodando na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})

export { app }