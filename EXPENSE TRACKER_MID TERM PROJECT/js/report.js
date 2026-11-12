const reportMonth = getCurrentMonth();
const monthExpenses = getThisMonthExpenses();
const reportTotal = monthExpenses.reduce(function (total, expense) {
  return total + Number(expense.amount);
}, 0);

document.getElementById("reportTotal").textContent = formatRupees(reportTotal);
document.getElementById("reportMonth").textContent = new Date(
  reportMonth + "-01T00:00:00",
).toLocaleDateString("en-PK", { month: "long", year: "numeric" });
document.getElementById("dailyAverage").textContent = formatRupees(
  reportTotal / new Date().getDate(),
);

const categoryTotals = {};
monthExpenses.forEach(function (expense) {
  categoryTotals[expense.category] =
    (categoryTotals[expense.category] || 0) + Number(expense.amount);
});

const categoryEntries = Object.entries(categoryTotals).sort(function (first, second) {
  return second[1] - first[1];
});
const largestCategory = categoryEntries[0];
document.getElementById("largestCategory").textContent = largestCategory
  ? largestCategory[0]
  : "—";
document.getElementById("largestCategoryAmount").textContent = formatRupees(
  largestCategory ? largestCategory[1] : 0,
);

const pendingTotal = monthExpenses
  .filter(function (expense) {
    return expense.status === "Pending";
  })
  .reduce(function (total, expense) {
    return total + Number(expense.amount);
  }, 0);
document.getElementById("pendingTotal").textContent = formatRupees(pendingTotal);
updateSidebarBudget();

const categoryReport = document.getElementById("categoryReport");
const reportColors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
];
const largestAmount = largestCategory ? largestCategory[1] : 0;

if (categoryEntries.length === 0) {
  const emptyMessage = document.createElement("p");
  emptyMessage.className = "text-sm text-slate-500";
  emptyMessage.textContent = "No expenses recorded this month.";
  categoryReport.appendChild(emptyMessage);
} else {
  categoryEntries.forEach(function (entry, index) {
    const category = entry[0];
    const amount = entry[1];
    const item = document.createElement("div");
    const labels = document.createElement("div");
    labels.className = "flex justify-between text-sm mb-2";
    const name = document.createElement("span");
    name.textContent = category;
    const total = document.createElement("b");
    total.textContent = formatRupees(amount);
    labels.append(name, total);
    const track = document.createElement("div");
    track.className = "h-2 bg-slate-100 rounded-full";
    const bar = document.createElement("div");
    bar.className =
      "h-2 rounded-full " + reportColors[index % reportColors.length];
    bar.style.width = (amount / largestAmount) * 100 + "%";
    track.appendChild(bar);
    item.append(labels, track);
    categoryReport.appendChild(item);
  });
}
