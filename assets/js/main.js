const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p',],
    ['a','s','d','f','g','h','j','k','l'],
    ['delete','z','x','c','v','b','n','m','enter']
]

const title = ['W','O','R','D','L','E','J','S']

let fourLettersArray = []
let fiveLettersArray = []
let sixLettersArray = ['p','l','a','t','z','i']
let tries = 1
let wordDimension = 6
let userArray = []

const $ = (id) => document.querySelector(id)

const displayGrid = $('#displayGrid')
const keyboardSection = $('#keyboard')
const headerTitle = $('#headerTitle')

const createDisplay = (lenght) => {
    displayGrid.innerHTML = ''
    switch (lenght){
        case 4:
            for(let i = 0; i < 6; i++){
                const heroDisplayRow = document.createElement('div')
                heroDisplayRow.classList.add('hero__display__row', 'short')
                for(let j = 0; j < 4; j++){
                    const displayCard = document.createElement('div')
                    displayCard.classList.add('card', 'display__card')
                    heroDisplayRow.appendChild(displayCard)
                }
                displayGrid.appendChild(heroDisplayRow)
            }
            wordDimension = 4
        break
        
        case 5:
            for(let i = 0; i < 6; i++){
                const heroDisplayRow = document.createElement('div')
                heroDisplayRow.classList.add('hero__display__row')
                for(let j = 0; j < 5; j++){
                    const displayCard = document.createElement('div')
                    displayCard.classList.add('card', 'display__card')
                    heroDisplayRow.appendChild(displayCard)
                }
                displayGrid.appendChild(heroDisplayRow)
            }
            wordDimension = 5
        break

        default:
            for(let i = 0; i < 6; i++){
                const heroDisplayRow = document.createElement('div')
                heroDisplayRow.classList.add('hero__display__row')
                for(let j = 0; j < 6; j++){
                    const displayCard = document.createElement('div')
                    displayCard.classList.add('card', 'display__card')
                    heroDisplayRow.appendChild(displayCard)
                }
                displayGrid.appendChild(heroDisplayRow)
            }
        break
    }
}

const loadTitle = () => {
    title.forEach(letter => {
        const letterCard = document.createElement('div')
        const letterText = document.createTextNode(letter)
        letterCard.classList.add('card', 'header__title__card')
        if(letter === 'J' || letter === 'S'){
            letterCard.classList.add('header__title__card--yellow')
        }
        letterCard.appendChild(letterText)
        headerTitle.appendChild(letterCard)
    })
}

const loadKeyboard = () => {
    keyboard.map(row => {
        const keyboardRow = document.createElement('div')
        keyboardRow.classList.add('keyboard__row')
        row.forEach(key => {
            const keyboardCard = document.createElement('div')
            keyboardCard.classList.add('card', 'keyboard__card')
            if(key === 'delete'){
                const deleteIcon = document.createElement('i')
                deleteIcon.classList.add('fa-solid', 'fa-delete-left')
                keyboardCard.appendChild(deleteIcon)
                keyboardCard.setAttribute('title', key)
                keyboardCard.onclick = () => writeLetter(key)
                keyboardRow.appendChild(keyboardCard)
            }else {
                const cardText = document.createTextNode(key)
                keyboardCard.appendChild(cardText)
                keyboardCard.setAttribute('title', key)
                keyboardCard.onclick = () => writeLetter(key)
                keyboardRow.appendChild(keyboardCard)
            }
        })
        keyboardSection.appendChild(keyboardRow)
    })
}

const writeLetter = (key) => {
    switch (key) {
        case 'enter':
            if(tries <= 5){
                validateWord()
                /* tries++
                userArray = [] */
            }else if(tries === 6){
                
            }
        break
        case 'delete':
            if(userArray.length > 0){
                displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`).querySelector(`div:nth-child(${userArray.length})`).textContent = ''
                userArray.splice(-1)
            }
        break
        default:
            switch (wordDimension) {
                case 4:
                    if(userArray.length < 4){
                        userArray.push(key)
                        displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`).querySelector(`div:nth-child(${userArray.length})`).textContent = key
                    }
                break
                case 5:
                    if(userArray.length < 5){
                        userArray.push(key)
                        displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`).querySelector(`div:nth-child(${userArray.length})`).textContent = key
                    }
                break
                default:
                    if(userArray.length < 6){
                        userArray.push(key)
                        displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`).querySelector(`div:nth-child(${userArray.length})`).textContent = key
                    }
                break
            }
        break
    }
    console.log(userArray)
}

const validateWord = () => {
    if(userArray.length === 4) {

    }
}

loadTitle()
createDisplay(4)
loadKeyboard()