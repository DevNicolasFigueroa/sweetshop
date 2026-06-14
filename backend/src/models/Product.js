
// 1. Importamos mongoose para acceder a Schema y model
const mongoose = require('mongoose')

// 2. Definimos el schema — la "forma" que tendrá
//    cada documento Product en MongoDB
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del producto es obligatorio'],
            trim: true,       // elimina espacios al inicio y al final
            maxlength: [100, 'El nombre no puede superar los 100 caracteres']
        },

        description: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
            trim: true,
            maxlength: [500, 'La descripción no puede superar los 500 caracteres']
        },

        price: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo']
        },

        category: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            // enum restringe los valores permitidos
            // si intentas guardar otra categoría, MongoDB lo rechaza
            enum: {
                values: ['tortas', 'cupcakes', 'galletas', 'macarons', 'otros'],
                message: '{VALUE} no es una categoría válida'
            }
        },

        image: {
            type: String,
            default: ''       // por ahora vacío, en la Fase 04 agregaremos Cloudinary
        },

        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio'],
            min: [0, 'El stock no puede ser negativo'],
            default: 0
        },

        available: {
            type: Boolean,
            default: true     // por defecto el producto es visible en el catálogo
        }
    },
    {
        // 3. timestamps: true hace que Mongoose agregue automáticamente
        //    los campos createdAt y updatedAt en cada documento
        timestamps: true
    }
)

// 4. Creamos el modelo a partir del schema
//    'Product' es el nombre — Mongoose lo usará para crear
//    la colección 'products' (en plural y minúscula) en MongoDB
const Product = mongoose.model('Product', productSchema)

module.exports = Product