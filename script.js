const formItems = document.getElementById("form-items");
const inputItem = document.getElementById("item-input");
const invalidInput = document.getElementById("input-invalid");
const listItems = document.getElementById("item-list");
const clearAllBtn = document.getElementById("items-clear");
const itemFilter = document.getElementById("filter");
const addItemBtn = formItems.querySelector("button");
let isEditMode = false;

function getCurrentDateAndTime() {
  let date = new Date().toDateString();
  document.getElementById("date").innerText = date.substring(
    0,
    date.length - 4 - 1
  );
}

function addItem(e) {
  e.preventDefault();
  const newItem = inputItem.value;
  if (newItem == "") {
    invalidInput.innerText = "Please add an item";
    return;
  } else {
    invalidInput.innerText = "";
  }
  if (isEditMode) {
    const itemToEdit = listItems.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();
    addItemBtn.innerHTML = "<i class='bi bi-plus'></i> Add Task";
    addItemBtn.classList.replace("btn-primary", "btn-dark");
    isEditMode = false;
  }
  if (checkIfItemExists(newItem)) {
    invalidInput.innerText = "This task already exists!";
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);
  inputItem.value = "";
  checkUI();
}

function checkIfItemExists(newItem) {
  const itemsFromStorge = getItemFromStorage();
  return itemsFromStorge.includes(newItem);
}

function addItemToDOM(newItem) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = newItem;
  const icon = createIcon("bi bi-x text-danger");
  li.appendChild(icon);
  listItems.appendChild(li);
}

function addItemToStorage(newItem) {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(newItem);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function displayItems() {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.classList.contains("bi-x")) {
    removeItem(e.target.parentElement);
  } else {
    setItemToEdit(e.target);
  }
  checkUI();
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function setItemToEdit(item) {
  isEditMode = true;
  listItems
    .querySelectorAll("li")
    .forEach((item) => item.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  inputItem.value = item.textContent;
  addItemBtn.innerHTML = "<i class='bi bi-pencil'></i> Edit Item";
  addItemBtn.classList.replace("btn-dark", "btn-primary");
  // addItemBtn.style.backgroundColor = "#007bff";
}

function removeItem(item) {
  item.remove();
  removeItemFromStorage(item.textContent);
}

function clearAll(e) {
  listItems.innerText = "";
  localStorage.removeItem("items");
  checkUI();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  let temp = [];
  for (let index = 0, i = 0; index < itemsFromStorage.length; index++) {
    if (itemsFromStorage[index] != item) {
      temp[i] = itemsFromStorage[index];
      i++;
    }
  }
  localStorage.setItem("items", JSON.stringify(temp));
}

function checkUI() {
  const len = listItems.querySelectorAll("li").length;
  if (len == 0) {
    clearAllBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearAllBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

function filterItems(e) {
  const items = listItems.querySelectorAll("li");
  const filterText = e.target.value.toLowerCase();
  let i = 0;
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(filterText) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event Listener
checkUI();
getCurrentDateAndTime();
formItems.addEventListener("submit", addItem);
listItems.addEventListener("click", onClickItem);
clearAllBtn.addEventListener("click", clearAll);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
