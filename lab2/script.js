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

form.addEventListener("submit", function (event) {
    event.preventDefault();
});

const list = document.createElement("ul");
list.className = "task-list";

form.append(nameLabel, nameInput, dateLabel, dateInput, addButton);
main.append(title, description, form, list);
document.body.append(main);