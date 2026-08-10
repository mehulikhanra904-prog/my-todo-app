import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const API_URL = "https://my-todo-app-71tc.onrender.com";

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
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
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      const newTodo = await response.json();

      setTodos([...todos, newTodo]);
      setTitle("");
      setShowInput(false);
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">

      {/* Click the "Add a new task" area */}
      <button
        className="add-task-area"
        onClick={() => setShowInput(true)}
        aria-label="Add a new task"
      ></button>

      {/* Input appears only after clicking */}
      {showInput && (
        <div className="task-popup">
          <form onSubmit={addTodo}>
            <input
              autoFocus
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>
        </div>
      )}

      {/* Todo list */}
      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-item" key={todo._id}>
            {todo.title}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;