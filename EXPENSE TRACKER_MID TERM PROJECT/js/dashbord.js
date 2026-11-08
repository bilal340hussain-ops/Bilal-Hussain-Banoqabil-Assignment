function showDashboard() {
  const monthExpenses = getThisMonthExpenses();
  const total = monthExpenses.reduce(function (sum, expense) {
    return sum + Number(expense.amount);
  }, 0);
  const paid = monthExpenses
    .filter(function (expense) {
      return expense.status === "Paid";
    })
    .reduce(function (sum, expense) {
      return sum + Number(expense.amount);
    }, 0);
  const pending = monthExpenses
    .filter(function (expense) {
      return expense.status === "Pending";
    })
    .reduce(function (sum, expense) {
      return sum + Number(expense.amount);
    }, 0);
  const percentage = monthlyBudget > 0 ? Math.round((total / monthlyBudget) * 100) : 0;

  document.getElementById("totalExpenses").textContent = formatRupees(total);
  document.getElementById("paidAmount").textContent = formatRupees(paid);
  document.getElementById("pendingAmount").textContent = formatRupees(pending);
  document.getElementById("totalTransactions").textContent = expenses.length;
  document.getElementById("budgetPercentage").textContent = percentage + "%";
  document.getElementById("budgetProgress").style.width = Math.min(percentage, 100) + "%";
  document.getElementById("budgetSpent").textContent = formatRupees(total);
  document.getElementById("budgetRemaining").textContent = formatRupees(
    Math.max(monthlyBudget - total, 0),
  );
  updateSidebarBudget();

  const recentTransactions = document.getElementById("recentTransactions");
  const recentExpenses = expenses.slice().sort(function (first, second) {
    return second.date.localeCompare(first.date);
  }).slice(0, 5);

  recentTransactions.replaceChildren();

  if (recentExpenses.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "p-3 text-slate-500";
    cell.textContent = "No transactions yet. Add your first expense.";
    row.appendChild(cell);
    recentTransactions.appendChild(row);
    return;
  }

  recentExpenses.forEach(function (expense) {
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

    recentTransactions.appendChild(row);
  });
}

showDashboard();
