'use strict';
// DOM
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const win0 = document.getElementById('win--0');
const win1 = document.getElementById('win--1');

let scores, currentScore, activePlayer, playing;

// initial condition for game
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  diceEL.classList.add('hidden');
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  playing = true;
  win0.classList.remove('win');
  win1.classList.remove('win');
  win0.textContent = '';
  win1.textContent = '';
};
init();

// switch player control
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
  console.log(` Active palyer ${activePlayer}`);
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore = currentScore + diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      console.log('players switched');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      document.getElementById(`win--${activePlayer}`).classList.add('win');
      document.getElementById(`win--${activePlayer}`).textContent =
        '🏆 Win This game 🏆';
      console.log(`player ${activePlayer} wins this game`);
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      console.log('player Switched');
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
console.log('New game button clicked');
