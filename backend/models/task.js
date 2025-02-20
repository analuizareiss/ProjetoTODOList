const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  end_date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);