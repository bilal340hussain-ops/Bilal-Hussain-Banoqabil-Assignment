const categoryBudgetsElement = document.getElementById("categoryBudgets");
const budgetMessage = document.getElementById("budgetMessage");
const editBudgetButton = document.getElementById("editBudget");
const budgetColors = [
  { text: "text-blue-600", bar: "bg-blue-500" },
  { text: "text-green-600", bar: "bg-green-500" },
  { text: "text-orange-600", bar: "bg-orange-500" },
  { text: "text-violet-600", bar: "bg-violet-500" },
  { text: "text-rose-600", bar: "bg-rose-500" },
  { text: "text-cyan-600", bar: "bg-cyan-500" },
];

function getCategorySpending(category) {
  return getThisMonthExpenses()
    .filter(function (expense) {
      return expense.category === category;
    })
    .reduce(function (total, expense) {
      return total + Number(expense.amount);
    }, 0);
}

function renderBudgetPage() {
  const monthExpenses = getThisMonthExpenses();
  const spent = monthExpenses.reduce(function (total, expense) {
    return total + Number(expense.amount);
  }, 0);
  const remaining = Math.max(monthlyBudget - spent, 0);

  document.getElementById("totalBudget").textContent = formatRupees(monthlyBudget);
  document.getElementById("budgetSpent").textContent = formatRupees(spent);
  document.getElementById("budgetRemaining").textContent = formatRupees(remaining);
  updateSidebarBudget();

  const categories = Object.keys(categoryBudgets);
  expenses.forEach(function (expense) {
    if (!categories.includes(expense.category)) categories.push(expense.category);
  });
  categoryBudgetsElement.replaceChildren();

  categories.forEach(function (category, index) {
    const limit = Number(categoryBudgets[category]) || 0;
    const categorySpent = getCategorySpending(category);
    const percentage = limit > 0 ? Math.round((categorySpent / limit) * 100) : 0;
    const color = budgetColors[index % budgetColors.length];
    const item = document.createElement("div");
    const heading = document.createElement("div");
    heading.className = "flex justify-between mb-2";
    const details = document.createElement("div");
    const name = document.createElement("p");
    name.className = "font-semibold";
    name.textContent = category;
    const amounts = document.createElement("p");
    amounts.className = "text-xs text-slate-500 mt-1";
    amounts.textContent =
      formatRupees(categorySpent) + " spent of " +
      (limit > 0 ? formatRupees(limit) : "no limit");
    details.append(name, amounts);
    const percentageText = document.createElement("b");
    percentageText.className = "text-sm " + color.text;
    percentageText.textContent = limit > 0 ? percentage + "%" : "No limit";
    heading.append(details, percentageText);

    const track = document.createElement("div");
    track.className = "h-2.5 bg-slate-100 rounded-full";
    const bar = document.createElement("div");
    bar.className = "h-2.5 rounded-full " + color.bar;
    bar.style.width = Math.min(percentage, 100) + "%";
    track.appendChild(bar);
    item.append(heading, track);
    categoryBudgetsElement.appendChild(item);
  });
}

function startEditingBudgets() {
  const categories = Object.keys(categoryBudgets);
  expenses.forEach(function (expense) {
    if (!categories.includes(expense.category)) categories.push(expense.category);
  });
  categoryBudgetsElement.replaceChildren();

  const form = document.createElement("form");
  form.className = "space-y-4";
  const monthlyLabel = document.createElement("label");
  monthlyLabel.className = "block text-sm font-medium";
  monthlyLabel.textContent = "Monthly budget (Rs.)";
  const monthlyInput = document.createElement("input");
  monthlyInput.type = "number";
  monthlyInput.min = "1";
  monthlyInput.required = true;
  monthlyInput.value = monthlyBudget;
  monthlyInput.className = "block w-full border rounded-lg p-3 mt-2";
  monthlyLabel.appendChild(monthlyInput);
  form.appendChild(monthlyLabel);

  categories.forEach(function (category) {
    const label = document.createElement("label");
    label.className = "block text-sm font-medium";
    label.textContent = category + " limit (Rs.)";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.required = true;
    input.value = Number(categoryBudgets[category]) || 0;
    input.dataset.category = category;
    input.className = "block w-full border rounded-lg p-3 mt-2";
    label.appendChild(input);
    form.appendChild(label);
  });

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "bg-blue-600 text-white px-4 py-2 rounded-lg";
  saveButton.textContent = "Save budgets";
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "border px-4 py-2 rounded-lg ml-2";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", renderBudgetPage);
  form.append(saveButton, cancelButton);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const newMonthlyBudget = Number(monthlyInput.value);
    if (!Number.isFinite(newMonthlyBudget) || newMonthlyBudget <= 0) {
      budgetMessage.textContent = "Monthly budget must be greater than zero.";
      return;
    }

    const newCategoryBudgets = {};
    form.querySelectorAll("input[data-category]").forEach(function (input) {
      const limit = Number(input.value);
      if (!Number.isFinite(limit) || limit < 0) {
        budgetMessage.textContent = "Category budgets cannot be negative.";
        return;
      }
      newCategoryBudgets[input.dataset.category] = limit;
    });
    if (Object.keys(newCategoryBudgets).length !== categories.length) return;

    monthlyBudget = newMonthlyBudget;
    categoryBudgets = newCategoryBudgets;
    saveBudgets();
    budgetMessage.textContent = "Budgets saved.";
    renderBudgetPage();
  });

  categoryBudgetsElement.appendChild(form);
}

editBudgetButton.addEventListener("click", startEditingBudgets);
renderBudgetPage();
