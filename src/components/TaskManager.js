import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API = "http://localhost:5000/api";

export default function TaskManager({ user, onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const fetchTasks = async () => {
        const res = await axios.get(`${API}/tasks`);
        const userEmail = localStorage.getItem("userEmail")

        
        const tasksList = res.data.find((e) => e.email === userEmail)?.tasks || []

        setTasks(tasksList);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await axios.post(`${API}/tasks`, { title, email:localStorage.getItem("userEmail") });
        setTitle("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        // await axios.delete(`${API}/${id}`);
        await axios.delete(`${API}/tasks/${id}`, {
            data: { email: localStorage.getItem("userEmail") }
        });
        fetchTasks();
    };

const updateStatus = async (id, status) => {
  await axios.put(`${API}/tasks/${id}`, {
    email: localStorage.getItem("userEmail"),
    status, // 👈 use passed value, not hardcoded
  });

  fetchTasks();
};

const updateTitle = async (id) => {
  if (!editTitle.trim()) return;

  await axios.put(`${API}/tasks/${id}`, {
    email: localStorage.getItem("userEmail"),
    title: editTitle,
  });

  setEditingId(null);
  setEditTitle("");
  fetchTasks();
};

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks =
        filter === "all"
            ? tasks
            : tasks.filter((t) => t.status === filter);

    return (
        <div className="app-container">
            {/* Header */}
            <div className="app-header">
                {/* <img src={taskImage} alt="Task Manager" /> */}
                <h1>Task Manager</h1>
                <p style={{ fontSize: "14px" }}>
                    Logged in as <b>{user}</b>{" "}
                    <button
                        style={{
                            marginLeft: "8px",
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "2px 6px",
                            cursor: "pointer",
                        }}
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </p>
            </div>

            {/* Filters */}
            <div className="filters">
                {["all", "pending", "completed", "onHold"].map((f) => (
                    <button
                        key={f}
                        className={filter === f ? "active" : ""}
                        onClick={() => setFilter(f)}
                    >
                        {f === "all" ? "All" : f}
                    </button>
                ))}
            </div>

            {/* Add Task */}
            <form className="task-form" onSubmit={addTask}>
                <input
                    placeholder="What do you need to do?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button>Add</button>
            </form>

            {/* Tasks */}
            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    {/* <img
                        src={NoData}
                        alt="No tasks"
                    /> */}
                    <p>No tasks here. Add one ✨</p>
                </div>
            ) : (
                <ul className="task-list">
                    {filteredTasks.map((task) => (
                        <li className="task-item" key={task._id}>
                            <div className="task-left">
                                {editingId === task._id ? (
                                    <>
                                        <input
                                            className="edit-input"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <button
                                            className="save-btn"
                                            onClick={() => updateTitle(task._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => {
                                                setEditingId(null);
                                                setEditTitle("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className="task-title editable"
                                            onClick={() => {
                                                setEditingId(task._id);
                                                setEditTitle(task.title);
                                            }}
                                        >
                                            {task.title}
                                        </span>
                                        <select
                                            className={`status-select ${task.status}`}
                                            value={task.status}
                                            onChange={(e) =>
                                                updateStatus(task._id, e.target.value)
                                            }
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                            <option value="onHold">On Hold</option>
                                        </select>
                                    </>
                                )}
                            </div>

                            {editingId !== task._id && (
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    ✖
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
