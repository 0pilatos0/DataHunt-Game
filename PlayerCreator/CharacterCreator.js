let CharacterData = [];
let images = document.getElementById("class").children;
let classes = ['wizard', 'knight', null, null, null, null];
import JsonLoader from "../Core/Loaders/JsonLoader.js";
import Vector2 from "../Core/Vector2.js"

for (let i = 0; i < images.length; i++) {
    images[i].onclick = () => {
        confirmClass(i);
    };
}

document.getElementById("inputName").addEventListener('keypress', (e) => {
    if (e.code === "Enter") {
        CharacterData.push({"name": document.getElementById("inputName").value})

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
    document.getElementById("classConfirmationAccept").onclick = ()=>{acceptCharacter(classes[id])};


    document.getElementById("classConfirmationName").innerHTML = 'Name: ' + CharacterData[0].name;
}

function declineCharacter() {
    document.getElementById("classConfirmation").style.display = "None";
    document.getElementsByClassName("input")[0].style.display = "Block";
}

function acceptCharacter(ClassName) {
    if(ClassName !== null) {
        JsonLoader.Load("./class_" + ClassName + ".json").then(e => {
            CharacterData.push({"class": e});
            console.log(CharacterData + "\r\n");
            spritePicker();
        });
    }
}

function spritePicker() {
    document.getElementById("classConfirmation").style.display = "none";
    document.getElementById("characterPicker").style.display = "Block";

}

window.spriteSize = new Vector2(16, 16);

async function translateTilesetToTiles(path){
    return new Promise(async (resolve, reject) => {
        let sprites = []
        let img = document.createElement("img")
        img.src = path
        img.onload = () => {
            let spritesAmount = new Vector2(img.width / window.spriteSize.X, img.height / window.spriteSize.Y)
            for (let y = 0; y < spritesAmount.Y; y++) {
                sprites.push(new Array())
                for (let x = 0; x < spritesAmount.X; x++) {
                    let canvas = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    canvas.width = window.spriteSize.X
                    canvas.height = window.spriteSize.Y
                    ctx.drawImage(img, x * window.spriteSize.X, y * window.spriteSize.Y, window.spriteSize.X, window.spriteSize.Y, 0, 0, window.spriteSize.X, window.spriteSize.Y)
                    sprites[y].push(canvas.toDataURL('base64'))
                }
            }
            return resolve(sprites)
        }
    })
}

createPlayerPicker()

async function createPlayerPicker(){
    const startPath = "../assets/sprites/"

    let options = [
        {
            displayName: 'character',
            path: 'characters.png'
        },
        {
            displayName: 'top',
            path: 'tops.png'
        },
        {
            displayName: 'bottom',
            path: 'bottoms.png'
        },
        {
            displayName: 'shoes',
            path: 'shoes.png'
        },
        {
            displayName: 'eyes',
            path: 'eyes.png'
        },
        {
            displayName: 'hands',
            path: 'hands.png'
        },
        {
            displayName: 'mouth',
            path: 'mouths.png'
        },
        {
            displayName: 'hat',
            path: 'hats.png'
        }
    ]

    let characterPicker = document.getElementById('characterPicker')
    let characterDisplay = document.getElementById('characterDisplay')

    options.map(async option => {
        let sprites = await translateTilesetToTiles(`${startPath}${option.path}`)
        let spriteIndex = 0
        options[options.indexOf(option)].sprites = sprites
        
        let characterPartHolder = document.createElement('img')
        characterPartHolder.classList.add("characterPart")
        characterPartHolder.src = sprites[spriteIndex][0]
        characterPicker.appendChild(characterPartHolder)

        let holder = document.createElement('div')

        let leftArrow = document.createElement('button')
        leftArrow.classList.add("characterPickButton")
        leftArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-left"></i>`)
        leftArrow.onclick = () => {
            spriteIndex--
            if(spriteIndex < 0) spriteIndex = sprites.length - 1
            characterPartHolder.src = sprites[spriteIndex][0]
        }

        let type = document.createElement('p')
        type.innerText = option.displayName

        let rightArrow = document.createElement('button')
        rightArrow.classList.add("characterPickButton")
        rightArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-right"></i>`)
        rightArrow.onclick = () => {
            spriteIndex++
            if(spriteIndex >= sprites.length) spriteIndex = 0
            characterPartHolder.src = sprites[spriteIndex][0]
        }

        holder.appendChild(leftArrow)
        holder.appendChild(type)
        holder.appendChild(rightArrow)

        characterPicker.appendChild(holder)
        characterDisplay.appendChild(characterPartHolder)

        if(options.indexOf(option) == options.length - 1){
            let confirmButton = document.createElement('button')
            confirmButton.innerText = "Submit character"
            confirmButton.classList.add("characterConfirmButton")
            characterPicker.appendChild(confirmButton)
            let randomButton = document.createElement('button')
            randomButton.innerText = "Randomize character"
            randomButton.classList.add("characterConfirmButton")
            characterPicker.appendChild(randomButton)
            randomButton.onclick = () => {
                options.map(option => {
                    let index = options.indexOf(option)
                    let part = characterDisplay.getElementsByTagName("img")[index]
                    part.src = option.sprites[Math.floor(Math.random() * option.sprites.length)][0]
                })
            }
        }
    })
}