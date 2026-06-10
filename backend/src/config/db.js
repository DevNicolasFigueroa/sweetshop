// 1. Importamos Mongoose, que es quien habla con MongoDB
const mongoose = require('mongoose')

// 2. Función de conexión — la exportamos para llamarla desde index.js
const connectDB = async () => {

    try {
        // 3. Intentamos conectar usando la URI del archivo .env
        const conn = await mongoose.connect(process.env.MONGODB_URI)

        // 4. Si sale bien, mostramos en qué host se conectó
        console.log(`MongoDB conectado: ${conn.connection.host}`)

    } catch (error) {

        // 5. Si falla, mostramos el error y detenemos el proceso
        // El código 1 indica que el proceso terminó con error
        console.error(`Error al conectar MongoDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB