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

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Добавить задачу";

const list = document.createElement("ul");
list.className = "task-list";

form.append(nameLabel, nameInput, dateLabel, dateInput, addButton);
main.append(title, description, form, list);
document.body.append(main);

let tasks = [];

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

    tasks.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task";
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

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";

        checkbox.addEventListener("change", function () {
            task.done = checkbox.checked;
            item.classList.toggle("done", task.done);
            saveTasks();
        });

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (other) {
                return other.id !== task.id;
            });

            saveTasks();
            showTasks();
        });

        info.append(taskName, taskDate);
        item.append(checkbox, info, deleteButton);
        list.append(item);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = nameInput.value.trim();

    if (!text) {
        nameInput.setCustomValidity("Введите название задачи");
        nameInput.reportValidity();
        return;
    }

    const task = {
        id: crypto.randomUUID(),
        text: text,
        date: dateInput.value,
        done: false
    };

    tasks.push(task);
    saveTasks();
    showTasks();

    form.reset();
    nameInput.focus();
});

nameInput.addEventListener("input", function () {
    nameInput.setCustomValidity("");
});

showTasks();