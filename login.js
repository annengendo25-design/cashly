const loginView=document.getElementById("login-view");
const registerView=document.getElementById("register-view");
const showRegister=document.getElementById("show-register");
const showLogin=document.getElementById("show-login");
showRegister.addEventListener("click",function(event){
    event.preventDefault();
    loginView.setAttribute("hidden","");
    registerView.removeAttribute("hidden","");
});
showLogin.addEventListener("click",function(event){
    event.preventDefault();
    registerView.setAttribute("hidden","");
    loginView.removeAttribute("hidden",);
});
const registerForm=document.getElementById("register-form");
registerForm.addEventListener("submit",function(event){
    event.preventDefault();
    const userName=document.getElementById("register-name").value.trim();
    const userEmail=document.getElementById("register-email").value.trim().toLowerCase();
    const userPassword=document.getElementById("register-password").value;
    let users=JSON.parse(localStorage.getItem("cashlyUsers"))||[];
    const emailExists=users.some(function(user){
        return user.email===userEmail;
    });
    if(emailExists){
        alert("An account with this email already exists.");
        return;
    }
    const newUser={
        id:Date.now(),
        name:userName,
        email:userEmail,
        password:userPassword,
        transactions:[],
        customCategories:[],
        currency:"KES",
        spendingReminder:"disabled"
    };
    users.push(newUser);
    localStorage.setItem("cashlyUsers",JSON.stringify(users));
    alert("Account created successfully!");
    registerForm.reset();
    registerView.setAttribute("hidden","");
    loginView.removeAttribute("hidden");
});

const loginForm=document.getElementById("login-form");
loginForm.addEventListener("submit",function(event){
    event.preventDefault();
    const userEmail=document.getElementById("login-email").value.trim().toLowerCase();
    const userPassword=document.getElementById("login-password").value;
    const users=JSON.parse(localStorage.getItem("cashlyUsers"))||[];
    const currentUser=users.find(function(user){
        return user.email===userEmail&&user.password===userPassword;
    });
    if(!currentUser){
        alert("Incorrect email or password.Please try again.");
        return;
    }
    localStorage.setItem("cashlyCurrentUserId",currentUser.id);
    alert("Login successful!Welcome back,"+currentUser.name+"!");
    window.location.href="dashboard.html";
});