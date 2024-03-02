const MAX_ROUNDS = 5;

const container = document.querySelector('.container');
const roundText = document.querySelector('#round-result')
const scorePlayerText = document.querySelector('#round-won')
const computerPlayerText = document.querySelector('#round-lost')
const playerScore = document.querySelector('#score-player');
const computerScore = document.querySelector('#score-computer');
const neutralScore = document.querySelector('#score-tied')

let computerChoice = getComputerChoice();
let playerChoice = 'rock';

let roundsWon = 0;
let roundsLost = 0;
let roundsTied = 0;

let gameFinished = false;

// Listen to click to get the player choice
container.addEventListener('click', event => {
    if (gameFinished) resetGame();

    playGame(event.target.textContent)
    event.stopPropagation();
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
    let roundResult = playRound(playerSelection, getComputerChoice());
    
    if (roundResult === 'WIN') {
        roundsWon++;
    } else if (roundResult === 'LOSE') {
        roundsLost++;
    } else if (roundResult === 'TIE') {
        roundsTied++;
    }

    // Update scoring text
    playerScore.textContent = roundsWon;
    computerScore.textContent = roundsLost;
    neutralScore.textContent = roundsTied;
    
    let totalRounds = roundsWon + roundsLost + roundsTied;

    if (roundsWon === roundsLost && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'STALEMATE'
        alert('STALEMATE!')
        return 'STALEMATE';
    } else if (roundsWon > roundsLost && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'WINNER!'
        alert('You Win! Congratulations!')
        return 'WINNER';
    } else if (roundsWon < roundsLost && (totalRounds === MAX_ROUNDS)) {
        gameFinished = true;
        roundText.textContent = 'LOSER!'
        alert('You Lose! Better luck next time!')
        return 'LOSER';
    }
}

function resetGame() {
    roundText.textContent = 'Press a button!';
    roundsWon = 0;
    roundsLost = 0;
    roundsTied = 0;
    gameFinished = false;
}

/* function playGame() {
    let roundsWon = 0;
    let roundsLost = 0;

    // Loop five times to count rounds won and lost
    for (let i = 0; i < 5; i++) {
        let roundResult;

        playerChoice = prompt('Input your choice (rock, paper, scissors)', 'rock');
        
        // Plays a single time to get a round result
        roundResult = playRound(playerChoice, computerChoice);

        // Increase either count depending on the round result
        if (roundResult === 'WIN') {
            roundsWon++;
        } else if (roundResult === 'LOSE') {
            roundsLost++;
        }
        
        console.log(`Rounds Won: ${roundsWon}`);
        console.log(`Rounds Lost: ${roundsLost}`);

        // Randomize computer choice after each round so computer choice is already known
        computerChoice = getComputerChoice();
    }

    // Compare rounds results to declare a winner of the game
    if (roundsWon === roundsLost) {
        console.log('Stalemate!');
        return 'STALEMATE';
    } else if (roundsWon > roundsLost) {
        console.log('You Win! Congratulations!');
        return 'WINNER';
    } else if (roundsWon < roundsLost) {
        console.log('You Lose! Better luck next time!');
        return 'LOSER';
    }
} */