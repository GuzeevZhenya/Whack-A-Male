const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('.start');
let lastHole;
let timeUp;
let score = 0;
let arr = [];

function randomTime(min, max) {
  return Math.random() * (max - min) + min;
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function countScore() {
  arr = JSON.parse(localStorage.getItem('arr')) || [];
  arr.push(score);
  localStorage.setItem('arr', JSON.stringify(arr));
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;

  score = 0;
  peep();
  setTimeout(() => {
    (timeUp = true), countScore();
	}, 10000);
	start.textContent = 'Restart'
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
start.addEventListener('click', startGame);
