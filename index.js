const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('.start');

let timeUp;
let score = 0;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomeHole = () => {
  let lastHole;
  const idx = getRandomNumber(0, holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return getRandomeHole(holes);
  }
  lastHole = hole;
  return hole;
};

const moleUp = () => {
  const time = getRandomNumber(400, 1000);
  const hole = getRandomeHole();
  hole.classList.toggle('up');
  setTimeout(() => {
    hole.classList.toggle('up');
    if (!timeUp) moleUp();
  }, time);
};

// По условию задачи, сохраняем значения в localStore
const saveScore = () => {
  let arr = [];
  arr = JSON.parse(localStorage.getItem('arr')) || [];
  arr.push(score);
  localStorage.setItem('arr', JSON.stringify(arr));
};

const startGame = () => {
  let scoreReset = 0;
  const gameTime = 10000;
  scoreBoard.textContent = scoreReset;
  score = scoreReset;
  timeUp = false;
  moleUp();
  setTimeout(() => {
    timeUp = true;
    saveScore();
  }, gameTime);
  start.textContent = 'Restart';
};

const bonk = () => {
  const gameBlock = document.querySelector('.game');
  gameBlock.addEventListener('click', (event) => {
    if (event.target.classList.contains('mole')) {
      score++;
      scoreBoard.textContent = score;
    }
  });
};

bonk();

start.addEventListener('click', startGame);
