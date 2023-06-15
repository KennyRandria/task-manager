import React, { useState, useEffect } from "react";
import { useTaskManager } from "../store/useTaskManager";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskManager = () => {
  const { tasks, addTask, updateTask, removeTask, searchTask } = useTaskManager();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [savedTasks, setSavedTasks] = useLocalStorage("tasks", []);

  

  useEffect(() => {
    setSavedTasks(tasks); // Save tasks to localStorage
  }, [tasks, setSavedTasks]);

  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")); // Retrieve tasks from localStorage
    if (loadedTasks) {
      setSavedTasks(loadedTasks);
    }
  }, [setSavedTasks]);

  const handleAddTask = () => {
    addTask({ id: Date.now(), title: newTaskTitle });
    setNewTaskTitle("");
  };

  const handleUpdateTask = (taskId) => {
    updateTask(taskId, { title: updatedTaskTitle });
    setUpdatedTaskTitle("");
  };

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
  };

  const handleSearch = () => {
    searchTask(searchQuery);
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <h2>Add Task</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <h2>Update Task</h2>
      <input
        type="text"
        value={updatedTaskTitle}
        onChange={(e) => setUpdatedTaskTitle(e.target.value)}
      />
      <button onClick={() => handleUpdateTask(tasks[0]?.id)}>Update Task</button>

      <h2>Remove Task</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
        </div>
      ))}

      <h2>Search Task</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TaskManager;
