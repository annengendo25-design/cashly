const settingsForm=document.getElementById("settings-form");
const fullNameInput=document.getElementById("full-name");
const emailInput=document.getElementById("email-address");
const currencySelect=document.getElementById("currency-select");
const spendingReminder=document.getElementById("spending-reminder");

settingsForm.addEventListener("submit",function(event){
    event.preventDefault();
    const userName=fullNameInput.value.trim();
    const userEmail=emailInput.value.trim();
    localStorage.setItem("cashlyUserName",userName);
    localStorage.setItem("cashlyUserEmail",userEmail);
    const profileInitial=document.getElementById("profile-initial");
    if(profileInitial){
        profileInitial.textContent=userName.charAt(0).toUpperCase() || "N";
    }
    window.cashlyToast("Profile information saved successfully!","success");
});
fullNameInput.value=localStorage.getItem("cashlyUserName") ||"";
emailInput.value=localStorage.getItem("cashlyUserEmail") ||"";

currencySelect.addEventListener("change",function(){
    const selectedCurrency=currencySelect.value;
    localStorage.setItem("cashlyCurrency",selectedCurrency);
    window.cashlyToast("Currency preference saved!","success");
});
currencySelect.value=localStorage.getItem("cashlyCurrency") ||"KES";

spendingReminder.addEventListener("change",function(){
    localStorage.setItem(
        "cashlySpendingReminder",spendingReminder.checked ? "enabled":"disabled"
    );
    window.cashlyToast(
        spendingReminder.checked ? "Spending reminders enabled!":"Spending reminders disabled","success"
    );
});
const savedReminder=localStorage.getItem("cashlySpendingReminder");
if(savedReminder !==null){
    spendingReminder.checked=savedReminder==="enabled";
}

const categoryForm=document.getElementById("category-form");
const categoryNameInput=document.getElementById("category-name");
const categoryTypeSelect=document.getElementById("category-type");
const categoryList=document.getElementById("category-list");
let customCategories=JSON.parse(
    localStorage.getItem("cashlyCustomCategories")
) ||[];
function displayCategories(){
    categoryList.innerHTML="";
    if(customCategories.length===0){
        categoryList.textContent="No custom categories added yet.";
        return;
    }
    customCategories.forEach(function(category,index){
        const categoryItem=document.createElement("div");
        categoryItem.classList.add("custom-category-item");
        const categoryInfo=document.createElement("span");
        categoryInfo.textContent=category.name+"("+category.type+")";
        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.type="button";
        deleteButton.addEventListener("click",function(){
            deleteCategory(index);
        });
        categoryItem.appendChild(categoryInfo);
        categoryItem.appendChild(deleteButton);
        categoryList.appendChild(categoryItem);
    });
}
function saveCategories(){
    localStorage.setItem(
        "cashlyCustomCategories",JSON.stringify(customCategories)
    );
}
categoryForm.addEventListener("submit",function(event){
    event.preventDefault();
    const categoryName=categoryNameInput.value.trim();
    const categoryType=categoryTypeSelect.value;
    if(categoryName===""){
        window.cashlyToast("Please enter a category name.","error");
        return;
    }
    const alreadyExists=customCategories.some(function(category){
        return category.name.toLowerCase()===categoryName.toLowerCase()&&category.type===categoryType;
    });
    if (alreadyExists){
        window.cashlyToast("This category already exists for that type.","error");
        return;
    }
    customCategories.push({
        name:categoryName,
        type:categoryType
    });
    saveCategories();
    displayCategories();
    categoryForm.reset();
    window.cashlyToast("Category added successfully!","success");
});
function deleteCategory(index){
    const category=customCategories[index];
    const transactions=JSON.parse(
        localStorage.getItem("cashlyTransactions")
    ) || [];
    const categoryIsUsed=transactions.some(function(transaction){
        return transaction.category.toLowerCase()===category.name.toLowerCase()&&transaction.type===category.type;
    });
    if (categoryIsUsed){
        window.cashlyToast("You cannot delete this category because it is being used by a transaction.","error");
        return;
    }
    showConfirmation(
        "Delete Category?",
        `Are you sure you want to delete ${category.name}?`,
        function(){
            customCategories.splice(index,1);
            saveCategories();
            displayCategories();
            window.cashlyToast("Category deleted successfully!","success");
        }
    );
}
displayCategories();

const clearDataBtn=document.getElementById("clear-data-btn");
clearDataBtn.addEventListener("click",function(){
    const confirmClear=confirm("Are you sure you want to clear all your transactions and custom categories?This action cannot be undone.");
    if(confirmClear){
        localStorage.setItem("cashlyTransactions",JSON.stringify([]));
        localStorage.setItem("cashlyCustomCategories",JSON.stringify([]));
        alert("All transactions and custom categories have being cleared!");
    }
});

const confirmationModal=document.getElementById("confirmation-modal");
const confirmationTitle=document.getElementById("confirmation-title");
const confirmationMessage=document.getElementById("confirmation-message");
const cancelConfirmation=document.getElementById("cancel-confirmation");
const confirmAction=document.getElementById("confirm-action");
let confirmationCallback=null;
function showConfirmation(title,message,callback){
    confirmationTitle.textContent=title;
    confirmationMessage.textContent=message;
    confirmationCallback=callback;
    confirmationModal.style.display="flex";
}
function closeConfirmation(){
    confirmationModal.style.display="none";
    confirmationCallback=null;
}
cancelConfirmation.addEventListener("click",closeConfirmation);
confirmAction.addEventListener("click",function(){
    if(confirmationCallback){
        confirmationCallback();
    }
    closeConfirmation();
});