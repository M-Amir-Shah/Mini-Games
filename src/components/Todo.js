import React, { useState, useEffect } from "react";
import '../css/Todo.css'

function TodoApp() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === "") return;

        if (editingTask) {
            // Save changes if editing a task
            setTasks(
                tasks.map((task) =>
                    task.id === editingTask.id
                        ? { ...task, text: newTask.trim() }
                        : task
                )
            );
            setEditingTask(null); // Exit edit mode
        } else {
            // Add a new task
            setTasks([
                ...tasks,
                { id: Date.now(), text: newTask.trim(), completed: false },
            ]);
        }
        setNewTask(""); // Clear input field
    };

    const editTask = (task) => {
        setNewTask(task.text);
        setEditingTask(task);
    };

    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h1>To-Do App</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Add or edit a task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "100%",
                        fontSize: "16px",
                    }}
                />
                <button
                    onClick={addTask}
                    style={{
                        padding: "10px",
                        backgroundColor: editingTask ? "orange" : "blue",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        fontSize: "16px",
                        marginTop: "10px",
                    }}
                >
                    {editingTask ? "Save Changes" : "Add Task"}
                </button>
            </div>

            <div
                style={{
                    maxHeight: "400px", // Height constraint for scrolling
                    overflow: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                }}
            >
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                borderBottom: "1px solid #ccc",
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            <span
                                onClick={() => toggleTask(task.id)}
                                style={{
                                    cursor: "pointer",
                                    flex: 1,
                                    textAlign: "left",
                                }}
                            >
                                {task.text}
                            </span>
                            <button
                                onClick={() => editTask(task)}
                                style={{
                                    background: "orange",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                    marginRight: "5px",
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoApp;
