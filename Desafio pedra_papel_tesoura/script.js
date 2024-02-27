const choices = document.querySelectorAll('.choice');
const scoreboard = document.querySelector('.scoreboard');
const playerScore = document.querySelector('.player-score span');
const computerScore = document.querySelector('.computer-score span');
const announcement = document.querySelector('.announcement');

let playerScoreCount = 0;
let computerScoreCount = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        announcement.textContent = result;
        updateScore(result);
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'Empate!';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'Você ganhou!';
    } else {
        return 'Computador ganhou!';
    }
}

function updateScore(result) {
    if (result === 'Você ganhou!') {
        playerScoreCount++;
        playerScore.textContent = playerScoreCount;
    } else if (result === 'Computador ganhou!') {
        computerScoreCount++;
        computerScore.textContent = computerScoreCount;
    }
}