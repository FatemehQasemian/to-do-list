const formItems = document.getElementById("form-items");
const inputItem = document.getElementById("item-input");
const invalidInput = document.getElementById("input-invalid");
const listItems = document.getElementById("item-list");
const clearAllBtn = document.getElementById("items-clear");
const itemFilter = document.getElementById("filter");
// const btn = document.getElementById("btn");

function addItem(e) {
  e.preventDefault();
  const newItem = inputItem.value;
  if (newItem == "") {
    invalidInput.innerText = "Please add an item";
    return;
  } else {
    invalidInput.innerText = "";
  }
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  inputItem.value = "";
  checkUI();
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
    e.target.parentElement.remove();
    removeItemFromStorage(e.target.parentElement.textContent);
  }
  checkUI();
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function clearAll(e) {
  listItems.innerText = "";
  checkUI();
}

function removeItemFromStorage() {}

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
formItems.addEventListener("submit", addItem);
listItems.addEventListener("click", onClickItem);
clearAllBtn.addEventListener("click", clearAll);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
