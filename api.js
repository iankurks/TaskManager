const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("./db");

const router = express.Router();

// Allowed status values
const VALID_STATUS = ["pending", "completed", "onHold"];

// ---------- Get all tasks ----------
router.get("/tasks", async (req, res) => {
  try {
    const db = await connectDB();
    console.log("db",db);
    
    const tasks = await db.collection("users")    
      .find({})
      .toArray();
    console.log("tasks",tasks);

    res.json(tasks);
  } catch (err) {
    console.log("err",err);
    
    res.status(500).json({ message: err.message });
  }
});

// ---------- Create task ----------
router.post("/tasks", async (req, res) => {
  try {
    const { title, email } = req.body;
    console.log(title, email );
    
    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // if (status && !VALID_STATUS.includes(status)) {
    //   return res.status(400).json({ message: "Invalid status value" });
    // }

    const db = await connectDB();

    const newTask = {
      _id: Date.now().toString(), // simple unique id
      title: title.trim(),
      status: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("users").updateOne(
      { email },
      { $push: { tasks: newTask } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ---------- Update task ----------
router.put("/tasks/:id", async (req, res) => {
  try {
    const { title, status, email } = req.body;
    const taskId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const db = await connectDB();

    const updateFields = {};
    if (title) updateFields["tasks.$.title"] = title.trim();
    if (status) updateFields["tasks.$.status"] = status;

    const result = await db.collection("users").updateOne(
      { email, "tasks._id": taskId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------- Delete task ----------
// ---------- Delete task ----------
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const taskId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const db = await connectDB();

    const result = await db.collection("users").updateOne(
      { email },
      { $pull: { tasks: { _id: taskId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
