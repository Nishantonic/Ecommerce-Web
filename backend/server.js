const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('DB synced');
  app.listen(5000, () => console.log('Server on http://localhost:5000'));
}).catch(err => console.error('DB error:', err));