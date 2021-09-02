let CharacterData = new Object();
let images = document.getElementById("class").children;
import JsonLoader from "../Core/Loaders/JsonLoader.js";

for (let i = 0; i < images.length; i++) {
    images[i].onclick = () => {
        confirmClass(i);
    };
}

document.getElementById("inputName").addEventListener('keypress', (e) => {
    if (e.code === "Enter") {
        CharacterData.username = document.getElementById("inputName").value;

        document.getElementsByClassName("input")[0].style.display = "None";

        pickClass();
    }
});

function pickClass() {
    document.getElementById("class").style.display = "Block";

}

function confirmClass(id) {
    document.getElementById("class").style.display = "None";
    document.getElementById("classConfirmation").style.display = "Block";

    document.getElementById("classConfirmationDecline").onclick = ()=>{declineCharacter()};
    document.getElementById("classConfirmationAccept").onclick = ()=>{acceptCharacter()};

    checkIfImageExists('./class' + id + '.png', (exists) => {
        if (exists) {
            document.getElementById("classConfirmationImg").src = "./class" + id + ".png";
        } else {
            document.getElementById("classConfirmationImg").src = "./unreleased_class.png";
        }
    });

    document.getElementById("classConfirmationName").innerHTML = 'Name: ' + CharacterData.username;
}

function declineCharacter() {
    document.getElementById("classConfirmation").style.display = "None";
    document.getElementsByClassName("input")[0].style.display = "Block";
}

function acceptCharacter() {
    JsonLoader.Load("./ClassData.json").then(d => {
        CharacterData.class = d;
        console.log(d);
    });
}

function checkIfImageExists(url, callback) {
    const img = new Image();

    img.src = url;

    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        img.onerror = (e) => {
            callback(false);
        };
    }
}