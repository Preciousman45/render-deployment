// server/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const Task = require('./models/Task');
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'https://todo-app-client-89eu.onrender.com'
// }));
// app.use(express.json());

// // Routes
// app.get('/tasks', async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// app.post('/tasks', async (req, res) => {
//   const { title, priority } = req.body;
//   const newTask = new Task({ title, priority });
//   await newTask.save();
//   res.status(201).json(newTask);
// });

// app.patch('/tasks/:id', async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
//   res.json(task);
// });

// app.delete('/tasks/:id', async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Task deleted' });
// });


// // ✅ Health check endpoint for Render
// app.get('/healthz', (req, res) => {
//   res.status(200).json({ status: 'ok', uptime: process.uptime() });
// });




// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`🚀 Server listening on port ${PORT}`);
//     });
//   })
//   .catch(err => console.error('MongoDB connection error:', err));



// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
// //   .catch(err => console.error(err));


// =============================
// index.js
// =============================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Task = require('./models/Task');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'https://todo-app-client-89eu.onrender.com' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, priority, scheduledTime } = req.body;
  const newTask = new Task({ title, priority, scheduledTime });
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

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
