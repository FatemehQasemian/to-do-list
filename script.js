const formItems = document.getElementById("form-items");
const inputItem = document.getElementById("item-input");
const invalidInput = document.getElementById("input-invalid");
const listItems = document.getElementById("item-list");
const clearAllBtn = document.getElementById("items-clear");
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
}

function onClickItem(e) {
  if (e.target.classList.contains("bi-x")) {
    e.target.parentElement.remove();
  }
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function clearAll(e) {
  listItems.innerText = "";
}

// Event Listener
formItems.addEventListener("submit", addItem);
listItems.addEventListener("click", onClickItem);
clearAllBtn.addEventListener("click", clearAll);
