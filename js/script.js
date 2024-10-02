const MAX_ROUNDS = 6;
const container = document.querySelector('.container');
const roundText = document.querySelector('#round-result');
const playerScoreText = document.querySelector('#score-player');
const computerScoreText = document.querySelector('#score-computer');
const tiedScoreText = document.querySelector('#score-tied');
let computerScore = playerScore = tiedScore = 0;
let gameFinished = false;

// Returns the computer choice depending on a random number
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3 + 1);
    if (randomChoice === 1) return 'Rock';
    if (randomChoice === 2) return 'Paper';
    if (randomChoice === 3) return 'Scissors';
}
// Play a single round and return the result
function playRound(playerSelection, computerSelection) {
    // If both choices are the same declare a tie to end the round early
    if (playerSelection === computerSelection) return 'TIE';
    // Player choice is Rock
    if (playerSelection === 'Rock' && computerSelection === 'Scissors') return 'WIN';
    if (playerSelection === 'Rock' && computerSelection === 'Paper') return 'LOSE';
    // Player choice is Paper
    if (playerSelection === 'Paper' && computerSelection === 'Rock') return 'WIN';
    if (playerSelection === 'Paper' && computerSelection === 'Scissors') return 'LOSE';
    // Player choice is Scissors
    if (playerSelection === 'Scissors' && computerSelection === 'Paper') return 'WIN';
    if (playerSelection === 'Scissors' && computerSelection === 'Rock') return 'LOSE';
}
// Main game function, handle game status
function playGame(playerSelection) {
    if (gameFinished) {
        resetGame();
        return;
    }

    const computerSelection = getComputerChoice();
    let roundResult = playRound(playerSelection, computerSelection);
    if (roundResult === 'WIN') {
        playerScore++;
        roundText.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
    }
    if (roundResult === 'LOSE') {
        computerScore++;
        roundText.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
    if (roundResult === 'TIE') {
        tiedScore++;
        roundText.textContent = `Tie! Same choice (${playerSelection})`;
    }
    updateScore() // Input scores into UI text
    
    // Finish the game when maximum amount of rounds are played
    let totalRounds = playerScore + computerScore + tiedScore;
    if (totalRounds >= MAX_ROUNDS) {
        let finishingText;
        (playerScore === computerScore) ? finishingText = 'STALEMATE!' : undefined;
        (playerScore > computerScore) ? finishingText = 'WINNER!' : undefined;
        (playerScore < computerScore) ? finishingText = 'LOSER!' : undefined;
        roundText.textContent = finishingText;
        alert(finishingText); // Make it clear that the game ended
        gameFinished = true;
    }
}
// Update scoring text
function updateScore() {
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    tiedScoreText.textContent = tiedScore;
}
// Reset the game status to initial
function resetGame() {
    roundText.textContent = 'Press a button!';
    playerScore = computerScore = tiedScore = 0;
    updateScore();
    gameFinished = false;
}
// Listen to bubbling click to get the player choice
container.addEventListener('click', event => {
    event.stopPropagation();
    if (event.target.nodeName === 'BUTTON') {
        playGame(event.target.textContent);
    }
})