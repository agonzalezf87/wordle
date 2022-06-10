const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p',],
    ['a','s','d','f','g','h','j','k','l',"ñ"],
    ['delete','z','x','c','v','b','n','m','enter']
]
const title = ['W','O','R','D','L','E','J','S']

let fourLettersArray = ['p','i','l','a']
let fiveLettersArray = ['v','o','l','a','r']
let sixLettersArray = ['p','l','a','t','z','i']
let gameArray = []
let tries = 1
let gameFinished = false
let gameLang = 'en'
let userArray = []

const $ = (id) => document.querySelector(id)

const headerTitle = $('#headerTitle')
const modal = $('#modal')
const closeModal = $('#closeModal')
const langEsp = $('#langEsp')
const langEng = $('#langEng')
const displayGrid = $('#displayGrid')
const keyboardSection = $('#keyboard')
const gameSettings = $('#gameSettings')
const gameInfo = $('#gameInfo')
const footerText = $('#footerText')

/* Languages helpers */

let footers = [
    'Made with 💚 by <span class="strong">Antonio Gonzalez Dev</span>',
    'Hecho con 💚 por <span class="strong">Antonio Gonzalez Dev</span>'
]

/* Axios helpers */
const API_URL = 'https://od-api.oxforddictionaries.com/api/v2'
const API_ID = '162f38c1'
const API_KEY = '2ffcff682b4bb9445ee084b6dfb621e1'