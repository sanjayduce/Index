const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the 'path' module

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/classifieds', {
  useNewUrlParser: true, // Remove this line (not needed anymore)
  useUnifiedTopology: true, // Remove this line (not needed anymore)
});

mongoose.connection.on('error', console.error.bind(console, 
'MongoDB connection error:'));
app.use(express.static(path.join(__dirname, 'public')));
// Routes
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes');
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});