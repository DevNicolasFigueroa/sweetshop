require('dotenv').config()

const express = require('express')
const cors = require('cors')

// 1. Importamos la función de conexión que acabamos de crear
const connectDB = require('./config/db')

const app = express()

// 2. Conectamos a MongoDB ANTES de iniciar el servidor
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: '🎂 SweetShop API funcionando' })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})