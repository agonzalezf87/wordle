const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p',],
    ['a','s','d','f','g','h','j','k','l'],
    ['delete','z','x','c','v','b','n','m','enter']
]

const title = ['W','O','R','D','L','E','J','S']

let sixLettersArray = []
let fourLettersArray = []
let tries = 0

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
                heroDisplayRow.classList.add('hero__display__row')
                for(let j = 0; j < 4; j++){
                    const displayCard = document.createElement('div')
                    displayCard.classList.add('card', 'display__card')
                    heroDisplayRow.appendChild(displayCard)
                }
                displayGrid.appendChild(heroDisplayRow)
            }
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
                keyboardRow.appendChild(keyboardCard)
            }else {
                const cardText = document.createTextNode(key)
                keyboardCard.appendChild(cardText)
                keyboardCard.setAttribute('title', key)
                if(key === 'enter'){}
                keyboardRow.appendChild(keyboardCard)
            }
        })
        keyboardSection.appendChild(keyboardRow)
    })
}

loadTitle()
createDisplay()
loadKeyboard()