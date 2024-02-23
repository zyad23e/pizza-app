let pizzas = []; // Store pizzas with unique IDs and names
let pizzaIdCounter = 1; // Simple counter to assign unique IDs

function createNewPizza() {
    const pizzaNameInput = document.getElementById('newPizzaName');
    const pizzaName = pizzaNameInput.value.trim();
    if (!pizzaName) {
        alert('Please enter a pizza name.');
        return;
    }
    if (pizzas.some(pizza => pizza.name.toLowerCase() === pizzaName.toLowerCase())) {
        alert('This pizza already exists. Please enter a unique pizza name.');
        return;
    }

    const newPizza = {
        id: pizzaIdCounter++, // Increment counter for each new pizza
        name: pizzaName,
        toppings: []
    };
    pizzas.push(newPizza);
    displayPizzas();
    pizzaNameInput.value = ''; // Clear the input field after adding
}

function displayPizzas() {
    const pizzasList = document.getElementById('pizzasList');
    pizzasList.innerHTML = ''; // Clear the list before repopulating

    pizzas.forEach(pizza => {
        const pizzaEl = document.createElement('div');
        pizzaEl.className = 'pizzaItem';
        pizzaEl.innerHTML = `
            <strong>${pizza.name}</strong> - Toppings: ${pizza.toppings.join(', ') || 'None'}
            <button onclick="editPizzaName(${pizza.id})">Edit Pizza</button>
            <button onclick="addTopping(${pizza.id})">Add Topping</button>
            <button onclick="deletePizza(${pizza.id})">Delete</button>
        `;
        pizzasList.appendChild(pizzaEl);
    });
}

function deletePizza(pizzaId) {
    pizzas = pizzas.filter(pizza => pizza.id !== pizzaId);
    displayPizzas();
}

function editPizzaName(pizzaId) {
    const newName = prompt('Enter the new pizza name:');
    if (!newName.trim()) {
        alert('The pizza name cannot be empty.');
        return;
    }
    if (pizzas.some(pizza => pizza.name.toLowerCase() === newName.toLowerCase())) {
        alert('This pizza already exists. Please enter a unique pizza name.');
        return;
    }

    const pizza = pizzas.find(pizza => pizza.id === pizzaId);
    if (pizza) {
        pizza.name = newName.trim();
        displayPizzas();
    }
}

function addTopping(pizzaId) {
    const topping = prompt('Enter a topping:');
    if (!topping.trim()) {
        alert('Please enter a valid topping.');
        return;
    }

    const pizza = pizzas.find(pizza => pizza.id === pizzaId);
    if (pizza && !pizza.toppings.includes(topping.trim())) {
        pizza.toppings.push(topping.trim());
        displayPizzas();
    } else {
        alert('This topping already exists on this pizza.');
    }
}

// Initial call to display pizzas when the page loads
document.addEventListener('DOMContentLoaded', displayPizzas);
