const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
