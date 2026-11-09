const loginView=document.getElementById("login-view");
const registerView=document.getElementById("register-view");
const showRegister=document.getElementById("show-register");
const showLogin=document.getElementById("show-login");
showRegister.addEventListener("click",function(event){
    event.preventDefault();
    loginView.hidden=true;
    registerView.hidden=false;
});
showLogin.addEventListener("click",function(event){
    event.preventDefault();
    registerView.hidden=true;
    loginView.hidden=false;
});