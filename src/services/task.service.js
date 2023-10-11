export const getAllTasks = async () => {
    return JSON.parse(localStorage.getItem("taskList")) || [];
}

export const localStorageList = async () => {
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    if (taskList.length < 1) {
        const data = await import( "../mock-data/task-info.json");
        localStorage.setItem("taskList", JSON.stringify(data.default));
    }
}

export const getTaskById = async (taskId) => {
    try {
        const allTasks = await getAllTasks();
        return allTasks.find(task => task.id === parseInt(taskId));
    } catch (error) {
        console.error("Greška pri dohvatanju zadatka po ID-u:", error);
        return null;
    }
}

export const getRadnomTask = async () => {
    const randomId = Math.floor(Math.random() * 200) + 1;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);

        if (!response.ok) {
            return new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const saveTask = async (task) => {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push(task)
    localStorage.setItem('taskList', JSON.stringify(taskList));
    return task;
}

export const updateTask = async (task) => {
    console.log("Update task");
    return task;
}

export const deleteTask = async (task) => {
    console.log("Delete task");
}
