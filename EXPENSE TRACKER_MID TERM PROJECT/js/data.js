// Clear the old sample data once, then keep new expenses between visits.
if (localStorage.getItem("expenseTrackerFreshStart") !== "done") {
  localStorage.removeItem("expenseTrackerExpenses");
  localStorage.removeItem("expenseTrackerBudget");
  localStorage.removeItem("expenseTrackerCategoryBudgets");
  localStorage.setItem("expenseTrackerFreshStart", "done");
}

const savedExpenses = localStorage.getItem("expenseTrackerExpenses");
let expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
let monthlyBudget = Number(localStorage.getItem("expenseTrackerBudget")) || 60000;
let categoryBudgets = JSON.parse(
  localStorage.getItem("expenseTrackerCategoryBudgets") || "null",
) || {
  Food: 20000,
  Transport: 10000,
  Bills: 15000,
  Shopping: 10000,
  Health: 5000,
};

function saveExpenses() {
  localStorage.setItem("expenseTrackerExpenses", JSON.stringify(expenses));
}

function saveBudgets() {
  localStorage.setItem("expenseTrackerBudget", monthlyBudget);
  localStorage.setItem(
    "expenseTrackerCategoryBudgets",
    JSON.stringify(categoryBudgets),
  );
}

function formatRupees(amount) {
  return "Rs. " + Number(amount || 0).toLocaleString("en-PK");
}

function getCurrentMonth() {
  const today = new Date();
  return today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
}

function getThisMonthExpenses() {
  return expenses.filter(function (expense) {
    return expense.date.slice(0, 7) === getCurrentMonth();
  });
}

function updateSidebarBudget() {
  const spent = getThisMonthExpenses().reduce(function (total, expense) {
    return total + Number(expense.amount);
  }, 0);
  const percentage = monthlyBudget > 0 ? Math.round((spent / monthlyBudget) * 100) : 0;
  const amountElement = document.getElementById("sidebarBudget");
  const progressElement = document.getElementById("sidebarBudgetProgress");
  const percentageElement = document.getElementById("sidebarBudgetPercentage");

  if (amountElement) amountElement.textContent = formatRupees(monthlyBudget);
  if (progressElement) progressElement.style.width = Math.min(percentage, 100) + "%";
  if (percentageElement) {
    percentageElement.textContent = percentage + "% of your budget used";
  }
}
