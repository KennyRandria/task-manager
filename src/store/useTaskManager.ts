import create from "zustand";

const useTaskManager = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTask.title } : task
      ),
    })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  searchTask: (query) =>
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      ),
    })),
}));

export { useTaskManager };
