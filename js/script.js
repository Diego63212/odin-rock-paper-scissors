const MAX_ROUNDS = 6;

const container = document.querySelector('.container');
const roundText = document.querySelector('#round-result');

const playerScoreText = document.querySelector('#score-player');
const computerScoreText = document.querySelector('#score-computer');
const tiedScoreText = document.querySelector('#score-tied');

let computerChoice = getComputerChoice();
let playerChoice = 'ROCK';

let playerScore = 0;
let computerScore = 0;
let tiedScore = 0;

let gameFinished = false;

// Listen to bubbling click to get the player choice
container.addEventListener('click', event => {
    event.stopPropagation();
    if (event.target.nodeName === 'BUTTON') {
        playGame(event.target.textContent);
    }
})

// Returns the computer choice depending on a random number
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3 + 1);
    
    if (randomChoice === 1) {
        console.log('Computer: Rock');
        return 'Rock';
    } else if (randomChoice === 2) {
        console.log('Computer: Paper');
        return 'Paper';
    } else if (randomChoice === 3) {
        console.log('Computer: Scissors');
        return 'Scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    // If both choices are the same declare a tie to end the round early
    if (playerSelection === computerSelection) {
        roundText.textContent = 'Tie! Same choice';;
        return 'TIE';
    }

    // Player choice is Rock
    if (playerSelection === 'ROCK' && computerSelection === 'PAPER') {
        roundText.textContent = 'You Lose! Paper beats Rock';
        return 'LOSE';
    } else if (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') {
        roundText.textContent = 'You Win! Rock beats Scissors';
        return 'WIN';
    }

    // Player choice is Paper
    if (playerSelection === 'PAPER' && computerSelection === 'ROCK') {
        roundText.textContent = 'You Win! Paper beats Rock';
        return 'WIN';
    } else if (playerSelection === 'PAPER' && computerSelection === 'SCISSORS') {
        roundText.textContent = 'You Lose! Scissors beats Paper';
        return 'LOSE';
    }

    // Player choice is Scissors
    if (playerSelection === 'SCISSORS' && computerSelection === 'ROCK') {
        roundText.textContent = 'You Lose! Rock beats Scissors';
        return 'LOSE';
    } else if (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') {
        roundText.textContent = 'You Win! Scissors beats Paper';
        return 'WIN';
    }
}

function playGame(playerSelection) {
    if (gameFinished) {
        resetGame();
        return
    }
    
    let roundResult = playRound(playerSelection, getComputerChoice());

    if (roundResult === 'WIN') {
        playerScore++;
    } else if (roundResult === 'LOSE') {
        computerScore++;
    } else if (roundResult === 'TIE') {
        tiedScore++;
    }

    // Input scores into UI text
    updateScore()
    
    let totalRounds = playerScore + computerScore + tiedScore;

    if (playerScore === computerScore && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'STALEMATE!'
        alert('Stalemate!')
    } else if (playerScore > computerScore && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'WINNER!'
        alert('You Win! Congratulations!')
    } else if (playerScore < computerScore && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'LOSER!'
        alert('You Lose! Better luck next time!')
    }
}

function updateScore() {
    // Update scoring text
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    tiedScoreText.textContent = tiedScore;
}
// Allows the game to be played again after ending
function resetGame() {
    roundText.textContent = 'Press a button!';
    playerScore = 0;
    computerScore = 0;
    tiedScore = 0;
    updateScore()
    gameFinished = false;
}