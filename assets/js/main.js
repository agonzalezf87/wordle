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
        keyboard[1].includes('ñ') ? keyboard[1].pop() : keyboard
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
    /* Reseters */
    gameLength = length
    displayGrid.innerHTML = ''
    userArray = []
    gameFinished ? gameFinished : gameFinished = false
    winnerSection.classList.add('hidden')
    let buttons = keyboardSection.querySelectorAll('button')
    buttons.forEach(button => button.classList.contains('not') ? button.classList.remove('not') : button)
    
    switch (gameLang) {
        case 'en': 
            gameArray = []
            length === 4 ? fourLettersArray.forEach(key => gameArray.push(key)) : length === 5 ? fiveLettersArray.forEach(key => gameArray.push(key)) : sixLettersArray.forEach(key => gameArray.push(key))
        break
        case 'es':
            gameArray = []
            randomEsWord(length)
        break
    }
    for(let i = 0; i < 6; i++){
        const heroDisplayRow = document.createElement('div')
        heroDisplayRow.classList.add('hero__display__row')
        for(let j = 0; j < length; j++){
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
                    window.setTimeout(validateWord(), 2500)
                }else if(userArray.length < 1){
                    gameLang === 'en' ? showAlert('', `You have to write a ${gameArray.length} letters word`, 2500) : showAlert('', `Tienes que escribir una palabra de ${gameArray.length} letras`, 2500)
                }
                else{
                    gameLang === 'en' ? showAlert('error', `The word must have ${gameArray.length} letters!`, 2500) : showAlert('', `La palabra debe contener ${gameArray.length} letras`, 2500)
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
            $('button#deleteKey').disabled ? $('button#deleteKey').disabled = false : $('button#deleteKey')
            $('button#enter') ? $('button#enter').disabled = false : $('button#enter')        
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
                case 6:
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
    let usrStr = userArray.join('')
    let gameStr = gameArray.join('')

    for(let i = 0; i < userArray.length; i++){
        if(userArray[i] === gameArray[i]){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--green')
            foundLetter++
        }else if(gameArray.find(key => key === userArray[i])){
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--yellow')
        }else{
            $(`button#${userArray[i]}`).classList.contains('not') ? $(`button#${userArray[i]}`) : $(`button#${userArray[i]}`).classList.add('not')
            currentRow.querySelector(`div:nth-child(${i+1})`).classList.add('card--gray')
        }
    }
    
    if(usrStr === gameStr){
        $('button#deleteKey').disabled = true
        $('button#enter').disabled = true
        tries = 1
        winner(usrStr)
    }else if(usrStr !== gameStr && tries < 6){
        tries++
        userArray = []
    }else if(usrStr !== gameStr && tries === 6){
        $('button#deleteKey').disabled = true
        $('button#enter').disabled = true
        gameLang === 'en' ? showAlert('lost',`The word was ${gameStr}. You've lost 🥲`, 2500) : showAlert('lost',`La palabra era ${gameStr}. Haz perdido 🥲`, 2500)
    }
}

const winner = (word) => {
    winnerSection.classList.remove('hidden')

    const modal = document.createElement('div')
    const close = document.createElement('div')
    const title = document.createElement('div')
    const content = document.createElement('div')
    const icon = document.createElement('i')
    const header = document.createElement('h2')
    const paragraph = document.createElement('p')
    const text = document.createTextNode(`👉 ${word} 👈`)
    
    modal.classList.add('modal', 'modal--winner')
    close.classList.add('modal--close')
    title.classList.add('modal__title')
    content.classList.add('modal__content')
    icon.classList.add('fa-solid', 'fa-xmark')

    switch (gameLang){
        case 'en':
            winnerSection.innerHTML = `<div>🏅 You won! 🏅</div>`
            header.innerHTML = `🎊 You've Found The Word! 🎊`
        break
        case 'es':
            winnerSection.innerHTML = `<div>🏅 ¡Haz Ganado! 🏅</div>`
            header.innerHTML = `🎊 ¡ Encontraste la Palabra! 🎊`
        break
    }

    paragraph.appendChild(text)
    
    close.appendChild(icon)
    title.appendChild(header)
    content.appendChild(paragraph)

    modal.append(close, title, content)
    body.appendChild(modal)

    close.onclick = () => modal.remove()
}

const showAlert = (type, message, wait) => {
    main.classList.add('blurry')
    const divAlert = document.createElement('div')
    const divIcon = document.createElement('div')
    const divMessage = document.createElement('div')
    const icon = document.createElement('i')
    const messageParag = document.createElement('p')
    const text = document.createTextNode(message)
    divAlert.classList.add('alert')
    divIcon.classList.add('alert__icon')
    divMessage.classList.add('alert__message')
    icon.classList.add('fa-solid')
    messageParag.appendChild(text)
    divMessage.appendChild(messageParag)
    divIcon.appendChild(icon)
    
    if(type === 'error' ) {
        icon.classList.add('fa-circle-xmark')
        divIcon.classList.add('icon--error')
    }else if(type === 'success') {
        icon.classList.add('fa-circle-check')
        divIcon.classList.add('icon--success')
    }else {
        icon.classList.add('fa-circle-info')
    }

    divAlert.append(divIcon, divMessage)
    body.appendChild(divAlert)
    
    window.setTimeout(() => {
        main.classList.remove('blurry')
        divAlert.remove()
    }, wait)
}

const callHowTo = () => {
    main.classList.add('blurry')
    const howTo = document.createElement('section')
    const close = document.createElement('div')
    const title = document.createElement('div')
    const content = document.createElement('div')
    howTo.classList.add('modal')
    close.classList.add('modal--close')
    title.classList.add('modal__title')
    content.classList.add('modal__content')
    
    switch(gameLang){
        case 'en':
            title.innerHTML = `<h2>${howToLangs.en.title}</h2>`
            content.innerHTML = howToLangs.en.content
        break
        case 'es':    
                title.innerHTML = `<h2>${howToLangs.es.title}</h2>`
                content.innerHTML = howToLangs.es.content
        break
    }
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    close.onclick = () => {
        main.classList.remove('blurry')
        howTo.remove()
    }
    howTo.append(close, title, content)
    body.appendChild(howTo)
}

const changeLanguage = (lang) => {  
    lang === 'en' ? footerText.innerHTML = footers[0] : footerText.innerHTML = footers[1]
    gameLang = lang
    loadKeyboard()
    createDisplay(gameLength)
}

loadTitle()
loadKeyboard()
createDisplay(gameLength)

langEng.onclick = () => changeLanguage('en')
langEsp.onclick = () => changeLanguage('es')
gameInfo.onclick = () => callHowTo()