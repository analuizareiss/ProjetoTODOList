const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const fs = require('fs');


// Criar uma nova tarefa
router.post('/', async (req, res) => {
  try {
    const { description, end_date } = req.body; // Recebe description e end_date
    const endDate = new Date(end_date);
    const task = new Task(description, endDate); // Cria a tarefa com os novos campos
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(400).json({ error: 'Erro ao criar tarefa. Verifique os dados e tente novamente.' });
  }
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao buscar tarefas:', err);
    res.status(500).json({ error: 'Erro ao buscar tarefas. Tente novamente mais tarde.' });
  }
});

// Pesquisar tarefas por descrição
router.get('/search', async (req, res) => {
  try {
    const { description } = req.query;
    const tasks = await Task.find({ description: { $regex: description, $options: 'i' } });
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao pesquisar tarefas:', err);
    res.status(500).json({ error: 'Erro ao pesquisar tarefas. Tente novamente mais tarde.' });
  }
});

// Listar tarefas arquivadas
router.get('/archived', async (req, res) => {
  try {
    const tasks = await Task.find({ archived: true });
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao buscar tarefas arquivadas:', err);
    res.status(500).json({ error: 'Erro ao buscar tarefas arquivadas. Tente novamente mais tarde.' });
  }
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(task);
  } catch (err) {
    console.error(`Erro ao atualizar tarefa ${req.params.id}:`, err);
    res.status(400).json({ error: 'Erro ao atualizar tarefa. Verifique os dados e tente novamente.' });
  }
});

// Excluir uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(`Erro ao deletar tarefa ${req.params.id}:`, err);
    res.status(500).json({ error: 'Erro ao deletar tarefa. Tente novamente mais tarde.' });
  }
});

// Marcar uma tarefa como concluída
router.put('/:id/complete', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(task);
  } catch (err) {
    console.error(`Erro ao completar tarefa ${req.params.id}:`, err);
    res.status(400).json({ error: 'Erro ao completar tarefa. Tente novamente mais tarde.' });
  }
});

// Arquivar uma tarefa
/*router.put('/:id/archive', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    if (!task.completed) {
      return res.status(400).json({ error: 'A tarefa precisa estar concluída antes de ser arquivada.' });
    }
    task.archived = true;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(`Erro ao arquivar tarefa ${req.params.id}:`, err);
    res.status(400).json({ error: 'Erro ao arquivar tarefa. Tente novamente mais tarde.' });
  }
});*/

router.put('/:id/archive', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    if (!task.completed) {
      return res.status(400).json({ error: 'A tarefa precisa estar concluída antes de ser arquivada.' });
    }
    task.archived = true;
    await task.save();

    // Dados que serão gravados no arquivo TXT
    const archivedTaskData = `ID: ${task._id} | Descrição: ${task.description} | Data de Término: ${task.end_date} | Concluída: ${task.completed} | Arquivada: ${task.archived}\n`;

    // Adiciona os dados ao arquivo "archive.txt"
    fs.appendFile('archive.txt', archivedTaskData, (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo:", err);
      } else {
        console.log("Tarefa arquivada gravada no arquivo archive.txt");
        res.json(task);
      }
    });

  } catch (err) {
    console.error(`Erro ao arquivar tarefa ${req.params.id}:`, err);
    res.status(400).json({ error: 'Erro ao arquivar tarefa. Tente novamente mais tarde.' });
  }
});

module.exports = router;