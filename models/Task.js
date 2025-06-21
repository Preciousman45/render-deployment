// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
//   done: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Task', TaskSchema);


const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  done: { type: Boolean, default: false },
  scheduledTime: Date
});

module.exports = mongoose.model('Task', TaskSchema);