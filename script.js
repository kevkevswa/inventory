const form = document.getElementById('add-item-form');
const inventoryTable = document.getElementById('inventory-table');
const showAllCheckbox = document.getElementById('show-all');


let editingRow = null;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const itemName = document.getElementById('item-name').value;
  const itemQuantity = document.getElementById('item-quantity').value;

  if (editingRow) {

    editingRow.querySelector('td:nth-child(1)').innerText = itemName;
    editingRow.querySelector('td:nth-child(2)').innerText = itemQuantity;
    editingRow.classList.remove('editing');
    editingRow = null;
  } else {

    addItemToTable(itemName, itemQuantity);
  }

  form.reset();
});

function addItemToTable(itemName, itemQuantity) {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('inventory-item');

  const nameCell = document.createElement('td');
  nameCell.innerText = itemName;

  const quantityCell = document.createElement('td');
  quantityCell.innerText = itemQuantity;

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', function() {
    editingRow = tableRow;
    tableRow.classList.add('editing');
    document.getElementById('item-name').value = nameCell.innerText;
    document.getElementById('item-quantity').value = quantityCell.innerText;
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    inventoryTable.removeChild(tableRow);
  });

  tableRow.appendChild(nameCell);
  tableRow.appendChild(quantityCell);
  tableRow.appendChild(editButton);
  tableRow.appendChild(deleteButton);

  inventoryTable.appendChild(tableRow);
}

showAllCheckbox.addEventListener('change', function() {
  const inventoryItems = document.querySelectorAll('.inventory-item');

  if (this.checked) {
    inventoryItems.forEach(item => item.style.display = '');
  } else {
    inventoryItems.forEach(item => item.style.display = 'none');
  }
});
