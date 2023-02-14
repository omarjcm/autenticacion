import app from './app'
import './database'

let puerto = 3000
app.listen(puerto)
console.log('Server listen on port ', puerto)