const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "style.css?v=4";
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

const colorField = document.createElement("div");
colorField.className = "color-field";

const colorLabel = document.createElement("span");
colorLabel.textContent = "Цвет задачи";
colorLabel.id = "color-label";
colorLabel.style.fontWeight = "600";

const colorInput = document.createElement("select");
colorInput.id = "task-color";
colorInput.hidden = true;

const colors = [
    ["none", "Без выделения"],
    ["sand", "Бежевый"],
    ["green", "Зелёный"],
    ["blue", "Голубой"],
    ["purple", "Сиреневый"]
];

colors.forEach(function (color) {
    const option = document.createElement("option");
    option.value = color[0];
    option.textContent = color[1];
    colorInput.append(option);
});

const colorPalette = document.createElement("div");
colorPalette.className = "color-palette";
colorPalette.setAttribute("role", "radiogroup");
colorPalette.setAttribute("aria-labelledby", "color-label");

colors.forEach(function (color) {
    const label = document.createElement("label");
    label.className = "color-choice";
    label.dataset.color = color[0];
    label.title = color[1];

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "task-color-choice";
    radio.value = color[0];
    radio.defaultChecked = color[0] === "none";
    radio.checked = color[0] === "none";
    radio.setAttribute("aria-label", color[1]);

    const circle = document.createElement("span");
    circle.className = "color-circle";
    circle.setAttribute("aria-hidden", "true");
    circle.textContent = color[0] === "none" ? "×" : "";

    radio.addEventListener("change", function () {
        colorInput.value = radio.value;
    });

    label.append(radio, circle);
    colorPalette.append(label);
});

colorField.append(colorLabel, colorInput, colorPalette);

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

function getTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

const dateLabel = document.createElement("label");
dateLabel.textContent = "Срок выполнения";
dateLabel.htmlFor = "task-date";

const dateInput = document.createElement("input");
dateInput.id = "task-date";
dateInput.type = "date";
dateInput.required = true;
dateInput.min = getToday();
dateInput.value = getToday();

dateInput.addEventListener("focus", function () {
    dateInput.min = getToday();
    dateInput.setCustomValidity("");
});

dateInput.addEventListener("input", function () {
    dateInput.setCustomValidity("");
});

const dateTools = document.createElement("div");
dateTools.className = "date-tools";

const todayButton = document.createElement("button");
todayButton.type = "button";
todayButton.textContent = "Сегодня";

const tomorrowButton = document.createElement("button");
tomorrowButton.type = "button";
tomorrowButton.textContent = "Завтра";

todayButton.addEventListener("click", function () {
    dateInput.min = getToday();
    dateInput.value = getToday();
    dateInput.setCustomValidity("");
});

tomorrowButton.addEventListener("click", function () {
    dateInput.min = getToday();
    dateInput.value = getTomorrow();
    dateInput.setCustomValidity("");
});

dateTools.append(todayButton, tomorrowButton);
function updateDateButtons() {
    const todaySelected = dateInput.value === getToday();
    const tomorrowSelected = dateInput.value === getTomorrow();

    todayButton.classList.toggle("selected", todaySelected);
    tomorrowButton.classList.toggle("selected", tomorrowSelected);

    todayButton.setAttribute("aria-pressed", todaySelected);
    tomorrowButton.setAttribute("aria-pressed", tomorrowSelected);
}

todayButton.addEventListener("click", updateDateButtons);
tomorrowButton.addEventListener("click", updateDateButtons);
dateInput.addEventListener("input", updateDateButtons);
dateInput.addEventListener("change", updateDateButtons);

updateDateButtons();
const dateRow = document.createElement("div");
dateRow.className = "date-row";
const dateBox = document.createElement("div");
dateBox.className = "date-box";
dateBox.append(dateInput);

dateRow.append(dateBox, dateTools);

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Добавить задачу";

const cancelButton = document.createElement("button");
cancelButton.type = "button";
cancelButton.textContent = "Отмена";
cancelButton.hidden = true;

const formActions = document.createElement("div");
formActions.className = "form-actions";
formActions.append(cancelButton, addButton);

form.append(
    nameLabel,
    nameInput,
    colorField,
    dateLabel,
    dateRow,
    formActions
);

const tools = document.createElement("div");
tools.className = "task-tools";

const search = document.createElement("input");
search.type = "search";
search.placeholder = "Поиск по названию";
search.setAttribute("aria-label", "Поиск задач");

const filter = document.createElement("select");
filter.hidden = true;
filter.setAttribute("aria-label", "Статус задач");

const statuses = [
    ["all", "Все"],
    ["active", "Активные"],
    ["done", "Выполненные"]
];

statuses.forEach(function (status) {
    const option = document.createElement("option");
    option.value = status[0];
    option.textContent = status[1];
    filter.append(option);
});

const statusTabs = document.createElement("div");
statusTabs.className = "status-tabs";
statusTabs.setAttribute("role", "group");
statusTabs.setAttribute("aria-label", "Статус задач");

statuses.forEach(function (status) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = status[1];
    button.dataset.status = status[0];
    button.setAttribute("aria-pressed", status[0] === "all");

    button.addEventListener("click", function () {
        filter.value = status[0];

        statusTabs.querySelectorAll("button").forEach(function (item) {
            item.setAttribute(
                "aria-pressed",
                item.dataset.status === filter.value
            );
        });

        showTasks();
    });

    statusTabs.append(button);
});

const sort = document.createElement("select");
sort.setAttribute("aria-label", "Порядок задач");

const sortOptions = [
    ["manual", "Без сортировки"],
    ["early", "По дате ↑"],
    ["late", "По дате ↓"]
];

sortOptions.forEach(function (option) {
    const item = document.createElement("option");
    item.value = option[0];
    item.textContent = option[1];
    sort.append(item);
});

const listControls = document.createElement("div");
listControls.className = "list-controls";
listControls.append(statusTabs, sort);

tools.append(search, listControls, filter);

const counter = document.createElement("p");
counter.className = "task-counter";
counter.setAttribute("role", "status");

const emptyMessage = document.createElement("p");
emptyMessage.className = "empty-message";
emptyMessage.hidden = true;

const list = document.createElement("ul");
list.className = "task-list";

main.append(
    title,
    description,
    form,
    tools,
    counter,
    emptyMessage,
    list
);

document.body.append(main);

const notice = document.createElement("div");
notice.className = "delete-notice";
notice.hidden = true;

const noticeText = document.createElement("span");
noticeText.setAttribute("role", "status");

const undoButton = document.createElement("button");
undoButton.type = "button";
undoButton.textContent = "Вернуть";

notice.append(noticeText, undoButton);
document.body.append(notice);

let tasks = [];
let editId = null;
let dragId = null;
let deletedTask = null;
let deletedIndex = 0;
let undoTimer = null;

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

function resetForm() {
    editId = null;
    form.reset();
    colorInput.value = "none";
    dateInput.min = getToday();
    dateInput.value = getToday();
    updateDateButtons();
    dateInput.setCustomValidity("");
    nameInput.setCustomValidity("");
    addButton.textContent = "Добавить задачу";
    cancelButton.hidden = true;
}

function showTasks() {
    list.replaceChildren();

    const completed = tasks.filter(function (task) {
        return task.done;
    }).length;

    const active = tasks.length - completed;

    counter.textContent =
        "Осталось: " + active + " · Выполнено: " + completed;

    counter.hidden = tasks.length === 0;

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

    if (sort.value === "early") {
        visible.sort(function (a, b) {
            return a.date.localeCompare(b.date);
        });
    }

    if (sort.value === "late") {
        visible.sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    }

    emptyMessage.hidden = visible.length > 0;

    if (tasks.length === 0) {
        emptyMessage.textContent =
            "Пока нет задач. Добавь первое дело в форме выше.";
    } else if (text !== "" && visible.length === 0) {
        emptyMessage.textContent =
            "Ничего не найдено. Попробуй изменить запрос или статус задач.";
    } else if (filter.value === "active" && visible.length === 0) {
        emptyMessage.textContent =
            "Все задачи выполнены. Можно отдохнуть!";
    } else if (filter.value === "done" && visible.length === 0) {
        emptyMessage.textContent =
            "Здесь появятся выполненные задачи.";
    }

    visible.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task";
        item.dataset.color = task.color || "none";
        item.draggable = sort.value === "manual";
        item.dataset.id = task.id;

const moveButton = document.createElement("button");
moveButton.type = "button";
moveButton.className = "task-move";
moveButton.textContent = "↕";
moveButton.hidden = sort.value !== "manual";
moveButton.setAttribute(
    "aria-label",
    "Перетащить задачу: " + task.text
);

let touchPointer = null;
let touchTarget = null;

function clearTouch() {
    document.querySelectorAll(".touch-target").forEach(function (card) {
        card.classList.remove("touch-target");
    });

    item.classList.remove("dragging");
    touchPointer = null;
    touchTarget = null;
}

moveButton.addEventListener("pointerdown", function (event) {
    if (!event.isPrimary || event.button !== 0) {
        return;
    }

    event.preventDefault();
    touchPointer = event.pointerId;
    touchTarget = null;
    moveButton.setPointerCapture(event.pointerId);
    item.classList.add("dragging");
});

moveButton.addEventListener("pointermove", function (event) {
    if (event.pointerId !== touchPointer) {
        return;
    }

    const element = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    const card = element ? element.closest(".task") : null;

    document.querySelectorAll(".touch-target").forEach(function (other) {
        other.classList.remove("touch-target");
    });

    touchTarget = null;

    if (card && card.parentElement === list && card !== item) {
        touchTarget = card.dataset.id;
        card.classList.add("touch-target");
    }
});

moveButton.addEventListener("pointerup", function (event) {
    if (event.pointerId !== touchPointer) {
        return;
    }

    const targetId = touchTarget;
    clearTouch();

    if (targetId === null || sort.value !== "manual") {
        return;
    }

    const from = tasks.findIndex(function (other) {
        return other.id === task.id;
    });

    const to = tasks.findIndex(function (other) {
        return other.id === targetId;
    });

    if (from === -1 || to === -1) {
        return;
    }

    const moved = tasks.splice(from, 1)[0];
    tasks.splice(to, 0, moved);

    saveTasks();
    showTasks();
});

moveButton.addEventListener("pointercancel", clearTouch);
moveButton.addEventListener("lostpointercapture", clearTouch);

moveButton.addEventListener("dragstart", function (event) {
    event.preventDefault();
});
        item.classList.toggle("done", task.done);

        item.addEventListener("dragstart", function (event) {
            if (sort.value !== "manual") {
                event.preventDefault();
                return;
            }

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
            if (sort.value !== "manual" || dragId === null) {
                return;
            }

            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        item.addEventListener("drop", function (event) {
            event.preventDefault();

            if (
                sort.value !== "manual" ||
                dragId === null ||
                dragId === task.id
            ) {
                return;
            }

            const from = tasks.findIndex(function (other) {
                return other.id === dragId;
            });

            const to = tasks.findIndex(function (other) {
                return other.id === task.id;
            });

            if (from === -1 || to === -1) {
                return;
            }

            const moved = tasks.splice(from, 1)[0];
            tasks.splice(to, 0, moved);
            dragId = null;

            saveTasks();
            showTasks();
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.setAttribute("aria-label", "Выполнено: " + task.text);

        checkbox.addEventListener("change", function () {
            task.done = checkbox.checked;
            saveTasks();
            showTasks();
        });

        const info = document.createElement("div");
        info.className = "task-info";

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.text;

        const taskDate = document.createElement("time");
        taskDate.dateTime = task.date;

        if (task.date === getToday()) {
            taskDate.textContent = "Сегодня";
        } else if (task.date === getTomorrow()) {
            taskDate.textContent = "Завтра";
        } else {
            const date = new Date(task.date + "T00:00:00");

            taskDate.textContent = date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        if (!task.done && task.date < getToday()) {
            taskDate.textContent =
                "Просрочено · " + taskDate.textContent;
            taskDate.className = "overdue";
        }

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-button";
        editButton.textContent = "Изменить";

        editButton.addEventListener("click", function () {
            editId = task.id;
            nameInput.value = task.text;
            dateInput.min = getToday();
            dateInput.value = task.date;
            updateDateButtons();
            dateInput.setCustomValidity("");
            colorInput.value = task.color || "none";

            colorPalette.querySelectorAll("input").forEach(function (radio) {
                radio.checked = radio.value === colorInput.value;
            });

            nameInput.setCustomValidity("");
            addButton.textContent = "Сохранить изменения";
            cancelButton.hidden = false;
            nameInput.focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";

        deleteButton.addEventListener("click", function () {
            clearTimeout(undoTimer);

            deletedIndex = tasks.findIndex(function (other) {
                return other.id === task.id;
            });

            deletedTask = task;
            tasks.splice(deletedIndex, 1);

            if (editId === task.id) {
                resetForm();
            }

            saveTasks();
            showTasks();

            notice.hidden = false;
            noticeText.textContent = "Задача удалена";

            undoTimer = setTimeout(function () {
                deletedTask = null;
                notice.hidden = true;
            }, 7000);
        });

        info.append(taskName, taskDate);
        const actions = document.createElement("div");
actions.className = "task-actions";
actions.append(editButton, deleteButton);

item.append(checkbox, info, moveButton, actions);
        list.append(item);
    });
}

undoButton.addEventListener("click", function () {
    if (deletedTask === null) {
        return;
    }

    clearTimeout(undoTimer);
    tasks.splice(deletedIndex, 0, deletedTask);
    deletedTask = null;
    notice.hidden = true;

    saveTasks();
    showTasks();
});

cancelButton.addEventListener("click", function () {
    resetForm();
});

search.addEventListener("input", function () {
    showTasks();
});

sort.addEventListener("change", function () {
    showTasks();
});

nameInput.addEventListener("input", function () {
    nameInput.setCustomValidity("");
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    dateInput.min = getToday();
    dateInput.setCustomValidity("");

    if (!dateInput.value || dateInput.value < getToday()) {
        dateInput.setCustomValidity(
            "Выберите сегодняшнюю или будущую дату"
        );
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
            done: false,
            color: colorInput.value
        };

        tasks.push(task);
    } else {
        const task = tasks.find(function (other) {
            return other.id === editId;
        });

        if (task) {
            task.text = text;
            task.date = dateInput.value;
            task.color = colorInput.value;
        }
    }

    saveTasks();
    showTasks();
    resetForm();
    nameInput.focus();
});

showTasks();