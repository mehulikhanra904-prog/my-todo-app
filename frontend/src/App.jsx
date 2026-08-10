import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log("Error loading todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add todo");
      }

      const newTodo = await response.json();

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTitle("");
      setShowInput(false);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Could not add task. Backend is not connected.");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo App</h1>

        <button className="add-btn" onClick={() => setShowInput((prev) => !prev)}>
          {showInput ? "Cancel" : "Add Task"}
        </button>

        {showInput && (
          <form className="todo-form" onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        )}

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">No tasks yet. Add your first task ✨</p>
          ) : (
            todos.map((todo) => (
              <div className="todo-item" key={todo._id}>
                <span>{todo.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;