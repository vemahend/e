let expenses = [];
let totalExpenses = 0;

// Function to add a new expense
function addExpense() {
  const quantity = parseInt(document.getElementById("quantity").value);

  if (quantity > 0) {
    for (let i = 0; i < quantity; i++) {
      addExpenseCommon();
    }
  } else {
    addExpenseCommon();
  }
  clearInputs();
}

function addExpenseCommon() {
  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (name && amount && amount > 0) {
    const expense = { name, amount };
    expenses.push(expense);
    totalExpenses += amount;

    updateTable();
    updateTotalExpenses();
  } else {
    alert("Please enter a valid name and amount.");
  }
}

// Function to update the expense table
function updateTable() {
  const tableBody = document.getElementById("expenseTableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  expenses.forEach((expense) => {
    const row = `<tr>
                        <td>${expense.name}</td>
                        <td>$${expense.amount.toFixed(2)}</td>
                     </tr>`;
    tableBody.innerHTML += row;
  });
}

// Function to update total expenses display
function updateTotalExpenses() {
  document.getElementById("totalExpenses").innerText = totalExpenses.toFixed(2);
}

// Function to clear input fields
function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("quantity").value = "";
}

// Function to save data to a file (JSON format)
function saveToFile() {
  const data = JSON.stringify({ expenses, totalExpenses });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.json";
  a.click();
}

// Function to load data from a file
function loadFromFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = JSON.parse(e.target.result);
      expenses = data.expenses || [];
      totalExpenses = data.totalExpenses || 0;

      updateTable();
      updateTotalExpenses();
    };
    reader.readAsText(file);
  }
}

// Automatically load saved data if available in local storage
window.onload = function () {
  const savedExpenses = localStorage.getItem("expenses");
  const savedTotal = localStorage.getItem("totalExpenses");

  if (savedExpenses && savedTotal) {
    expenses = JSON.parse(savedExpenses);
    totalExpenses = parseFloat(savedTotal);

    updateTable();
    updateTotalExpenses();
  }
};

// Save data to local storage on unload
window.onbeforeunload = function () {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
};
