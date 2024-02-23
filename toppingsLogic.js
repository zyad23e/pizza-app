document.getElementById('toppingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    var newTopping = document.getElementById('newTopping').value.trim();
    if (newTopping === '') {
        alert('Please enter a topping name.');
        return;
    }

    // Check for duplicate toppings
    var toppingsList = document.getElementById('toppingList').getElementsByTagName('li');
    var isDuplicate = Array.from(toppingsList).some(li => li.firstChild.textContent === newTopping);
    if (isDuplicate) {
        alert('This topping already exists. Please enter a new topping.');
        return;
    }

    addToppingToList(newTopping);
    document.getElementById('newTopping').value = ''; // Clear input
});

function addToppingToList(toppingName) {
    var li = document.createElement('li');

    var textSpan = document.createElement('span');
    textSpan.textContent = toppingName;

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() {
        var newToppingName = prompt('Update the topping:', textSpan.textContent);
        if (newToppingName && newToppingName.trim() !== '' && newToppingName !== textSpan.textContent) {
            // Check for duplicate before updating
            var toppingsList = document.getElementById('toppingList').getElementsByTagName('li');
            var isDuplicate = Array.from(toppingsList).some(li => li.firstChild.textContent.trim() === newToppingName.trim());
            if (!isDuplicate) {
                textSpan.textContent = newToppingName.trim();
            } else {
                alert('This topping already exists.');
            }
        }
    };

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() { li.remove(); };
    deleteBtn.style.marginLeft = '10px';

    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById('toppingList').appendChild(li);
}
