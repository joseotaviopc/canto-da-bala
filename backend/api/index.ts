import { app } from '../src/shared/http/server'

app.listen(3000, () => console.log('Server ready on port 3000.'))

module.exports = app
