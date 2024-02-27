const chooseOption = (userChoice) => {
    const options = ['pedra', 'papel', 'tesoura'];
    let computerChoice = options[Math.floor(Math.random() * 3)]

    let result = '';

    if(userChoice === computerChoice) {
        resultMessage = 'Empate!';
    }else if (
        (userChoice === 'pedra' && computerChoice === 'tesoura') ||
        (userChoice === 'papel' && computerChoice === 'pedra') ||
        (userChoice === 'tesoura' && computerChoice === 'papel')
    ) {
        result = 'Você venceu!';
    }else {
        result = 'Você perdeu!';
    }

    document.getElementById('result').innerText =
    `Você escolheu ${userChoice}.
    A CPU escolheu ${computerChoice}.
    ${result}`;

}    


const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const input = document.querySelector('input');


// rockButton.addEventListener('click', () => chooseOption('pedra'));
// rockButton.addEventListener('mouseover', () => alert('O Mouse passou por cima do botão pedra'));
// paperButton.addEventListener('click', () => chooseOption('papel'));
// scissorsButton.addEventListener('click', () => chooseOption('tesoura'));

//input.addEventListener('input', (event) => console.log(event.target.value));

//input.addEventListener('keydown')


// const list = document.querySelector('ul');


// const addItemList = () => {
//     let item = document.createElement('li');
//     item.innerHTML = 'item adicionado';
//     list.appendChild(item);
// }

// rockButton.addEventListener('click', addItemList);



// LOCAL STORAGE & SESSION STORAGE (& Knuckles) //

localStorage.clear()
//para limpar o local storage 


// localStorage.setItem('nome', 'Francisco')

// let nome = localStorage.getItem('nome');

// console.log(nome)

// localStorage.removeItem('nome');

//session storage: Não fica salvo

const alunos = [
    {nome: 'Francisco', idade: 45},
    {nome: 'Guilherme', idade: 23},
    {nome: 'Julyanna', idade: 16}
]

localStorage.setItem('alunos', JSON.stringify(alunos));

const alunosLocalStorage = localStorage.getItem('alunos');

console.log(JSON.parse(alunosLocalStorage));





