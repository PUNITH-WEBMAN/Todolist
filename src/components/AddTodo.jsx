import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddTodo() {
  const [message, setMessage] = useState("");

  const createTodo = async () => {
    if (message === "") {
      toast.error("Cannot add an empty message");
      return;
    }

    if (message.length < 4 || message.length > 20) {
      toast.error("Message must be between 4 and 20 characters");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add`, {
        message: message,
      });

      if (response.data.success === true) {
        toast.success("Todo added successfully!");
        setMessage(""); // Clear the input field
        window.location.reload(); // Refresh the page
      } else {
        // Handle cases where the response was not successful (e.g., server-side validation failed)
        toast.error("Failed to add todo. Please try again.");
      }
    } catch (error) {
      console.error(error);
      
      if (error.response) {
        // Server-side error (e.g., validation failed, server is down)
        if (error.response.status === 400) {
          toast.error("Bad request. Please check your input.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else if (error.request) {
        // Network error (e.g., server unreachable)
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Unknown error
        toast.error("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={message}
        placeholder="Add task here"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={createTodo} className="btn">
        ADD
      </button>
    </div>
  );
}
