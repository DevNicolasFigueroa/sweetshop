const express = require('express')

// 1. Router es un mini-servidor de rutas independiente
//    Lo exportamos y lo montamos en index.js bajo un prefijo
const router = express.Router()

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

// 2. Definimos las rutas usando los métodos HTTP correctos
//    La URL es relativa al prefijo donde se monte este router

router.get('/', getProducts)       // GET    /api/products
router.get('/:id', getProductById)    // GET    /api/products/:id
router.post('/', createProduct)     // POST   /api/products
router.put('/:id', updateProduct)     // PUT    /api/products/:id
router.delete('/:id', deleteProduct)  // DELETE /api/products/:id

module.exports = router