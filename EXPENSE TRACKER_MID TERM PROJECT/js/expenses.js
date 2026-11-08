const expenseForm = document.getElementById("expenseForm");
const transactionList = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");
const formMessage = document.getElementById("formMessage");
const dateInput = document.getElementById("date");

function renderExpenses(searchText) {
  const query = searchText.trim().toLowerCase();
  const matchingExpenses = expenses
    .filter(function (expense) {
      return (
        expense.title.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.status.toLowerCase().includes(query) ||
        expense.date.includes(query) ||
        String(expense.amount).includes(query)
      );
    })
    .sort(function (first, second) {
      return second.date.localeCompare(first.date);
    });

  transactionList.replaceChildren();

  if (matchingExpenses.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.className = "p-3 text-slate-500";
    cell.textContent = query ? "No matching expenses found." : "No expenses yet.";
    row.appendChild(cell);
    transactionList.appendChild(row);
    return;
  }

  matchingExpenses.forEach(function (expense) {
    const row = document.createElement("tr");
    row.className = "border-b";

    [expense.title, expense.category, expense.date, formatRupees(expense.amount), expense.status]
      .forEach(function (value, index) {
        const cell = document.createElement("td");
        cell.className = "p-3";
        cell.textContent = value;
        if (index === 4) {
          cell.classList.add(expense.status === "Paid" ? "text-green-600" : "text-orange-500");
        }
        row.appendChild(cell);
      });

    const actionCell = document.createElement("td");
    actionCell.className = "p-3";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.expenseId = expense.id;
    deleteButton.className = "text-red-600 hover:underline";
    deleteButton.textContent = "Delete";
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    transactionList.appendChild(row);
  });
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const date = dateInput.value;

  if (!title || !Number.isFinite(amount) || amount <= 0 || !date) {
    formMessage.textContent = "Enter a title, a positive amount, and a date.";
    formMessage.className = "text-sm text-red-600 ml-3";
    return;
  }

  const nextId = expenses.reduce(function (largestId, expense) {
    return Math.max(largestId, Number(expense.id) || 0);
  }, 0) + 1;

  expenses.push({
    id: nextId,
    title: title,
    category: document.getElementById("category").value,
    amount: amount,
    date: date,
    status: document.getElementById("status").value,
  });

  saveExpenses();
  expenseForm.reset();
  setTodayAsDefaultDate();
  formMessage.textContent = "Transaction saved.";
  formMessage.className = "text-sm text-green-600 ml-3";
  renderExpenses(searchInput.value);
  updateSidebarBudget();
});

transactionList.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-expense-id]");
  if (!button) return;

  const expenseId = Number(button.dataset.expenseId);
  expenses = expenses.filter(function (expense) {
    return Number(expense.id) !== expenseId;
  });
  saveExpenses();
  renderExpenses(searchInput.value);
  updateSidebarBudget();
});

searchInput.addEventListener("input", function () {
  renderExpenses(searchInput.value);
});

function setTodayAsDefaultDate() {
  const today = new Date();
  dateInput.value =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
}

setTodayAsDefaultDate();
renderExpenses("");
updateSidebarBudget();
