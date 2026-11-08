const themeToggle=document.getElementById("theme-toggle");
const themeIcon=themeToggle.querySelector("i");
const profileInitial=document.getElementById("profile-initial");
const darkModeToggle=document.getElementById("dark-mode-toggle");
function applyTheme(isDark){
    document.body.classList.toggle("dark-mode",isDark);
    localStorage.setItem(
        "cashlyDarkMode",
        isDark ? "enabled":"disabled"
    );
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);
    if (darkModeToggle){
        darkModeToggle.checked=isDark;
    }
}
const savedDarkMode=localStorage.getItem("cashlyDarkMode");
applyTheme(savedDarkMode==="enabled");
themeToggle.addEventListener("click", function(){
    const isDark=document.body.classList.contains("dark-mode");
    applyTheme(!isDark);
});
if(darkModeToggle){
    darkModeToggle.addEventListener("change",function(){
        applyTheme(darkModeToggle.checked);
    });
}
function updateProfileInitial(){
    const savedName=localStorage.getItem("cashlyUserName");
    if(savedName&&savedName.trim()!==""){
        profileInitial.textContent=savedName.trim().charAt(0).toUpperCase();
    } 
    else{
        profileInitial.textContent="N";
    }
}
updateProfileInitial();