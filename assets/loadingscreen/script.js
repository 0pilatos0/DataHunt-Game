var loadScreen = document.getElementById("loading");

loadScreen.style.display = "flex";

//on window load fadeout the loading screen
window.onload = function() {
    //get loading screen
    
    loadScreen.classList.add("loaderdisabled");
    //wait 1.5 seconds
    setTimeout(function() {
        loadScreen.style.display = "none";
    }  , 1500);



}