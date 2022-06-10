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
    keyboardSection.querySelectorAll('div').forEach(el => el.remove()) 
    if(gameLang === 'en'){
        keyboard[1].pop()
    }else{
        keyboard[1].includes('ñ') ? keyboard : keyboard[1].push('ñ')
    }
    keyboard.map(row => {
        const keyboardRow = document.createElement('div')
        keyboardRow.classList.add('keyboard__row')
        row.forEach(key => {
            const keyboardCard = document.createElement('button')
            keyboardCard.classList.add('card', 'keyboard__btn')
            keyboardCard.type = 'button'
            keyboardCard.id = key
            if(key === 'delete'){
                const deleteIcon = document.createElement('i')
                deleteIcon.classList.add('fa-solid', 'fa-delete-left')
                keyboardCard.appendChild(deleteIcon)
                keyboardCard.onclick = () => writeLetter(key)
                keyboardCard.id = 'deleteKey'
                keyboardRow.appendChild(keyboardCard)
            }else{
                const cardText = document.createTextNode(key)
                keyboardCard.appendChild(cardText)
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
    gameFinished ? gameFinished : gameFinished = false
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
    for(let i = 0; i < gameArray.length; i++){
        const heroDisplayRow = document.createElement('div')
        heroDisplayRow.classList.add('hero__display__row')
        for(let j = 0; j < gameArray.length; j++){
            const displayCard = document.createElement('div')
            displayCard.classList.add('card', 'display__card')
            heroDisplayRow.appendChild(displayCard)
        }
        displayGrid.appendChild(heroDisplayRow)
    }
}

const writeLetter = (key) => {
    switch (key) {
        case 'enter':
            if(gameFinished === false){
                if(userArray.length === gameArray.length){
                    validateWord()
                }else if(userArray.length < 1){
                    gameLang === 'en' ? showAlert('error', `You have to write a ${gameArray.length} letters word`) : showAlert('error', `Tienes que escribir una palabra de ${gameArray.length} letras`)
                }
                else{
                    gameLang === 'en' ? showAlert('error', `The word must have ${gameArray.length} letters!`) : showAlert('error', `La palabra debe contener ${gameArray.length} letras`)
                }
            }
        break
        case 'delete':
            if(userArray.length > 0 && gameFinished === false){
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

const validateWord = () => {
    let currentRow = displayGrid.querySelector(`.hero__display__row:nth-child(${tries})`)
    let foundLetter = 0
    let gameStr = userArray.join('')

    for(let i = 0; i < userArray.length; i++){
        if(userArray[i] === gameArray[i]){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--green')
            foundLetter++
        }else if(gameArray.find(key => key === userArray[i])){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--yellow')
        }else{
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--gray')
        }
    }
    if(foundLetter === gameArray.length){
        const deleteKey = document.querySelector('#deleteKey')
        deleteKey.disable = true
        showAlert('success', `You found the word! <br> ${gameStr}`)
    }else{
        tries++
        userArray = []
    }
}

const showAlert = (type, message) => {
    const body = document.querySelector('body')
    const infoDiv = document.createElement('div')
    const infoIcon = document.createElement('i')
    const infMessage = document.createTextNode(message)
    infoIcon.classList.add('fa-solid')
    infoDiv.classList.add('info')
    if(type === 'error'){
        infoIcon.classList.add('fa-circle-xmark')
        infoDiv.classList.add('info--error')
    }else if(type === 'success'){
        infoIcon.classList.add('fa-circle-check')
        infoDiv.classList.add('info--success')
    }else{
        infoIcon.classList.add('fa-circle-exclamation')
    }
    infoDiv.appendChild(infoIcon)
    infoDiv.appendChild(infMessage)

    body.appendChild(infoDiv)
    
    // window.setTimeout(() => infoDiv.remove(), 2000)
}

const changeLanguage = (lang) => {
    if(lang === gameLang){
        loadKeyboard()
    }else{
        switch (lang){
            case 'es':
                gameLang = 'es'
                footerText.innerHTML = footers[1]
            break
            case 'en':
                gameLang = 'en'
                footerText.innerHTML = footers[0]
            break
        }
        loadKeyboard()
    }
}

loadTitle()
loadKeyboard()
createDisplay(4)

langEng.onclick = () => changeLanguage('en')
langEsp.onclick = () => changeLanguage('es')