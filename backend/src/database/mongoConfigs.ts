import mongoose from 'mongoose'

const MONGO_USERNAME = 'carvalhojose'
const MONGO_PASSWORD = 'ffqG288mXIBc7dmL'
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@banco-prod.el4pf.mongodb.net/?retryWrites=true&w=majority&appName=Banco-prod`

// mongodb+srv://carvalhojose:<db_password>@banco-prod.el4pf.mongodb.net/?retryWrites=true&w=majority&appName=Banco-prod

mongoose.connect(mongoURL)
mongoose.connection
  .on(
    'error',
    console.error.bind(console, 'Erro ao conectar com o banco de dados'),
  )
  .once('open', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })

export default mongoose
