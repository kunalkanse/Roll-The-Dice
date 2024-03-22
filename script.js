'use strict'

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector(".dice")

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting consitions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");


let scores, currentScore, activePlayer, playing

function init() {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;

    // state of game
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0

    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');  // Will not be added if already present
    player1El.classList.remove('player--active');

}

init()

// rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);

        // 2. display dice
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`

        // 3. check for rolled 1: if true, switch to next player

        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch to next player
            // before switching
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score into active players score
        scores[activePlayer] += currentScore;
        // score[1] = score[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check score if atleast 100
        // if  >=100 , finish
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        // switch to the next player
        switchPlayer();
    }
})


// player Switching
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// new Game Reset
btnNew.addEventListener('click', init)