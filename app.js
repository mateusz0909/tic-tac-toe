const Player = (sign) => {
  let name = sign;
  let score = [];
  const move = (position) => {
    score.push(position);
  };
  const getScore = () => score;
  const getName = () => name;
  const kill = () => {
    score = [];
  };
  return { getName, getScore, move, kill };
};

const playerX = Player("X");
const playerO = Player("O");

const gameBoard = (() => {
  let round = 0;
  let winnerCombination = [
    [1, 5, 9],
    [3, 5, 7],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];
  const restart = () => {
    playerO.kill();
    playerX.kill();
    cells.forEach((element) => {
      element.textContent = "";
    });
    round = 0;
    message.innerHTML = "";
    cells.forEach((element) => {
      element.addEventListener("click", play);
    });
    displayPlayerTurn();
  };
  const cells = document.querySelectorAll("td");
  const restartBtn = document.querySelector("button");
  const message = document.querySelector(".message");
  let playerName = playerO;
  restartBtn.addEventListener("click", restart);

  const checkWinner = () => {
    winnerCombination.forEach((e) => {
      if (e.every((i) => playerName.getScore().includes(i))) {
        const winnerMessage = `<h3>Player ${playerName.getName()} won in the ${round} round!</h3>`;

        message.innerHTML = winnerMessage;
        cells.forEach((element) => {
          element.removeEventListener("click", play);
        });
      }
    });
  };

  const displayPlayerTurn = () => {
    const currentPlayerMessage =
      playerName.getName() === "X" ? `<h3>Turn: O</h3>` : `<h3>Turn: X</h3>`;
    message.innerHTML = currentPlayerMessage;
  };

  const play = (e) => {
    if (!e.target.textContent) {
      playerName !== playerO ? (playerName = playerO) : (playerName = playerX);
      e.target.textContent = playerName.getName();
      playerName.move(parseInt(e.target.id, 10));
      round++;
      displayPlayerTurn();
      checkWinner();
    } else {
      alert("No, no, no!");
    }
  };
  cells.forEach((element) => {
    element.addEventListener("click", play);
  });

  return { displayPlayerTurn };
})();

window.addEventListener("load", gameBoard.displayPlayerTurn);
