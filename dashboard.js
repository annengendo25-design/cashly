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

const recentTransactionTable=document.getElementById("dashboard-recent-transactions");
function displayRecentTransactions(){
    const recentTransactions =[...transactions]
    .sort(function(a,b){
        return new Date(b.date)-new Date(a.date);
    })
    .slice(0,5);
    recentTransactionTable.innerHTML="";
    recentTransactions.forEach(function(transaction){
        const row=document.createElement("tr");
        const typeClass=transaction.type==="income"
        ? "income"
        :"expense";
        const icon=transaction.type==="income"? "fa-arrow-up-long":"fa-arrow-down-long";
        const sign=transaction.type==="income"? "+": "-";
        const formattedDate=new Date(transaction.date+"T00:00:00").toLocaleDateString("en-US",{
            month:"short",
            day:"2-digit",
            year:"numeric"
        });
        const typeCell=document.createElement("td");
        const iconSpan=document.createElement("span");
        iconSpan.className=transaction-icon $;{typeClass};
        const iconElement=document.createElement("i");
        iconElement.className=fa-solid $;{icon};
        iconSpan.appendChild(iconElement);
        typeCell.appendChild(iconSpan);
        const categoryCell=document.createElement("td");
        categoryCell.textContent=transaction.category.charAt(0).toUppercase()+transaction.category.slice(1);
        const descriptionCell=document.createElement("td");
        descriptionCell.textContent=transaction.description;
        const dateCell=document.createElement("td");
        dateCell.textContent=formattedDate;
        const amountCell=document.createElement("td");
        amountCell.className= $;{typeClass}-text;
        amountCell.textContent=$;{sign}KES $;{transaction.amount.toLocaleString("en-KE")};
        const actionsCell=document.createElement("td");
        actionsCell.textContent="--";
        row.append(
            typeCell,
            categoryCell,
            descriptionCell,
            dateCell,
            amountCell,
            actionsCell
        );
        recentTransactionTable.appendChild(row);
    });
}
displayRecentTransactions();