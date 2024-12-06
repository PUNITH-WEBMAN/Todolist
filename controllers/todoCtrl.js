const Todo = require("../model/todo");

const createToDo = async (req, res) => {
  const { message } = req.body;

  if (!message || message.length < 4 || message.length > 20) {
    return res
      .status(400)
      .json({ errorMessage: "Message must be between 4 and 20 characters." });
  }

  try {
    const addToDo = await Todo.create({ message });
    res.status(201).json({ success: true, data: addToDo });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllToDo = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateToDo = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message || message.length < 4 || message.length > 20) {
    return res
      .status(400)
      .json({ errorMessage: "Message must be between 4 and 20 characters." });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createToDo, getAllToDo, updateToDo, deleteToDo };
