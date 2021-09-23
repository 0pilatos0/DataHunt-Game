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

    async function loadAllSprites(){
        return new Promise(async (resolve, reject) => {
            let amountOfCompleted = 0
            options.map(async option => {
                let index = options.indexOf(option)
                options[index].sprites = await translateTilesetToTiles(`${startPath}${option.path}`)
                amountOfCompleted++
                if(amountOfCompleted == options.length){
                    return resolve(true)
                }
            })
        })
    }

    await loadAllSprites()

    let characterPicker = document.getElementById('characterPicker')
    let characterDisplay = document.getElementById('characterDisplay')

    let holder = document.createElement('div')
    let nameLabel = document.createElement('label')
    nameLabel.innerText = "Name: "
    nameLabel.for = "characterName"
    let nameInput = document.createElement('input')
    nameInput.name = "characterName"
    
    holder.append(nameLabel)
    holder.appendChild(nameInput)
    characterPicker.appendChild(holder)

    options.map(option => {
        let index = options.indexOf(option)
        options[index].spriteIndex = 0
        let sprites = options[index]["sprites"]
        
        let characterPartHolder = document.createElement('img')
        characterPartHolder.classList.add("characterPart")
        characterPartHolder.src = sprites[options[index].spriteIndex][0]
        characterPicker.appendChild(characterPartHolder)

        let holder = document.createElement('div')

        let leftArrow = document.createElement('button')
        leftArrow.classList.add("characterPickButton")
        leftArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-left"></i>`)
        leftArrow.onclick = () => {
            options[index].spriteIndex--
            if(options[index].spriteIndex < 0) options[index].spriteIndex = sprites.length - 1
            characterPartHolder.src = sprites[options[index].spriteIndex][0]
            options[index].type.innerText = `${options[index].displayName} ${options[index].spriteIndex + 1}`
        }

        options[index].type = document.createElement('p')
        options[index].type.innerText = `${option.displayName} ${option.spriteIndex + 1}`

        let rightArrow = document.createElement('button')
        rightArrow.classList.add("characterPickButton")
        rightArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-right"></i>`)
        rightArrow.onclick = () => {
            options[index].spriteIndex++
            if(options[index].spriteIndex >= sprites.length) options[index].spriteIndex = 0
            characterPartHolder.src = sprites[options[index].spriteIndex][0]
            options[index].type.innerText = `${options[index].displayName} ${options[index].spriteIndex + 1}`
        }

        holder.appendChild(leftArrow)
        holder.appendChild(options[index].type)
        holder.appendChild(rightArrow)

        characterPicker.appendChild(holder)
        characterDisplay.appendChild(characterPartHolder)
    })

    let confirmButton = document.createElement('button')
    confirmButton.innerText = "Submit character"
    confirmButton.classList.add("characterConfirmButton")
    let randomButton = document.createElement('button')
    randomButton.innerText = "Randomize character"
    randomButton.classList.add("characterConfirmButton")
    characterPicker.appendChild(randomButton)
    characterPicker.appendChild(confirmButton)
    randomButton.onclick = () => {
        options.map(option => {
            let index = options.indexOf(option)
            let part = characterDisplay.getElementsByTagName("img")[index]
            let spriteIndex = Math.floor(Math.random() * option.sprites.length)
            part.src = option.sprites[spriteIndex][0]
            option.spriteIndex = spriteIndex
            option.type.innerText = `${option.displayName} ${spriteIndex + 1}`
        })
    }
}