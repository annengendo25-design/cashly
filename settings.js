const settingsForm=document.getElementById("settings-form");
const fullNameInput=document.getElementById("full-name");
const emailInput=document.getElementById("email-address");
const currencySelect=document.getElementById("currency-select");
const spendingReminder=document.getElementById("spending-reminder");

const currentUser=window.cashlyGetCurrentUser();
settingsForm.addEventListener("submit",function(event){
    event.preventDefault();
    const userName=fullNameInput.value.trim();
    const userEmail=emailInput.value.trim().toLowerCase();
    if(!userName||!userEmail){
        window.cashlyToast("Please fill in all profile details.","error");
        return;
    }
    const users=JSON.parse(localStorage.getItem("cashlyUsers"))||[];
    const emailExists=users.some(function(user){
        return user.email===userEmail&&String(user.id)!==String(currentUser.id);
    });
    if(emailExists){
        window.cashlyToast("This email is aleady being used by another account.","error");
        return;
    }
    window.cashlyUpdateCurrentUser({
        name:userName,
        email:userEmail
    });
    const profileInitial=document.getElementById("profile-initial");
    if(profileInitial){
        profileInitial.textContent=userName.charAt(0).toUpperCase();
    }
    window.cashlyToast("Profile information saved successfully!","success");
});
fullNameInput.value=currentUser?currentUser.name:"";
emailInput.value=currentUser?currentUser.email:"";

currencySelect.value=currentUser?currentUser.currency||"KES":"KES";
currencySelect.addEventListener("change",function(){
    const selectedCurrency=currencySelect.value;
    window.cashlyUpdateCurrentUser({
        currency:selectedCurrency
    });
    window.cashlyToast("Currency preference saved!","success");
});

const savedReminder=currentUser
?currentUser.spendingReminder||"disabled":"disabled";
spendingReminder.checked=savedReminder==="enabled";
spendingReminder.addEventListener("change",function(){
    const reminderStatus=spendingReminder.checked
    ?"enabled":"disabled";
    window.cashlyUpdateCurrentUser({
        spendingReminder:reminderStatus
    });
    window.cashlyToast(
        spendingReminder.checked
        ?"Spending reminders enabled!":"Spending reminders disabled!","success"
    );
});
const clearDataBtn=document.getElementById("clear-data-btn");
clearDataBtn.addEventListener("click",function(){
    showConfirmation("Clear All Data?","Are you sure you want to clear all your transactions and custom categories?This action cannot be undone.",
        function(){
        window.cashlySaveTransactions([]);
        window.cashlySaveCustomCategories([]);
        window.cashlyToast("All transactions and custom categories have been cleared!","success"     
        );
    }
);
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