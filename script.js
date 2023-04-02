

const gameContainer = document.querySelector('.game-container'),
      playerScoreEl = document.querySelector('#playerScore'),
      playerChoiceEl = document.querySelector('#playerChoice'),
      computerScoreEl = document.querySelector('#computerScore'),
      computerChoiceEl = document.querySelector('#computerChoice'),
      resultText = document.querySelector('#resultText');

  const playerGameIcons = document.querySelectorAll('.player'),
        compGameIcons = document.querySelectorAll('.comp'),
        reset = document.querySelector('.reset-icon');

        
  const playerContainer = document.querySelector('.player-container');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '',
    playerChoice = '',    
    playerScoreNumber = 0,
    computerScoreNumber = 0;

const round = 10;

function resetSelected() {
  playerGameIcons.forEach(icon => {
    icon.classList.remove('selected');
  })

  compGameIcons.forEach(icon => {
    icon.classList.remove('computed');
  })
}

// reset score
function resetAll(){
  resetSelected();
  resultText.textContent = '';
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  playerScoreEl.textContent = playerScoreNumber;
  computerChoiceEl.textContent = '';
  playerChoiceEl.textContent = '';
  document.body.style.background = 'rgb(224, 255, 243)';
  playerGameIcons.forEach(icon => {
    icon.addEventListener('click', select)
  })
}


function computerRandomChoice() {

  const computerChoiceNumber = Math.floor(Math.random() * 5);
  computerChoice = computerChoiceNumber;
  
  compGameIcons.forEach((icon, i) => {
   if(computerChoiceNumber === i){
    icon.classList.add('computed');
       let name = icon.getAttribute('name');
       computerChoiceEl.textContent = ` --- ${name}`;
       computerChoice = name;
   }
 })
 
}

function select(e) {
  let target = e.target;
  
  resetSelected();
  
  if (target.classList.contains('player')) {
    target.classList.add('selected');
    let name = target.getAttribute('name');
    playerChoiceEl.textContent = ` --- ${name}`;
    playerChoice = name;
    computerRandomChoice();
    }
   checkResult();

}

function updateScore(){
if(playerChoice === computerChoice){
  resultText.textContent = "It's a tie!"
} else {
  const choice = choices[playerChoice];
  if(choice.defeats.indexOf(computerChoice) > -1){
    resultText.textContent = "You Won!";
    playerScoreNumber++;
    playerScoreEl.textContent = playerScoreNumber;
  } else {
    resultText.textContent = "Oops, You Lost!";
    computerScoreNumber++;
    computerScoreEl.textContent = computerScoreNumber;
  }

  if(playerScoreNumber >= round && computerScoreNumber < round){
    document.body.style.background = 'rgb(131, 238, 0)';
    resultText.style.color = 'rgb(131, 238, 0)';
  } else if (playerScoreNumber < round && computerScoreNumber >= round){
    document.body.style.background = 'blueviolet';
    resultText.style.color = 'blueviolet';
  }

  if(playerScoreNumber === round || computerScoreNumber === round){
    playerGameIcons.forEach(icon => {
      icon.removeEventListener('click', select)
    })
  }
}}

function checkResult(playerChoice) {
  
    updateScore(playerChoice)

}


reset.addEventListener('click', resetAll);

resetAll();



