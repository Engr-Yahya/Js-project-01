const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();
/*
if (!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/
let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoplay')
 .addEventListener('click', () => {
  autoPlay();
 });

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove) 
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-autoplay')
      .innerHTML = 'Stop Playing...'
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay')
      .innerHTML = 'Auto Play';
  }
  
}

document.querySelector('.js-rock-btn')
 .addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-btn')
 .addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissor-btn')
 .addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame ('Rock');
  } else if (event.key === 'p') {
    playGame ('Paper');
  } else if (event.key === 's') {
    playGame ('Scissors');
  }
});
function playGame (playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Scissors') {
        if (computerMove === 'Rock'){
            result = 'You Lose';
        }else if (computerMove === 'Paper'){
            result = 'You Win';
        }else if (computerMove === 'Scissors'){
            result = 'Tie';
        }
    } else if (playerMove === 'Paper') {
         if (computerMove === 'Rock'){
            result = 'You Win';
        }else if (computerMove === 'Paper'){
            result = 'Tie';
        }else if (computerMove === 'Scissors'){
            result = 'You Lose';
        }
    } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock'){
            result = 'Tie';
        }else if (computerMove === 'Paper'){
            result = 'You Lose';
        }else if (computerMove === 'Scissors'){
            result = 'You Win';
        }
    }
  if(result === 'You Win') {
    score.wins += 1;
  }else if (result === 'You Lose') {
    score.losses += 1;
  }else if (result === 'Tie') {
    score.ties += 1;
  }
  localStorage.setItem('score',JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result')
   .innerHTML = result;
  document.querySelector ('.js-move')
   .innerHTML = `You 
<img class="move-icon" src ="Rock Paper Scissors_files/${playerMove}-emoji.png"> 
<img class="move-icon" src ="Rock Paper Scissors_files/${computerMove}-emoji.png">
Computer`; 
}
function updateScoreElement () {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;
}
function pickComputerMove (){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'Rock';
  }else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove ='Paper';
  } else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }
  return computerMove;
}
