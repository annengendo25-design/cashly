const settingsForm=document.getElementById("settings-form");
const fullNameInput=document.getElementById("full-name");
const emailInput=document.getElementById("email-address");
const currencySelect=document.getElementById("currency-select");
const darkModeToggle=document.getElementById("dark-mode-toggle");
const spendingReminder=document.getElementById("spending-reminder");

settingsForm.addEventListener("submit",function(event){
    event.preventDefault();
    const userName=fullNameInput.value.trim();
    const userEmail=emailInput.value.trim();
    localStorage.setItem("cashlyUserName",userName);
    localStorage.setItem("cashlyUserEmail",userEmail);
    alert("Profile information saved successfully!");
});
fullNameInput.value=localStorage.getItem("cashlyUserName") ||"";
emailInput.value=localStorage.getItem("cashlyUserEmail") ||"";