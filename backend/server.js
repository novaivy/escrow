require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const escrowRoutes = require('./routes/escrowRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // to accept base64 images

app.use('/api/escrow', escrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));