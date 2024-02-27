let computerChoice = getComputerChoice();
let playerChoice = 'rock';

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3 + 1);
    
    // Returns a choice depending on a number from 1 to 3
    if (randomNumber === 1) {
        console.log('Computer: Rock');
        return 'Rock';
    } else if (randomNumber === 2) {
        console.log('Computer: Paper');
        return 'Paper';
    } else if (randomNumber === 3) {
        console.log('Computer: Scissors');
        return 'Scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    // If both choices are the same declare a tie
    if (playerSelection === computerSelection) {
        console.log('Tie! Same choice');
        return 'TIE';
    }

    // Player choice is Rock
    if (playerSelection === 'ROCK' && computerSelection === 'PAPER') {
        console.log('You Lose! Paper beats Rock');
        return 'LOSE';
    } else if (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') {
        console.log('You Win! Rock beats Scissors');
        return 'WIN';
    }

    // Player choice is Paper
    if (playerSelection === 'PAPER' && computerSelection === 'ROCK') {
        console.log('You Win! Paper beats Rock');
        return 'WIN';
    } else if (playerSelection === 'PAPER' && computerSelection === 'SCISSORS') {
        console.log('You Lose! Scissors beats Paper');
        return 'LOSE';
    }

    // Player choice is Scissors
    if (playerSelection === 'SCISSORS' && computerSelection === 'ROCK') {
        console.log('You Lose! Rock beats Scissors');
        return 'LOSE';
    } else if (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') {
        console.log('You Win! Scissors beats Paper');
        return 'WIN';
    }
}

function playGame() {
    let roundsWon = 0;
    let roundsLost = 0;

    // Loop five times and count rounds won and lost
    for (let i = 0; i < 5; i++) {
        let roundResult;

        playerChoice = prompt('Input your choice (rock, paper, scissors)', 'rock');
        
        // Plays a round and returns a string with the result
        roundResult = playRound(playerChoice, computerChoice);

        // Increase each count depending on the round result
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

    // Decide game result by comparing rounds won and lost by the player
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
}