import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ _id: null, message: "" });

  const getAllToDo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getall`);
      if (response.data.success) {
        setTodos(response.data.data || []);
      } else {
        toast.error("Failed to fetch todos.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos. Please check your API connection or backend.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllToDo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteToDo/${id}`);
      if (response.data.success) {
        toast.success("Todo deleted successfully!");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        toast.error("Failed to delete todo.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo. Please try again later.");
    }
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, message: e.target.value });
  };

  const handleEditSave = async () => {
    if (currentTodo.message.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateToDo/${currentTodo._id}`, { message: currentTodo.message });
      if (response.data.success) {
        toast.success("Todo updated successfully!");
        setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === currentTodo._id ? { ...todo, message: currentTodo.message } : todo)));
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: "" });
      } else {
        toast.error("Failed to update todo.");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo. Please try again later.");
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setCurrentTodo({ _id: null, message: "" });
  };

  return (
    <div className="max-w-screen min-h-screen mx-auto p-4 bg-black">
      <h1 className="text-2xl font-bold text-center text-yellow-400 mb-6">Todo Lists</h1>

      {isLoading ? (
        <p className="text-center text-yellow-400">Loading todos...</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center mb-4 p-4 border border-yellow-400 rounded-md bg-black hover:bg-yellow-50"
          >
            {isEditing && currentTodo._id === todo._id ? (
              <input
                type="text"
                value={currentTodo.message}
                onChange={handleInputChange}
                className="flex-grow border focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 rounded px-2 py-1 mr-4 text-black"
              />
            ) : (
              <span className="text-lg font-medium text-yellow-400">{todo.message}</span>
            )}
            <div className="flex items-center gap-4">
              {isEditing && currentTodo._id === todo._id ? (
                <>
                  <button
                    onClick={handleEditSave}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="bg-gray-700 text-yellow-400 px-3 py-1 rounded hover:bg-yellow-400 hover:text-black"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <AiFillEdit
                    className="text-green-400 cursor-pointer hover:text-yellow-500"
                    size={24}
                    onClick={() => handleEditClick(todo)}
                  />
                  <MdDelete
                    className="text-red-400 cursor-pointer hover:text-yellow-500"
                    size={24}
                    onClick={() => handleDelete(todo._id)}
                  />
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-yellow-400">No todos available</p>
      )}
    </div>
  );
};

export default TodoList;
