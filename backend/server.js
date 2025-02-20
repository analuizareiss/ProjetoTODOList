const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect('mongodb://localhost:27017/tasksdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rotas
app.use('/tasks', tasksRouter);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});