let count = 0
let upButton = document.getElementById('upButton')
let downButton = document.getElementById('downButton')
let number = document.querySelector('h2')

const showText = () => {
    number.innerHTML = count
}

showText()

upButton.addEventListener('click', () => {
    count += 1
    number.innerHTML = count
})

downButton.addEventListener('click', () => {
    count -= 1
    number.innerHTML = count
})