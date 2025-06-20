// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Task = require('./models/Task');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, priority } = req.body;
  const newTask = new Task({ title, priority });
  await newTask.save();
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
  .catch(err => console.error(err));
