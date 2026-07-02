// ===============================
// DOM ELEMENTS
// ===============================

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const dueDate = document.getElementById("dueDate");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const toast = document.getElementById("toast");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// TOAST
// ===============================

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ===============================
// UPDATE DASHBOARD
// ===============================

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTask.textContent = total;
    completedTask.textContent = completed;
    pendingTask.textContent = pending;

    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    progressFill.style.width = percent + "%";
    progressPercent.textContent = percent + "%";

}

// ===============================
// RENDER TASKS
// ===============================

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
        <div class="left">

            <input
            type="checkbox"
            class="complete"
            ${task.completed ? "checked" : ""}>

            <div class="details">

                <h3 class="taskName">${task.name}</h3>

                <div class="meta">

                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    <span class="category">
                        ${task.category}
                    </span>

                    <span class="date">
                        ${task.date || "No Date"}
                    </span>

                </div>

            </div>

        </div>

        <div class="actions">

            <button class="edit">
                <i class="fa-solid fa-pen"></i>
            </button>

            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        `;

        taskList.appendChild(li);

    });

    updateDashboard();
    saveTasks();

}

// ===============================
// ADD TASK
// ===============================

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({

        name: text,

        priority: priority.value,

        category: category.value,

        date: dueDate.value,

        completed: false

    });

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();

    showToast("Task Added");

});

// ENTER KEY SUPPORT

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        addBtn.click();
    }

});

// ===============================
// INITIAL LOAD
// ===============================

renderTasks();
// ===============================
// COMPLETE / DELETE / EDIT
// ===============================

taskList.addEventListener("click", (e) => {

    const taskElement = e.target.closest(".task");

    if (!taskElement) return;

    const index = [...taskList.children].indexOf(taskElement);

    // Delete Task
    if (
        e.target.classList.contains("delete") ||
        e.target.closest(".delete")
    ) {

        if (confirm("Delete this task?")) {

            tasks.splice(index, 1);

            renderTasks();

            showToast("Task Deleted");

        }

        return;

    }

    // Edit Task
    if (
        e.target.classList.contains("edit") ||
        e.target.closest(".edit")
    ) {

        const newTask = prompt("Edit Task", tasks[index].name);

        if (newTask !== null && newTask.trim() !== "") {

            tasks[index].name = newTask.trim();

            renderTasks();

            showToast("Task Updated");

        }

        return;

    }

});

// ===============================
// COMPLETE TASK
// ===============================

taskList.addEventListener("change", (e) => {

    if (!e.target.classList.contains("complete")) return;

    const taskElement = e.target.closest(".task");

    const index = [...taskList.children].indexOf(taskElement);

    tasks[index].completed = e.target.checked;

    renderTasks();

    if (e.target.checked) {

        showToast("Task Completed");

    } else {

        showToast("Task Marked Pending");

    }

});

// ===============================
// SEARCH TASK
// ===============================

const searchTask = document.getElementById("searchTask");

searchTask.addEventListener("keyup", () => {

    const value = searchTask.value.toLowerCase();

    const allTasks = document.querySelectorAll("#taskList .task");

    allTasks.forEach(task => {

        const name = task
            .querySelector(".taskName")
            .textContent
            .toLowerCase();

        if (name.includes(value)) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

});
// ===============================
// FILTER TASKS
// ===============================

const filterButtons = document.querySelectorAll(".filter");

let currentFilter = "all";

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        applyFilter();

    });

});

function applyFilter() {

    const items = document.querySelectorAll("#taskList .task");

    items.forEach((item, index) => {

        const task = tasks[index];

        switch (currentFilter) {

            case "active":
                item.style.display = task.completed ? "none" : "flex";
                break;

            case "completed":
                item.style.display = task.completed ? "flex" : "none";
                break;

            default:
                item.style.display = "flex";

        }

    });

}

// ===============================
// DARK MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});

// ===============================
// CLEAR COMPLETED
// ===============================

const clearCompleted = document.getElementById("clearCompleted");

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    renderTasks();

    applyFilter();

    showToast("Completed Tasks Cleared");

});

// ===============================
// EXPORT JSON
// ===============================

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {

    const blob = new Blob(
        [JSON.stringify(tasks, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "tasks.json";

    a.click();

    URL.revokeObjectURL(url);

});

// ===============================
// IMPORT JSON
// ===============================

const importBtn = document.getElementById("importBtn");

const fileInput = document.getElementById("fileInput");

importBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

        try {

            const imported = JSON.parse(event.target.result);

            if (Array.isArray(imported)) {

                tasks = imported;

                renderTasks();

                applyFilter();

                showToast("Tasks Imported");

            } else {

                alert("Invalid JSON File");

            }

        } catch {

            alert("Import Failed");

        }

    };

    reader.readAsText(file);

});

// ===============================
// OVERRIDE RENDER TO APPLY FILTER
// ===============================

const originalRender = renderTasks;

renderTasks = function () {

    originalRender();

    applyFilter();

};

// ===============================
// INITIALIZE
// ===============================

renderTasks();