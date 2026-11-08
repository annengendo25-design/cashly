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
    alert("Profile information saved successfully!");
});
fullNameInput.value=localStorage.getItem("cashlyUserName") ||"";
emailInput.value=localStorage.getItem("cashlyUserEmail") ||"";

currencySelect.addEventListener("change",function(){
    const selectedCurrency=currencySelect.value;
    localStorage.setItem("cashlyCurrency",selectedCurrency);
    alert("Currency preference saved!");
});
currencySelect.value=localStorage.getItem("cashlyCurrency") ||"KES";
