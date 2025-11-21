const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, image_url } = req.body;
    const product = await Product.create({ name, description, price, stock_quantity, image_url });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock_quantity } = req.body;
    const [updated] = await Product.update({ stock_quantity }, { where: { id } });
    if (updated) res.json({ message: 'Stock updated' });
    else res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) res.json({ message: 'Product deleted' });
    else res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};