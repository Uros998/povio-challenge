import create from 'zustand';

const useStore = create((set) => ({
    tasks: [],

    setTasks: (newTasks) => set({ tasks: newTasks }),

    filterStatus: 'all',

    setFilterStatus: (newStatus) => set({ filterStatus: newStatus }),

    addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),

    editTask: (id, newTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...newTask } : task
            ),
        })),
}));
export default useStore;
