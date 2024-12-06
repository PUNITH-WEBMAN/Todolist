import React from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
// import Todo from '../../backend/model/todo'
import 'react-toastify/dist/ReactToastify.css';
import Todolist from './components/TodoList';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div>
      <Header/>
      <AddTodo/>
      <Todolist/>
      <ToastContainer/>
      
    </div>
  )
}
