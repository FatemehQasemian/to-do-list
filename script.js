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
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = newItem;
  const icon = createIcon("bi bi-x text-danger");
  li.appendChild(icon);
  listItems.appendChild(li);
  inputItem.value = "";
  checkUI();
}

function onClickItem(e) {
  if (e.target.classList.contains("bi-x")) {
    e.target.parentElement.remove();
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
  console.log(e.target.value.toLowerCase());
}

// Event Listener
checkUI();
formItems.addEventListener("submit", addItem);
listItems.addEventListener("click", onClickItem);
clearAllBtn.addEventListener("click", clearAll);
itemFilter.addEventListener("input", filterItems);
