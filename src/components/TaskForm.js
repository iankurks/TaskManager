import { useState } from "react";
import { api } from "../api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button>Add</button>
    </form>
  );
}
