// game script

//  get elements
var modal = document.getElementById("result-modal");
const result = document.querySelector('.result');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;

    // play game function
    function playGame () {
        // get buttons for player and computer options
        const playerOptions = Array.from(document.querySelectorAll('.options button'));
        const computerOptions = ['rock', 'paper', 'scissors'];

        // loop through player options to add event listeners
        playerOptions.forEach( (option) => {
            option.addEventListener('click', function() {
                // increment moves counter and display moves left
                moves++;
                const movesLeft = document.querySelector('.movesleft');
                movesLeft.innerText = `Moves Left: ${10 - moves}`;


                // get computer's choice
                const computerSelection = computerOptions[Math.floor(Math.random() * 3)];
                // Function to check who wins
                winner(this.innerText, computerSelection)

                // Calling gameOver function after 10 moves
                if(moves == 10){
                    gameOver(movesLeft);
                }
            });
        });
    }

    // determine winner function
    function winner(player, computer) {
        // get elements
        const message = document.querySelector('.result #message');
        const playerScoreBoard = document.querySelector('#p-score');
        const computerScoreBoard = document.querySelector('#c-score');
        player = player.toLowerCase();

        // For Tie, win or loose
        if(player === computer){
            message.innerHTML = `
            <h1 class="text-tie">Tie Game!<h1>
            `;
        } else if ((player === 'rock' && computer === 'scissors') ||
                    (player === 'paper' && computer === 'rock') ||
                    (player === 'scissors' && computer === 'paper')) {
                message.innerHTML = `
                    <h1 class="text-win">You win!</h1>
                    <p style="color: #444">${player.charAt(0).toUpperCase() + player.slice(1)} beats ${
                        computer.charAt(0).toUpperCase() + computer.slice(1)}</p>
                    `;
                playerScore++;
                playerScoreBoard.textContent = playerScore;
        } else {
            message.innerHTML = `
            <h1 class="text-loose">You loose!</h1>
            <p style="color: #444">${computer.charAt(0).toUpperCase() + computer.slice(1)} beats ${
                player.charAt(0).toUpperCase() + player.slice(1)
            }</p>
            `;
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }
        modal.style.display = 'block';
    }

    // game over function
    function gameOver(movesLeft) {
        const result = document.querySelector('.result #message');
        document.querySelector('.move').innerText = 'Game Over!!';
        final_scores = document.querySelector('.result #final-message')
        document.querySelector('.options').style.display = 'none';
        movesLeft.style.display = 'none';


        final_scores.style.color = '#444';
        final_scores.textContent = `Final Score: You (${playerScore}) vs Computer (${computerScore})`;

        // if player wins, loose  or tie 
        if(playerScore > computerScore) {
            result.style.fontSize = '2rem';
            result.style.color = '#308D46';
            result.innerHTML = `
                <p>You Won The Game! <i class="fa-solid fa-thumbs-up fa-flip" style="color: #1f513a;"></i></p> `;
        } else if (playerScore < computerScore) {
            result.innerHTML = `
            <p>You Lost The Game! <i class="fa-solid fa-thumbs-down fa-bounce" style="color: #cf0707;"></i></p> `;
            result.style.fontSize = '2rem';
            result.style.color = 'red';
        } else {
            result.innerHTML = `
            <p> Tie! <i class="fa-solid fa-handshake fa-bounce" style="color: #3a453c;"></i></p> `
            result.style.fontSize = '2rem';
            result.style.color = 'grey'
        }

        // play again/reload
        document.querySelector('.reload button').addEventListener('click', function() {
            location.reload();
        });

        modal.style.display = 'block';
    }

    // start game
    playGame();
}

// clear modal/result
window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
});
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// call game function
game();