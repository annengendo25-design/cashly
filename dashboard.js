const transactions=JSON.parse(
    localStorage.getItem("CashlyTransactions")
)||[];
const dashboardIncome=document.getElementById("dashboard-income");
const dashboardExpenses=document.getElementById("dashboard-expenses");
const dashboardBalance=document.getElementById("dashboard-balance");
const totalIncome=transactions
.filter(function(transaction){
    return transaction.type==="income";
})
.reduce(function(total,transaction){
    return total+transaction.amount;
},0);
const totalExpenses=transactions
.filter(function(transaction){
    return transaction.type==="expense";
})
.reduce(function(total,transaction){
    return total+transaction.amount;
},0);
const availableBalance=totalIncome-totalExpenses;
function formatCurrency(amount){
    return `KES ${amount.toLocaleString("en-KE")}`;
}
dashboardIncome.textContent=formatCurrency(totalIncome);
dashboardExpenses.textContent=formatCurrency(totalExpenses);
dashboardBalance.textContent=formatCurrency(availableBalance);

// recenttransaction