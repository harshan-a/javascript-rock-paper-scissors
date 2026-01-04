let autoPlayStatus = false;
let setIntervalId;

function autoPlay() {

  document.querySelector('.js-resetConformation').innerHTML = '';

  if(!autoPlayStatus){
    setIntervalId = setInterval(() => {
      const mypick = pickComputerMove();
      playgame(mypick);
      document.querySelector('.autoplay-btn').innerHTML = 'Stop Play';
    }, 1000);

    autoPlayStatus = true;

  } else {
    clearInterval(setIntervalId);
    document.querySelector('.autoplay-btn').innerHTML = 'Auto Play';
    autoPlayStatus = false;
  }
}


document.querySelector('.js-rock-btn')
  .addEventListener('click', () => { playgame('rock'); }); //curly braces are optioal if body of the function is in one line.

document.querySelector('.js-paper-btn')
  .addEventListener('click', () => playgame('paper') );

document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => playgame('scissors') );

document.querySelector('.js-autoPlay-btn')
  .addEventListener('click', () => autoPlay() );


const resetFunction = () => {
  score.wins = 0;
  score.lose = 0;
  score.tie = 0 ;
  localStorage.removeItem('score');
  updateScore();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
};

function resetConformation() {
  const resetConformElem = document.querySelector('.js-resetConformation');

  if(!autoPlayStatus){
    resetConformElem.innerHTML = `
      <p>
        Are you sure you want to reset the score?
        <button class="reset-yes-btn reset-btn">
          Yes
        </button>
        <button class="reset-no-btn reset-btn">
          No
        </button>
      </p>`;

    resetConformElem.classList.remove('reset-error');

  } else {
    resetConformElem.innerHTML = `Turn Off AutoPlay or Press 'a'`;
    resetConformElem.classList.add('reset-error');
  }

  document.querySelector('.reset-yes-btn')
    .addEventListener('click', () => {
      resetFunction();
      resetConformElem.innerHTML = '';
    });
  
  document.querySelector('.reset-no-btn')
    .addEventListener('click', () => {
      resetConformElem.innerHTML = '';
    });

  // document.body.addEventListener('keydown', (event) => {
  //   if(event.key === 'y' || event.key === 'Y'){
  //     resetFunction();
  //     resetConformElem.innerHTML = '';

  //   } else if(event.key === 'n' || event.key === 'N'){
  //     resetConformElem.innerHTML = '';
  //   }
  // }); 
  // the above code will work even before activate the reset score button.
}

document.querySelector('.js-reset-btn')
  .addEventListener('click', resetConformation);


document.body.addEventListener('keydown', (event) => {

  if(event.key === 'r' || event.key === 'R') {
    playgame('rock');

  } else if(event.key === 'p' || event.key === 'P') {
    playgame('paper');

  } else if(event.key === 's'|| event.key === 'S') {
    playgame('scissors');

  } else if(event.key === 'a' || event.key === 'A') {
    autoPlay();

  } else if(event.key === 'Backspace') {
    resetConformation();
  }

});


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove  = 'paper';
  }else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove  = 'scissors';
  }
  return computerMove;
}

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    lose: 0,
    tie:0 
  };

function updateScore(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.lose}, Ties: ${score.tie}`;
}  

updateScore();

function playgame(myPick) {
  const computerMove = pickComputerMove();
  let result = '';

  if (myPick === 'rock') {
    if(computerMove === 'rock'){
      result = 'Tie';
    }else if (computerMove === 'paper') {
      result = 'You lose';
    }else if (computerMove === 'scissors') {
      result = 'You win';
    }

  }else if (myPick === 'paper') {
    if(computerMove === 'rock'){
      result = 'You win';
    }else if (computerMove === 'paper') {
      result = 'Tie';
    }else if (computerMove === 'scissors') {
      result = 'You lose';
    }

  }else if (myPick === 'scissors') {
    if(computerMove === 'rock'){
      result = 'You lose';
    }else if (computerMove === 'paper') {
      result = 'You win';
    }else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  }else if (result === 'You lose') {
    score.lose += 1;
  }else if (result === 'Tie') {
    score.tie += 1;
  }

  localStorage.setItem('score' , JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result + '.';
  document.querySelector('.js-moves').innerHTML = `You <img src="./images/${myPick}-emoji.png" class="move-img"> <img src="./images/${computerMove}-emoji.png" class="move-img"> Computer`;

  updateScore();

  document.querySelector('.js-resetConformation').innerHTML = '';


  /*
  alert(`You picked ${myPick}. Computer picked ${computerMove}. ${result}.
Wins: ${score.wins}, Losses: ${score.lose}, Ties: ${score.tie}`)
  */

}