const express = require('express');
const router = express.Router();
const { createProduct, updateStock, deleteProduct, getAllProducts } = require('../controllers/productController');
const { getAllUsers, updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/products', auth, getAllProducts);
router.post('/products', auth, createProduct);
router.put('/products/:id/stock', auth, updateStock);
router.delete('/products/:id', auth, deleteProduct);

router.get('/users', auth, getAllUsers);
router.put('/users/:id', auth, updateUser);

module.exports = router;