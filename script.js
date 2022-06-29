'use strict';

const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--1');

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.getElementById('close-modal');

// STARTING CONDITIONS
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1El.textContent = 0;
    score2El.textContent = 0;
    current1El.textContent = 0;
    current2El.textContent = 0;

    diceEl.classList.add('hidden');

    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
};
init();

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
    current1El.classList.toggle('hidden');
    current2El.classList.toggle('hidden');

    // inhibit playerX from taking playerY's turn
    btnRoll.removeEventListener('click', rollFxn);
    setTimeout(() => {
        roll();
    }, 900);
};

// #ACTION!!!
btnNew.addEventListener('click', function () {
    current1El.classList.remove('hidden');
    current2El.classList.add('hidden');
    init();
});

const roll = () => btnRoll.addEventListener('click', rollFxn);
roll();

function rollFxn() {
    if (playing) {
        let ranNum = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${ranNum}.png`;
        if (ranNum !== 1) {
            currentScore += ranNum;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
}

const hold = () => btnHold.addEventListener('click', holdFxn);
hold();

function holdFxn() {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // Check win condition
        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
            // inhibit playerX from activating the hold btn a 2nd time to skip playerY's turn
            btnHold.removeEventListener('click', holdFxn);
            setTimeout(() => {
                hold();
            }, 1000);
        }
    }
}

// RULES
// add open on pg load
btnRules.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keyup', function (esc) {
    if (esc.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// (look into using Classes for this app in free time)
