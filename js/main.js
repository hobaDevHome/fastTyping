window.addEventListener('load', init);

//Load More Words
function load_more_words() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      words = xmlhttp.responseText.split('\n');
    }
  };
  xmlhttp.open('GET', 'words.txt', true);
  xmlhttp.send();
}

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1,
};

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
const howhard = document.querySelector('#dropdown');
const reset = document.querySelector('#reset');
const start = document.querySelector('#start');

var words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'champion',
  'ghost',
  'fierce',
];

// get hard level
howhard.addEventListener('click', function (e) {
  let level = e.target.innerText;
  if (levels[level] !== undefined) {
    currentLevel = levels[level];
    seconds.innerHTML = currentLevel;
  }
});

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // Highscore based on score value for Session Storage
  if (
    typeof sessionStorage['highscore'] === 'undefined' ||
    score > sessionStorage['highscore']
  ) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}

// reset game
reset.addEventListener('click', function (e) {
  isPlaying = false;
  score = 0;
  message.innerHTML = '';
  showWord(words);
  time = currentLevel;
  timeDisplay.innerHTML = time;
});

// start game
start.addEventListener('click', function (e) {
  isPlaying = true;
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
  // setTimeout(load_more_words(), 1000);
});
