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
                keyboardCard.id = 'deleteKey'
                keyboardCard.onclick = () => writeLetter(key)
                keyboardRow.appendChild(keyboardCard)
            }else {
                const cardText = document.createTextNode(key)
                keyboardCard.appendChild(cardText)
                if(key === 'enter') keyboardCard.id = 'enterKey'
                keyboardCard.setAttribute('title', key)
                keyboardCard.onclick = () => writeLetter(key)
                keyboardRow.appendChild(keyboardCard)
            }
        })
        keyboardSection.appendChild(keyboardRow)
    })
}

const createDisplay = (length) => {
    displayGrid.innerHTML = ''
    userArray = []
    gameArray = []
    switch (length) { /* This will change with dictionary load */
        case 4:
            fourLettersArray.forEach(key => gameArray.push(key))
        break
        case 5:
            fiveLettersArray.forEach(key => gameArray.push(key))
        break
        case 6:
            sixLettersArray.forEach(key => gameArray.push(key))
        break
    }
    for(let i = 0; i < length; i++){
        const heroDisplayRow = document.createElement('div')
        heroDisplayRow.classList.add('hero__display__row', 'short')
        for(let j = 0; j < gameArray.length; j++){
            const displayCard = document.createElement('div')
            displayCard.classList.add('card', 'display__card')
            heroDisplayRow.appendChild(displayCard)
        }
        displayGrid.appendChild(heroDisplayRow)
    }
}

const writeLetter = (key) => {
    if(gameStarted){
        switch (key) {
            case 'enter':
                // console.log(tries)
                if(userArray.length === gameArray.length){
                    validateWord()
                }else{
                    alert(`The word must have ${gameArray.length} letters!`)
                }
            break
            case 'delete':
                if(userArray.length > 0){
                    displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`).querySelector(`div:nth-child(${userArray.length})`).textContent = ''
                    userArray.splice(-1)
                }
            break
            default:
                switch (gameArray.length) {
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
    }
    
}

const validateWord = () => {
    let currentRow = displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`)
    let userWon = 0
    let gameStr = userArray.join('')

    for(let i = 0; i < userArray.length; i++){
        if(userArray[i] === gameArray[i]){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--green')
            userWon++
        }else if(gameArray.find(key => key === userArray[i])){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--yellow')
        }else{
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--gray')
        }
    }
    if(userWon === gameArray.length){
        alert(`You found the word! \n ${gameStr}`)
    }else{
        tries++
        userArray = []
    }
}

loadTitle()
loadKeyboard()

closeModal.onclick = () => {
    if(displayGrid.querySelectorAll('div').length > 0 || modal.classList.contains('modal__info')){
        modal.classList.add('hidden')
    }
}

btnFourLetters.onclick = () => createDisplay(4)
btnFiveLetters.onclick = () => createDisplay(5)
btnSixLetters.onclick = () => createDisplay(6)

gameSettings.onclick = () => modal.classList.contains('hidden') ? modal.classList.remove('hidden') : console.log('Modal is active')
gameInfo.onclick = () => modal.classList.contains('hidden') ? modal.classList.remove('hidden') : console.log('Modal is active')