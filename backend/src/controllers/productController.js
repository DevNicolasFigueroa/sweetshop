const Product = require('../models/Product')

// ─── GET /api/products ────────────────────────────────────────────
// Retorna todos los productos disponibles
// Acepta query params: ?category=tortas para filtrar por categoría
const getProducts = async (req, res) => {
    try {
        // 1. Construimos el filtro dinámicamente
        //    Si llega ?category=tortas, filtramos. Si no, devolvemos todo.
        const filter = {}
        if (req.query.category) {
            filter.category = req.query.category
        }

        // 2. Buscamos los productos y los ordenamos del más nuevo al más viejo
        const products = await Product.find(filter).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message
        })
    }
}

// ─── GET /api/products/:id ─────────────────────────────────────────
// Retorna un solo producto por su _id de MongoDB
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        // 1. Si no existe el producto, respondemos 404
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message
        })
    }
}

// ─── POST /api/products ────────────────────────────────────────────
// Crea un nuevo producto con los datos del body
const createProduct = async (req, res) => {
    try {
        // 1. Product.create() valida contra el schema automáticamente
        //    Si algo falla la validación, lanza un error que captura el catch
        const product = await Product.create(req.body)

        // 2. Respondemos 201 Created (no 200) porque creamos un recurso nuevo
        res.status(201).json({
            success: true,
            data: product
        })

    } catch (error) {
        // 3. Los errores de validación de Mongoose tienen code 11000
        //    cuando hay un campo duplicado (ej: nombre único)
        res.status(400).json({
            success: false,
            message: 'Error al crear el producto',
            error: error.message
        })
    }
}

// ─── PUT /api/products/:id ─────────────────────────────────────────
// Actualiza un producto existente por su _id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,          // retorna el documento YA actualizado, no el anterior
                runValidators: true // ejecuta las validaciones del schema en el update
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        })
    }
}

// ─── DELETE /api/products/:id ──────────────────────────────────────
// Elimina un producto por su _id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        // No retornamos data porque el recurso ya no existe
        res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}