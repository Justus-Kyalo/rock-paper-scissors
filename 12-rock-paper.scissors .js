//removing item from local storage in the reset button will cause the game to have a  null score hence the need to set a default score {wins:0,ties:0,loses:0}
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

updateScoreElement();

// if(score===null){
//   score = {wins:0,ties:0,loses:0};
// }
// if(!score){
//   score = {wins:0,ties:0,loses:0};
// }
document.querySelector(".reset-button").addEventListener("click", () => {
  const userConfirmation = window.confirm(
    "Are you sure you want to reset the scores?"
  );
  if (userConfirmation) {
    document.querySelector(".reset-button").addEventListener("click", () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem("score");
      updateScoreElement();
    });
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem("score");
    updateScoreElement();
  }
});
document.body.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    autoplay();

    if (currentMode === "Stop Playing") {
      currentMode = "Auto Play";
    } else {
      currentMode = "Stop Playing";
    }

    autoPlayMode.innerHTML = currentMode;
  }
});

let isAutoplaying = true;
let intervalId;
function autoplay() {
  if (isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = computerMovePicked();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = false;
  } else {
    clearInterval(intervalId);
    isAutoplaying = true;
  }
}

let autoPlayMode = document.querySelector(".auto-play-button");
let currentMode = "Auto Play";
autoPlayMode.addEventListener("click", () => {
  autoplay();

  if (currentMode === "Stop Playing") {
    currentMode = "Auto Play";
  } else {
    currentMode = "Stop Playing";
  }

  autoPlayMode.innerHTML = currentMode;
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    playGame("rock");
  } else if (e.key === "p") {
    playGame("paper");
  } else if (e.key === "s") {
    playGame("scissors");
  }
});
function playGame(playerMove) {
  updateScoreElement();
  let computerChoice = computerMovePicked();
  let result = "";

  //the clicked button by player and the computerMove are the values we compare to see if a player won but we must first set the condition to declare the currently playing playerMove.
  if (playerMove === "rock") {
    if (computerChoice === "rock") {
      result = "Tie";
    } else if (computerChoice === "paper") {
      result = "you lose";
    } else if (computerChoice === "scissors") {
      result = "you win";
    }
  } else if (playerMove === "paper") {
    if (computerChoice === "rock") {
      result = "you win";
    } else if (computerChoice === "scissors") {
      result = "you lose";
    } else if (computerChoice === "paper") {
      result = "Tie";
    }
  } else if (playerMove === "scissors") {
    if (computerChoice === "paper") {
      result = "you win";
    } else if (computerChoice === "scissors") {
      result = "Tie";
    } else if (computerChoice === "rock") {
      result = "you lose";
    }
  }

  if (result === "you win") {
    score.wins += 1;
  } else if (result === "you lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerText = ` ${result}`;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img class="img-icon" src="rock_files/${playerMove}-emoji.png" alt="" />
  <img class="img-icon" src="rock_files/${computerChoice}-emoji.png" alt="" />Computer`;

  console.log(result);
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerText = `wins:${score.wins} ,losses:${score.losses}, ties:${score.ties}`;
}
function computerMovePicked() {
  let randomNumber = Math.random();
  console.log(randomNumber);
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
