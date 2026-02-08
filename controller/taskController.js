const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, status = "pending", email } = req.body;

    if (!email || !title) {
      return res.status(400).json({ message: "Email and title required" });
    }

    const db = await connectDB();

    const newTask = {
      _id: new Date().getTime().toString(), // simple unique id
      title,
      status,
      createdAt: new Date(),
    };

    await db.collection("users").updateOne(
      { email },
      { $push: { tasks: newTask } }
    );

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};


// Update task (title or status)
exports.updateTask = async (req, res) => {
  try {
    const { email, title, status } = req.body;
    const taskId = req.params.id;

    if (!email || !taskId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const db = await connectDB();

    const updateFields = {};
    if (title) updateFields["tasks.$.title"] = title;
    if (status) updateFields["tasks.$.status"] = status;

    const result = await db.collection("users").updateOne(
      { email, "tasks._id": taskId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { email } = req.body;
    const taskId = req.params.id;

    if (!email || !taskId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const db = await connectDB();

    const result = await db.collection("users").updateOne(
      { email },
      { $pull: { tasks: { _id: taskId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
