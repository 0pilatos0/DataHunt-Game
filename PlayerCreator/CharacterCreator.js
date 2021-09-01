let CharacterData = new Object();
let images = document.getElementById("class").children;

for (let i = 0; i < images.length; i++) {
    images[i].onclick = () => {
        confirmClass(i);
    };
}

document.getElementById("inputName").addEventListener('keypress', (e) => {
    if (e.code === "Enter") {
        CharacterData.name = document.getElementById("inputName").value;

        document.getElementById("background").removeChild(document.getElementById("background").firstChild);
        document.getElementById("background").removeChild(document.getElementById("background").firstChild);

        pickClass();
    }
});

function pickClass() {
    document.getElementById("class").style.display = "Block";

}

function confirmClass(id) {
    document.getElementById("class").style.display = "None";
    document.getElementById("classConfirmation").style.display = "Block";

    checkIfImageExists('./class' + id + '.png', (exists) => {
        if (exists) {
            document.getElementById("classConfirmationImg").src = "./class" + id + ".png";
        } else {
            document.getElementById("classConfirmationImg").src = "./unreleased_class.png";
        }
    });

    document.getElementById("classConfirmationName").innerHTML = 'Name: ' + CharacterData.name;
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
        img.onerror = () => {
            callback(false);
        };
    }
}