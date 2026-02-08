import { api } from "../api";

export default function TaskList({ tasks, fetchTasks }) {
  const toggleTask = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : ""
            }}
            onClick={() => toggleTask(task)}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
