const addTransactionBtn=document.getElementById("add-transaction-btn");
const transactionModal=document.getElementById("transaction-modal");
const cancelTransactionBtn=document.getElementById("cancel-transaction");
const transactionForm=document.getElementById("transaction-form");
const transactionList=document.querySelector(".transaction-list");
const transactionCount=document.querySelector(".transaction-count");
const transactionType=document.getElementById("transaction-type");
const transactionCategory=document.getElementById("transaction-category");
const transactionDescription=document.getElementById("transaction-description");
const transactionDate=document.getElementById("transaction-date");
const transactionAmount=document.getElementById("transaction-amount");
let editingTransactionId=null;
const summaryCards=document.querySelectorAll(".transaction-summary-card h2");
addTransactionBtn.addEventListener("click",function(){
    editingTransactionId=null;
    document.getElementById("modal-title").textContent="Add Transaction";
    document.getElementById("save-transaction").textContent="Save Transaction"
    transactionForm.reset();
    transactionModal.hidden=false;
});
cancelTransactionBtn.addEventListener("click",function(){
    transactionModal.hidden=true;
});

const sampleTransactions=[
    {
        id: 1,
        type:"income",
        category:"salary",
        description:"Monthly Salary",
        date:"2026-11-01",
        amount:95000
    },
    {
        id: 2,
        type:"expense",
        category:"food",
        description:"Lunch at cafe",
        date:"2026-11-02",
        amount:800

    },
    {
        id: 3,
        type:"expense",
        category:"transport",
        description:"Matatu fare",
        date:"2026-11-03",
        amount:300
    },
];

let transactions=JSON.parse(localStorage.getItem("cashlyTransactions")) || sampleTransactions;
function saveTransactions(){
    localStorage.setItem("cashlyTransactions", JSON.stringify(transactions));
}
function updateSummaryCards(){
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
    const totalTransactions=transactions.length;
    const formattedIncome=totalIncome.toLocaleString("en-KE");
    const formattedExpenses=totalExpenses.toLocaleString("en-KE");
    summaryCards[0].textContent=totalTransactions;
    summaryCards[1].textContent=`KES ${formattedIncome}`;
    summaryCards[2].textContent=`KES ${formattedExpenses}`;
}
function formatDate(date){
    return new Date(date+"T00:00:00").toLocaleDateString("en-US",{
        month:"short",
        day:"2-digit",
        year:"numeric"
    });
}
       
function displayTransactions(){
    transactionList.innerHTML="";
    transactions.forEach(function(transaction){
        const row=document.createElement("tr");
        row.dataset.id=transaction.id;
        const typeClass=transaction.type==="income" ? "income":"expense";
        const icon=transaction.type==="income" ? 
        "fa-solid fa-arrow-up-long":
        "fa-solid fa-arrow-down-long";
        const formattedAmount=transaction.amount.toLocaleString("en-KE");
        const sign=transaction.type==="income" ? "+": "-";
        row.innerHTML= `
        <td>
           <span class="transaction-icon ${typeClass}">
             <i class ="${icon}"></i>
            </span>
        </td>

        <td>${transaction.category.charAt(0).toUpperCase()+ transaction.category.slice(1)}</td>
        <td>${transaction.description}</td>

        <td>${formatDate(transaction.date)}</td>

        <td class="${typeClass}-text">
          ${sign}KES ${formattedAmount}
        </td>

        <td>
          <button class="action-button edit-button" aria-label="Edit Transaction">
           <i class="fa-solid fa-pen-nib"></i>
           </button>
          <button class="action-button delete-button" aria-label="Delete Transaction">
           <i class="fa-solid fa-trash"></i>
           </button>
        </td>
        `;
       transactionList.appendChild(row); 
    });

    transactionCount.textContent=`Showing ${transactions.length} transactions`;
    updateSummaryCards();
}
transactionForm.addEventListener("submit",function(event){
    event.preventDefault();
    const transactionData={
        type:transactionType.value,
        category:transactionCategory.value,
        description:transactionDescription.value.trim(),
        date:transactionDate.value,
        amount:Number(transactionAmount.value)
    };
    if(editingTransactionId !==null){
        transactions=transactions.map(function(transaction){
            if(transaction.id===editingTransactionId){
                return{
                    ...transaction,
                    ...transactionData
                };
            }
            return transaction;
        });
    } else{
        const newTransaction={
            id:Date.now(),
            ...transactionData
        };
        transactions.push(newTransaction);
    }
    saveTransactions();
    displayTransactions();
    transactionForm.reset();
    transactionModal.hidden=true;
    editingTransactionId=null;
});
displayTransactions();

transactionList.addEventListener("click",function(event){
    const deleteButton=event.target.closest(".delete-button");
    if(!deleteButton){
        return;
    }
    const row=deleteButton.closest("tr");
    const transactionId=Number(row.dataset.id);
    const confirmDelete=confirm("Are you sure you want to delete this transaction?");
    if(confirmDelete){
        transactions=transactions.filter(function(transaction){
            return transaction.id !== transactionId;
        });
        saveTransactions();
        displayTransactions();
    }
});
transactionList.addEventListener("click",function(event){
    const editButton=event.target.closest(".edit-button");
    if(!editButton){
        return;
    }
    const row=editButton.closest("tr");
    editingTransactionId=Number(row.dataset.id);
    const transaction=transactions.find(function(item){
        return item.id===editingTransactionId;
    });
    if(!transaction){
        return;
    }

    transactionType.value=transaction.type;
    transactionCategory.value=transaction.category;
    transactionDescription.value=transaction.description;
    transactionDate.value=transaction.date;
    transactionAmount.value=transaction.amount;

    document.getElementById("modal-title").textContent="Edit Transaction";
    document.getElementById("save-transaction").textContent="Update Transaction";
    transactionModal.hidden=false;
});