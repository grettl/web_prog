const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "style.css";
document.head.append(style);

const main = document.createElement("main");
main.className = "app";

const title = document.createElement("h1");
title.textContent = "Список задач";

const description = document.createElement("p");
description.textContent = "Планируй дела и отмечай выполненное.";

const form = document.createElement("form");
form.className = "task-form";

const nameLabel = document.createElement("label");
nameLabel.textContent = "Название задачи";
nameLabel.htmlFor = "task-name";

const nameInput = document.createElement("input");
nameInput.id = "task-name";
nameInput.type = "text";
nameInput.placeholder = "Что нужно сделать?";
nameInput.required = true;
nameInput.maxLength = 150;

const dateLabel = document.createElement("label");
dateLabel.textContent = "Дата";
dateLabel.htmlFor = "task-date";

const dateInput = document.createElement("input");
dateInput.id = "task-date";
dateInput.type = "date";
dateInput.required = true;

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

dateInput.min = getToday();

dateInput.addEventListener("focus", function () {
    dateInput.min = getToday();
    dateInput.setCustomValidity("");
});

dateInput.addEventListener("input", function () {
    dateInput.setCustomValidity("");
});

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Добавить задачу";

const list = document.createElement("ul");
list.className = "task-list";

form.append(nameLabel, nameInput, dateLabel, dateInput, addButton);
main.append(title, description, form, list);
document.body.append(main);
const tools = document.createElement("div");
tools.className = "task-tools";

const search = document.createElement("input");
search.type = "search";
search.placeholder = "Поиск по названию";
search.setAttribute("aria-label", "Поиск задач");

const filter = document.createElement("select");
filter.setAttribute("aria-label", "Статус задач");

const options = [
    ["all", "Все задачи"],
    ["active", "Активные"],
    ["done", "Выполненные"]
];

options.forEach(function (option) {
    const item = document.createElement("option");
    item.value = option[0];
    item.textContent = option[1];
    filter.append(item);
});

tools.append(search, filter);
main.insertBefore(tools, list);

search.addEventListener("input", function () {
    showTasks();
});

filter.addEventListener("change", function () {
    showTasks();
});

let tasks = [];

let editId = null;
let dragId = null;

const cancelButton = document.createElement("button");
cancelButton.type = "button";
cancelButton.textContent = "Отмена";
cancelButton.hidden = true;
form.append(cancelButton);

function resetForm() {
    editId = null;
    form.reset();
    nameInput.setCustomValidity("");
    addButton.textContent = "Добавить задачу";
    cancelButton.hidden = true;
}

cancelButton.addEventListener("click", function () {
    resetForm();
});

try {
    const data = JSON.parse(localStorage.getItem("lab2-tasks"));

    if (Array.isArray(data)) {
        tasks = data;
    }
} catch {
    alert("Не удалось загрузить сохранённые задачи.");
}

function saveTasks() {
    try {
        localStorage.setItem("lab2-tasks", JSON.stringify(tasks));
    } catch {
        alert("Не удалось сохранить задачи в браузере.");
    }
}

function showTasks() {
    list.replaceChildren();

    const text = search.value.trim().toLowerCase();

    const visible = tasks.filter(function (task) {
        const match = task.text.toLowerCase().includes(text);

        if (filter.value === "active") {
            return match && !task.done;
        }

        if (filter.value === "done") {
            return match && task.done;
        }

        return match;
    });

    visible.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task";
        item.draggable = true;

item.addEventListener("dragstart", function (event) {
    dragId = task.id;
    event.dataTransfer.setData("text/plain", task.id);
    event.dataTransfer.effectAllowed = "move";
    item.classList.add("dragging");
});

item.addEventListener("dragend", function () {
    dragId = null;
    item.classList.remove("dragging");
});

item.addEventListener("dragover", function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
});

item.addEventListener("drop", function (event) {
    event.preventDefault();

    if (dragId === null || dragId === task.id) {
        return;
    }

    const from = tasks.findIndex(function (task) {
        return task.id === dragId;
    });

    if (from === -1) {
        return;
    }

    const to = tasks.findIndex(function (other) {
    return other.id === task.id;
});

const moved = tasks.splice(from, 1)[0];
tasks.splice(to, 0, moved);
    dragId = null;

    saveTasks();
    showTasks();
});
        item.classList.toggle("done", task.done);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.setAttribute("aria-label", "Выполнено: " + task.text);

        const info = document.createElement("div");
        info.className = "task-info";

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.text;

        const taskDate = document.createElement("time");
        taskDate.dateTime = task.date;
        taskDate.textContent = task.date.split("-").reverse().join(".");
        const editButton = document.createElement("button");
editButton.type = "button";
editButton.className = "edit-button";
editButton.textContent = "Изменить";

editButton.addEventListener("click", function () {
    editId = task.id;
    nameInput.value = task.text;
    dateInput.value = task.date;
    nameInput.setCustomValidity("");
    addButton.textContent = "Сохранить изменения";
    cancelButton.hidden = false;
    nameInput.focus();
});

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";

        checkbox.addEventListener("change", function () {
    task.done = checkbox.checked;
    saveTasks();
    showTasks();
});


        deleteButton.addEventListener("click", function () {
    tasks = tasks.filter(function (other) {
        return other.id !== task.id;
    });

    if (editId === task.id) {
        resetForm();
    }

    saveTasks();
    showTasks();
});

        info.append(taskName, taskDate);
        item.append(checkbox, info, editButton, deleteButton);
        list.append(item);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

        dateInput.setCustomValidity("");

    if (dateInput.value < getToday()) {
        dateInput.setCustomValidity("Выберите сегодняшнюю или будущую дату");
        dateInput.reportValidity();
        return;
    }

    const text = nameInput.value.trim();

    if (!text) {
        nameInput.setCustomValidity("Введите название задачи");
        nameInput.reportValidity();
        return;
    }

        if (editId === null) {
        const task = {
            id: crypto.randomUUID(),
            text: text,
            date: dateInput.value,
            done: false
        };

        tasks.push(task);
    } else {
        const task = tasks.find(function (task) {
            return task.id === editId;
        });

        if (task) {
            task.text = text;
            task.date = dateInput.value;
        }
    }

    saveTasks();
    showTasks();
    resetForm();
    nameInput.focus();
});
nameInput.addEventListener("input", function () {
    nameInput.setCustomValidity("");
});

showTasks();
