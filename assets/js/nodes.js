const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p',],
    ['a','s','d','f','g','h','j','k','l',"ñ"],
    ['delete','z','x','c','v','b','n','m','enter']
]
const title = ['W','O','R','D','L','E','J','S']

let fourLettersArray = ['p','i','l','e']
let fiveLettersArray = ['w','h','i','l','e']
let sixLettersArray = ['s','t','a','r','t','s']
let gameArray = []
let gameLength = 4
let tries = 1
let gameFinished = false
let gameLang = 'en'
let userArray = []
let esExist = 0
let enExiste = 0

const $ = (id) => document.querySelector(id)

const body = $('body')
const main = $('main')
const headerTitle = $('#headerTitle')
const langEsp = $('#langEsp')
const langEng = $('#langEng')
const gameInfo = $('#gameInfo')
const displayGrid = $('#displayGrid')
const winnerSection = $('#winnerSection')
const keyboardSection = $('#keyboard')
const footerText = $('#footerText')

/* Languages helpers */

const footers = [
    'Made with 💚 by <span class="strong">Antonio Gonzalez Dev</span>',
    'Hecho con 💚 por <span class="strong">Antonio Gonzalez Dev</span>'
]

const howToLangs = {
    en:
    {
        title: `How To Play`,
        content: `
            <p> You have to guess the hidden word in 6 tries, the color of the letters changes to show how close you are.</p>
                <p>To start the game, just enter any word, for example: </p>
                <div class="modal__content--example">
                        <div class="card card--green">g</div>
                        <div class="card card--gray">r</div>
                        <div class="card card--yellow">o</div>
                        <div class="card card--gray">w</div>
                    </div>
            <p>Where...</p>
            <div class="modal__content--explanation">
                <div class="card card--gray">r</div> <div class="card card--gray">w</div>
                <div>Not part of the secret word. (The keyboard letter will change to this color)</div>
            </div>
            <div class="modal__content--explanation">
                <div class="card card--yellow">o</div>
                <div>Part of the word but in different spot.</div>
            </div>
            <div class="modal__content--explanation">
                <div class="card card--green">o</div>
                <div>Part of the word and in the right spot.</div>
            </div>
            <p>In the next tries you can try to re locate the wods that are part of the secret word:</p>
            <div class="modal__content--example">
                <div class="card card--green">g</div>
                <div class="card card--green">o</div>
                <div class="card card--gray">n</div>
                <div class="card card--yellow">e</div>
            </div>
            <p>Until you found it!</p>
            <div class="modal__content--example">
                <div class="card card--green">g</div>
                <div class="card card--green">o</div>
                <div class="card card--green">e</div>
                <div class="card card--green">s</div>
            </div>
            <h1>🏅</h1>
            <a href="https://github.com/agonzalezf87/wordle" target="_blank"><i class="fa-brands fa-git-alt"></i> Repository</a>
            <a href="https://github.com/agonzalezf87" target="_blank"><i class="fa-brands fa-github"></i> Other projects</a>
        `
    },
    es:
    {
        title: `Cómo Jugar`,
        content: `
            <p> Tienes que adivinar la palabra oculta en 6 intentos, el color de las letras cambia para mostrar lo cerca que estás.</p>
                <p>Para comenzar, sólo ingresa una palabra, por ejemplo: </p>
                <div class="modal__content--example">
                        <div class="card card--green">c</div>
                        <div class="card card--gray">e</div>
                        <div class="card card--gray">d</div>
                        <div class="card card--yellow">o</div>
                    </div>
            <p>Dónde...</p>
            <div class="modal__content--explanation">
                <div class="card card--gray">e</div> <div class="card card--gray">d</div>
                <div>No forma parte de la palabra. (La letra del teclado cambiará a este color)</div>
            </div>
            <div class="modal__content--explanation">
                <div class="card card--yellow">o</div>
                <div>Forma parte de la palabra, pero en diferente ubiacación.</div>
            </div>
            <div class="modal__content--explanation">
                <div class="card card--green">c</div>
                <div>Forma parte de la palabra y en correcta ubicación.</div>
            </div>
            <p>En los siguientes intentes puedes intentar re ubicar las letras encontradas:</p>
            <div class="modal__content--example">
                <div class="card card--green">c</div>
                <div class="card card--green">o</div>
                <div class="card card--gray">l</div>
                <div class="card card--green">a</div>
            </div>
            <p>¡Hasta encontrar la palabra!</p>
            <div class="modal__content--example">
                <div class="card card--green">c</div>
                <div class="card card--green">o</div>
                <div class="card card--green">m</div>
                <div class="card card--green">a</div>
            </div>
            <h1>🏅</h1>
            <a href="https://github.com/agonzalezf87/wordle" target="_blank"><i class="fa-brands fa-git-alt"></i> Repositorio</a>
            <a href="https://github.com/agonzalezf87" target="_blank"><i class="fa-brands fa-github"></i> Otros Proyectos</a>
        `
    }
}

/* aPIs consumption */
const API_ES = 'https://palabras-aleatorias-public-api.herokuapp.com/'
const API_ES_RNDM = 'palabras-aleatorias'
const API_ES_BYLENGTH = 'random-by-length'
const API_ES_MULTI = 'multiple-random'

const apiEs = axios.create({
    baseURL: API_ES
})

const API_EN = 'https://api.wordnik.com/v4/words.json/'
const API_EN_KEY = ''

const apiEn = axios.create({
    baseURL: API_EN,
    headers: {
        'api_key': API_EN_KEY
    }
})