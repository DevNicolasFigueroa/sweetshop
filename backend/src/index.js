// 1. Cargamos las variables de entorno PRIMERO, antes que todo
require('dotenv').config()

// 2. Importamos Express para crear el servidor
const express = require('express')

// 3. Importamos CORS para permitir peticiones desde el frontend
const cors = require('cors')

// 4. Creamos la instancia de la aplicación Express
const app = express()

// 5. Middlewares globales
app.use(cors())           // Permite peticiones cross-origin
app.use(express.json())   // Permite recibir JSON en el body de las peticiones

// 6. Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({ message: '🎂 SweetShop API funcionando' })
})

// 7. Puerto: usa el de .env o el 4000 por defecto
const PORT = process.env.PORT || 4000

// 8. Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})