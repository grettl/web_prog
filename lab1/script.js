const products = [
    {
        id: 1,
        name: "Набор бокалов из фиолетового стекла 6 шт",
        price: 6800,
        image: "images/photo_2026-09-28_16-13-52 (2).jpg"
    },
    {
        id: 2,
        name: "Чайный сервиз с узором \"цветы\"",
        price: 3200,
        image: "images/photo_2026-09-28_16-13-52.jpg"
    },
    {
        id: 3,
        name: "Чайная пара \"сирень\"",
        price: 1950,
        image: "images/photo_2026-09-28_16-13-53 (2).jpg"
    },
    {
        id: 4,
        name: "Тарелка с яблоками",
        price: 3200,
        image: "images/photo_2026-09-28_16-13-53 (3).jpg"
    },
    {
        id: 5,
        name: "Двухъярусная этажерка из красного стекла",
        price: 2100,
        image: "images/photo_2026-09-28_16-13-53.jpg"
    },
    {
        id: 6,
        name: "Этажерка для фруктов полосатая",
        price: 1600,
        image: "images/photo_2026-09-28_16-13-54 (2).jpg"
    },
    {
        id: 7,
        name: "Чайная пара \"земляника\"",
        price: 1100,
        image: "images/photo_2026-09-28_16-13-54.jpg"
    },
    {
        id: 8,
        name: "Разноцветная трёхъярусная этажерка",
        price: 2400,
        image: "images/photo_2026-09-28_16-13-55.jpg"
    },
    {
        id: 9,
        name: "Чайный сервиз с игральными картами",
        price: 3500,
        image: "images/photo_2026-09-28_16-13-55 (2).jpg"
    },
    {
        id: 10,
        name: "Чайник в форме пики",
        price: 1700,
        image: "images/photo_2026-09-28_16-13-55 (3).jpg"
    },
    {
        id: 11,
        name: "Чайник \"малина\"",
        price: 1800,
        image: "images/photo_2026-09-28_16-13-56 (2).jpg"
    },
    {
        id: 12,
        name: "Чайник \"ирис\"",
        price: 1800,
        image: "images/photo_2026-09-28_16-13-56 (3).jpg"
    },
    {
        id: 13,
        name: "Чайник \"звезда\"",
        price: 1700,
        image: "images/photo_2026-09-28_16-13-56.jpg"
    },
    {
        id: 14,
        name: "Керамическая тарелка \"гранат\"",
        price: 1250,
        image: "images/photo_2026-09-28_16-13-57 (2).jpg"
    },
    {
        id: 15,
        name: "Керамическая тарелка \"земляника\"",
        price: 1150,
        image: "images/photo_2026-09-28_16-13-57.jpg"
    },
    {
        id: 16,
        name: "Чайная пара в форме цветка, чёрная",
        price: 1050,
        image: "images/photo_2026-09-28_16-13-58 (2).jpg"
    },
    {
        id: 17,
        name: "Чайная пара в форме цветка, белая",
        price: 1050,
        image: "images/photo_2026-09-28_16-13-58 (3).jpg"
    },
    {
        id: 18,
        name: "Набор керамических пиал \"гранат\"",
        price: 1900,
        image: "images/photo_2026-09-28_16-13-58.jpg"
    },
    {
        id: 19,
        name: "Декоративная тарелка узором",
        price: 1200,
        image: "images/photo_2026-09-28_16-13-59 (2).jpg"
    },
    {
        id: 20,
        name: "Керамическая тарелка \"летучая мышь\"",
        price: 1250,
        image: "images/photo_2026-09-28_16-13-59.jpg"
    },
    {
        id: 21,
        name: "Чайная пара \"летучая мышь\", чёрная",
        price: 1350,
        image: "images/photo_2026-09-28_16-14-00 (2).jpg"
    },
    {
        id: 22,
        name: "Чайная пара \"летучая мышь\", сиреневая",
        price: 1450,
        image: "images/photo_2026-09-28_16-14-00 (3).jpg"
    },
    {
        id: 23,
        name: "Керамическая кружка \"луна и звёзды\"",
        price: 1100,
        image: "images/photo_2026-09-28_16-14-00.jpg"
    },
    {
        id: 24,
        name: "Чайная пара",
        price: 1550,
        image: "images/photo_2026-09-28_16-14-06 (2).jpg"
    },
    {
        id: 25,
        name: "Набор столовых приборов с декоративными ручками",
        price: 2300,
        image: "images/photo_2026-09-28_16-14-06 (3).jpg"
    },
    {
        id: 26,
        name: "Набор бокалов из красного стекла",
        price: 1900,
        image: "images/photo_2026-09-28_16-14-06.jpg"
    },
    {
        id: 27,
        name: "Декоративная тарелка \"волны\", бордовая",
        price: 1300,
        image: "images/photo_2026-09-28_16-14-07 (2).jpg"
    },
    {
        id: 28,
        name: "Декоративная тарелка \"цветы\"",
        price: 1400,
        image: "images/photo_2026-09-28_16-14-07.jpg"
    }
];
const productsContainer = document.getElementById("products");

products.forEach(function (product) {
    productsContainer.innerHTML += `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
            <div class="product-actions" id="actions-${product.id}">
    <button type="button" onclick="addToCart(${product.id})">В корзину</button>
</div>
        </article>
    `;
});
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(function (item) {
    if (item.selected === undefined) {
        item.selected = true;
    }
});
function addToCart(id) {
    const product = products.find(function (item) {
        return item.id === id;
    });

    const cartItem = cart.find(function (item) {
        return item.id === id;
    });

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1, selected: true });
    }

    showCart();
    updateCard(id);
}

function showCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Корзина пуста";
    }

    cart.forEach(function (item) {
        const itemTotal = item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <input
                    type="checkbox"
                    class="cart-checkbox"
                    aria-label="Выбрать ${item.name}"
                    ${item.selected ? "checked" : ""}
                    onchange="toggleSelected(${item.id})"
                >

                <img
                    class="cart-item-image"
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">
                    <strong>${item.name}</strong>

                    <div class="cart-quantity">
                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)"
                        >−</button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)"
                        >+</button>
                    </div>

                    <p>${itemTotal} ₽</p>
                </div>

                <button
                    type="button"
                    class="cart-remove"
                    aria-label="Удалить ${item.name}"
                    title="Удалить товар"
                    onclick="removeFromCart(${item.id})"
                >×</button>

            </div>
        `;

        if (item.selected) {
            total += itemTotal;
        }
    });

    cartTotal.textContent = total;

    document.getElementById("remove-selected").disabled =
        !cart.some(function (item) {
            return item.selected;
        });

    document.getElementById("checkout-button").disabled =
        !cart.some(function (item) {
            return item.selected;
        });

    localStorage.setItem("cart", JSON.stringify(cart));
}
function toggleCart() {
    document.getElementById("cart").classList.toggle("open");
}
function changeQuantity(id, amount) {
    const item = cart.find(function (product) {
        return product.id === id;
    });

    item.quantity += amount;

    if (item.quantity === 0) {
        cart.splice(cart.indexOf(item), 1);
    }

    showCart();
    updateCard(id);
}

function updateCard(id) {
    const actions = document.getElementById(`actions-${id}`);
    const item = cart.find(function (product) {
        return product.id === id;
    });

    if (item) {
        actions.innerHTML = `
            <button type="button" onclick="changeQuantity(${id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="changeQuantity(${id}, 1)">+</button>
        `;
    } else {
        actions.innerHTML = `
            <button type="button" onclick="addToCart(${id})">В корзину</button>
        `;
    }
}
function toggleSelected(id) {
    const item = cart.find(function (product) {
        return product.id === id;
    });

    item.selected = !item.selected;
    showCart();
}

function removeFromCart(id) {
    const index = cart.findIndex(function (item) {
        return item.id === id;
    });

    if (index !== -1) {
        cart.splice(index, 1);
    }

    showCart();
    updateCard(id);
}
function removeSelected() {
    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].selected) {
            const id = cart[i].id;
            cart.splice(i, 1);
            updateCard(id);
        }
    }

    showCart();
}
cart.forEach(function (item) {
    updateCard(item.id);
});

showCart();
function openOrderForm() {
    const selectedItems = cart.filter(function (item) {
        return item.selected;
    });

    const orderProducts = document.getElementById("order-products");
    const orderTotal = document.getElementById("order-total");

    orderProducts.innerHTML = "";

    let total = 0;

    selectedItems.forEach(function (item) {
        const itemTotal = item.price * item.quantity;

        orderProducts.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.quantity} шт. · ${itemTotal} ₽</p>
                </div>
            </div>
        `;

        total += itemTotal;
    });

    orderTotal.textContent = "Итого: " + total + " ₽";

    document.getElementById("order-modal").classList.add("open");
}

function closeOrderForm() {
    document.getElementById("order-modal").classList.remove("open");
}
document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();

    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].selected) {
            const id = cart[i].id;
            cart.splice(i, 1);
            updateCard(id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
    closeOrderForm();

    this.reset();

    document.getElementById("success-modal").classList.add("open");
});
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {
    let numbers = this.value.replace(/\D/g, "");

    if (numbers.length === 11 && (numbers[0] === "7" || numbers[0] === "8")) {
        numbers = numbers.slice(1);
    }

    numbers = numbers.slice(0, 10);

    let formatted = "";

    if (numbers.length > 0) {
        formatted += numbers.slice(0, 3);
    }

    if (numbers.length > 3) {
        formatted += " " + numbers.slice(3, 6);
    }

    if (numbers.length > 6) {
        formatted += " " + numbers.slice(6, 8);
    }

    if (numbers.length > 8) {
        formatted += " " + numbers.slice(8, 10);
    }

    this.value = formatted;
});
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const addressInput = document.getElementById("address");

firstNameInput.addEventListener("invalid", function () {
    if (this.value === "") {
        this.setCustomValidity("Введите имя");
    } else {
        this.setCustomValidity("Имя должно содержать только буквы");
    }
});

lastNameInput.addEventListener("invalid", function () {
    if (this.value === "") {
        this.setCustomValidity("Введите фамилию");
    } else {
        this.setCustomValidity("Фамилия должна содержать только буквы");
    }
});

addressInput.addEventListener("invalid", function () {
    this.setCustomValidity("Введите адрес");
});

phoneInput.addEventListener("invalid", function () {
    this.setCustomValidity("Введите номер телефона полностью");
});
[firstNameInput, lastNameInput, addressInput, phoneInput].forEach(function (input) {
    input.addEventListener("input", function () {
        this.setCustomValidity("");
    });
});
function closeSuccessModal() {
    document.getElementById("success-modal").classList.remove("open");
}