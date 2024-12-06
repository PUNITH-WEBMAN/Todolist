const express = require('express');
const {
  createToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/todoCtrl');
const router = express.Router();

// Define routes
router.post('/add', createToDo);          // POST to create a new todo
router.get('/getall', getAllToDo);        // GET to fetch all todos
router.put('/updateToDo/:id', updateToDo); // PUT to update a todo
router.delete('/deleteToDo/:id', deleteToDo); // DELETE to delete a todo

module.exports = router;
