let CharacterData = [];
// let images = document.getElementById("class").children;
let classes = ['wizard', 'knight']; //, null, null, null, null
let menuState = false;
import JsonLoader from "../Core/Loaders/JsonLoader.js";
import Vector2 from "../Core/Vector2.js"
import Storage from "../Core/Storage.js";

const lockIcon = `<i class="fas fa-lock" style="width:11px"></i>`
const unlockIcon = `<i class="fas fa-lock-open" style="width:11px"></i>`

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

    let characterPicker = document.getElementById('characterSelectors')
    let characterDisplay = document.getElementById('characterDisplay')

    let holder = document.createElement('div')
    let nameLabel = document.createElement('label')
    nameLabel.innerText = "Name: "
    nameLabel.for = "characterName"
    nameLabel.id = 'characterName'
    let nameInput = document.createElement('input')
    nameInput.name = "characterName"
    nameInput.id = "characterNamefield"

    let lockAll = document.createElement('button')
    lockAll.innerHTML = unlockIcon
    lockAll.style.position = "absolute"
    lockAll.style.right = "0px"
    lockAll.title = "Lock all"
    lockAll.classList.add("characterPickButton")
    lockAll.setAttribute("locked", false)
    lockAll.addEventListener('click', () => {
        lockAll.getAttribute("locked") == "true" ? lockAll.innerHTML = unlockIcon : lockAll.innerHTML = lockIcon
        lockAll.setAttribute("locked", lockAll.getAttribute("locked") == "true" ? false : true)
        lockAll.getAttribute("locked") == "true" ? lockAll.title = "Unlock all" : lockAll.title = "Lock all"
        let state = lockAll.getAttribute("locked") == "true" ? true : false
        options.map(option => {
            option.lock.setAttribute("locked", state)
            state ? option.lock.innerHTML = lockIcon : option.lock.innerHTML = unlockIcon
        })
        classButtons.lock.setAttribute("locked", state)
        state ? classButtons.lock.innerHTML = lockIcon : classButtons.lock.innerHTML = unlockIcon
    })
    
    holder.append(nameLabel)
    holder.appendChild(nameInput)
    holder.appendChild(lockAll)
    characterPicker.appendChild(holder)

    options.map(option => {
        let index = options.indexOf(option)
        options[index].spriteIndex = 0
        let sprites = options[index]["sprites"]
        
        let characterPartHolder = document.createElement('img')
        characterPartHolder.classList.add("characterPart")
        characterPartHolder.src = sprites[options[index].spriteIndex][0]
        characterPicker.appendChild(characterPartHolder)

        //let buttons = createButtons(`${option.displayName}: ${option.spriteIndex + 1}`)
        let buttons = createButtons(`${option.displayName}: ${option.spriteIndex + 1}`, option.displayName)

        buttons.itemDisplay.src = sprites[options[index].spriteIndex][0]

        buttons.leftArrow.onclick = () => {
            if(option.lock.getAttribute("locked") == "true") return
            options[index].spriteIndex--
            if(options[index].spriteIndex < 0) options[index].spriteIndex = sprites.length - 1
            characterPartHolder.src = sprites[options[index].spriteIndex][0]
            options[index].itemDisplay.src = sprites[options[index].spriteIndex][0]
            options[index].type.innerText = `${options[index].displayName}: ${options[index].spriteIndex + 1}`
        }

        options[index].type = buttons.textDisplay
        options[index].lock = buttons.lock
        options[index].itemDisplay = buttons.itemDisplay

        buttons.rightArrow.onclick = () => {
            if(option.lock.getAttribute("locked") == "true") return
            options[index].spriteIndex++
            if(options[index].spriteIndex >= sprites.length) options[index].spriteIndex = 0
            characterPartHolder.src = sprites[options[index].spriteIndex][0]
            options[index].itemDisplay.src = sprites[options[index].spriteIndex][0]
            options[index].type.innerText = `${options[index].displayName}: ${options[index].spriteIndex + 1}`
        }

        characterPicker.appendChild(buttons.holder)
        characterDisplay.appendChild(characterPartHolder)
    })

    let classIndex = 0
    //let classButtons = createButtons(`class: ${classes[classIndex]}`)
    let classButtons = createButtons(`class: ${firstCharUpperCase(classes[classIndex])}`, 'class')
    classButtons.textDisplay.title = `Class: ${firstCharUpperCase(classes[classIndex])}`
    JsonLoader.Load(`./CharacterCreator/class_${classes[classIndex]}.json`).then(e => {
        console.log(e);
    });

    classButtons.leftArrow.onclick = () => {
        if(classButtons.lock.getAttribute("locked") == "true") return
        classIndex--
        if(classIndex < 0) classIndex = classes.length - 1
        classButtons.textDisplay.innerText = `class: ${classes[classIndex]}`
        classButtons.textDisplay.title = `Class: ${firstCharUpperCase(classes[classIndex])}`
        JsonLoader.Load(`./CharacterCreator/class_${classes[classIndex]}.json`).then(e => {
            console.log(e);
        });
    }

    classButtons.rightArrow.onclick = () => {
        if(classButtons.lock.getAttribute("locked") == "true") return
        classIndex++
        if(classIndex >= classes.length) classIndex = 0
        classButtons.textDisplay.innerText = `class: ${firstCharUpperCase(classes[classIndex])}`
        classButtons.textDisplay.title = `Class: ${firstCharUpperCase(classes[classIndex])}`
        JsonLoader.Load(`./CharacterCreator/class_${classes[classIndex]}.json`).then(e => {
            console.log(e);
        });
    }



    let confirmButton = createButton("Submit character")

    confirmButton.button.onclick = () => {
        let parsedCharacterData = {}
        options.map(option => {
            parsedCharacterData[option.displayName] = option.spriteIndex
        })
        parsedCharacterData["class"] = classIndex
        parsedCharacterData["name"] = nameInput.value
        console.log(parsedCharacterData)
        window.client.emit("saveNewCharacter", parsedCharacterData)
        window.CharacterMenu.Hide()
        window.GameMenu.Show()
        if (Storage.Get('tutorialcompleted') == null || Storage.Get('tutorialcompleted') == false) {
            window.Tutorial.Start()
        }
    }

    let randomButton = createButton("Randomize character")
    characterPicker.appendChild(classButtons.holder)
    characterPicker.appendChild(randomButton.button)
    characterPicker.appendChild(confirmButton.button)

    randomButton.button.onclick = () => {
        options.map(option => {
            if(option.lock.getAttribute("locked") == "true") return
            let index = options.indexOf(option)
            let part = characterDisplay.getElementsByTagName("img")[index]
            let spriteIndex = Math.floor(Math.random() * option.sprites.length)
            part.src = option.sprites[spriteIndex][0]
            option.itemDisplay.src = option.sprites[spriteIndex][0]
            option.spriteIndex = spriteIndex
            option.type.innerText = `${option.displayName}: ${spriteIndex + 1}`
        })

        if(classButtons.lock.getAttribute("locked") == "false"){
            classIndex = Math.floor(Math.random() * classes.length)
            classButtons.textDisplay.innerText = `class: ${firstCharUpperCase(classes[classIndex])}`
            classButtons.textDisplay.title = `Class: ${firstCharUpperCase(classes[classIndex])}`
            JsonLoader.Load(`./CharacterCreator/class_${classes[classIndex]}.json`).then(e => {
                console.log(e);
            });
        }
    }
}

function createButtons(text, tooltipText){
    let holder = document.createElement('div')

    let itemDisplay = document.createElement('img')

    itemDisplay.style.translate = "transform(-50%, -50%)"
    itemDisplay.style.top = "0px"
    itemDisplay.style.width = "60px"
    itemDisplay.style.height = "60px"
    itemDisplay.style.imageRendering = "pixelated"

    let leftArrow = document.createElement('button')
    leftArrow.classList.add("characterPickButton")
    leftArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-left"></i>`)
    leftArrow.classList.add("characterPickButtonLeft")
    leftArrow.title = `Change ${tooltipText}`

    let textDisplay = document.createElement('p')
    //textDisplay.appendChild(itemDisplay)
    textDisplay.title = firstCharUpperCase(tooltipText)
    textDisplay.innerText = text

    let rightArrow = document.createElement('button')
    rightArrow.classList.add("characterPickButton")
    rightArrow.classList.add("characterPickButtonRight")
    rightArrow.insertAdjacentHTML('afterbegin', `<i class="fas fa-arrow-right"></i>`)
    rightArrow.title = `Change ${tooltipText}`
    
    let lock = document.createElement('button')
    lock.innerHTML = unlockIcon
    lock.classList.add("characterPickButton")
    lock.setAttribute("locked", false)
    lock.addEventListener('click', () => {
        lock.getAttribute("locked") == "true" ? lock.innerHTML = unlockIcon : lock.innerHTML = lockIcon
        lock.setAttribute("locked", lock.getAttribute("locked") == "true" ? false : true)
        lock.getAttribute("locked") == "true" ? lock.title = `Unlock ${text}` : lock.title = `Lock ${text}`
    })
    lock.title = `Lock ${text}`

    let div2 = document.createElement('div')
    div2.classList.add("characterPickButtonHolder2")
    holder.appendChild(div2)

    div2.appendChild(itemDisplay)
    div2.appendChild(textDisplay)

    let div = document.createElement('div')
    div.classList.add("characterPickButtonHolder")
    holder.appendChild(div)

    div.appendChild(leftArrow)
    div.appendChild(rightArrow)
    div.appendChild(lock)

    return {leftArrow, rightArrow, holder, textDisplay, lock, itemDisplay}
}

function createButton(text){
    let button = document.createElement('button')
    button.innerText = text
    button.classList.add("characterConfirmButton")
    return {button}
}

function firstCharUpperCase(string){
    let chars = string.split("")
    chars[0] = chars[0].toUpperCase()
    return chars.join("")
}