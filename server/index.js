const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const taskRoutes = require('../routes/taskRoutes');

const app = express();
connectDB();

app.use(cors({
  origin: ['https://taskmate-0fog.onrender.com', 'http://localhost:3000']
}));
app.use(express.json());
app.use('/api/tasks', taskRoutes);

module.exports = app;