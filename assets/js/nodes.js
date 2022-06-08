const keyboard = [
    ['q','w','e','r','t','y','u','i','o','p',],
    ['a','s','d','f','g','h','j','k','l'],
    ['delete','z','x','c','v','b','n','m','enter']
]
const title = ['W','O','R','D','L','E','J','S']

let fourLettersArray = ['p','i','l','a']
let fiveLettersArray = ['v','o','l','a','r']
let sixLettersArray = ['p','l','a','t','z','i']
let gameArray = []
let tries = 1
// let wordDimension = 6
let userArray = []

const $ = (id) => document.querySelector(id)

const headerTitle = $('#headerTitle')
const modal = $('#modal')
const closeModal = $('#closeModal')
const langEsp = $('#langEsp')
const langEng = $('#langEng')
const btnFourLetters = $('#btnFourLetters')
const btnFiveLetters = $('#btnFiveLetters')
const btnSixLetters = $('#btnSixLetters')
const displayGrid = $('#displayGrid')
const keyboardSection = $('#keyboard')
const gameSettings = $('#gameSettings')
const gameInfo = $('#gameInfo')