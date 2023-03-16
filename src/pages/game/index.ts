import { state } from "../../state";

export function initGame(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  div.classList.add("game-container");

  let counter = 3;
  const countdown = setInterval(() => {
    counter--;

    const counterEl = div.querySelector(".counterEl") as any;
    counterEl.textContent = String(counter);

    if (counter < 0) {
      clearInterval(countdown);
      params.goTo("/instructions");
    }
  }, 1000);
  console.log(div);
  div.innerHTML = `
    <div class="pc-hands-container">
      <hand-rock-el class="pc-rock-hand"></hand-rock-el>  
      <hand-paper-el class="pc-paper-hand"></hand-paper-el>
      <hand-scissors-el class="pc-scissors-hand"></hand-scissors-el>
    </div>
    
    <div class="counterEl">${counter}</div>

    <div class="player-hands-container">
        <hand-rock-el class="player-rock-hand"></hand-rock-el>  
        <hand-paper-el class="player-paper-hand"></hand-paper-el>
        <hand-scissors-el class="player-scissors-hand"></hand-scissors-el>
    </div>
    `;
  style.innerHTML = `
    .game-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content:space-between;
        height: 100vh;
    }

    .pc-hands-container{
        transform: rotate(180deg);
        display:flex;
        justify-content: space-evenly;
        visibility:hidden;
        width:100%;

    }

    .counterEl{
        font-weight: bold;
        font-family: "Odibee Sans";
        font-size: 100px;
    }
    @media(min-width: 768px){
      .counterEl{
        font-size:150px;
      }
    }

    .player-hands-container{
        display:flex;
        justify-content: space-evenly;
        width: 100%;
        margin-bottom:10px;
    }
    @media(min-width: 768px){
      .player-paper-hand, .player-rock-hand, .player-scissors-hand{
        flex-grow:0.05;
      }
    }              

    .disabled{
        display:none;
    }

    .enabled{ 
        display:block;
        visibility:visible;
        opacity:100%;
        transition: all 0.6s;
        flex-grow: 0.06;
        margin-bottom:100px;
    }
    
    .computer-selection{
        display:flex;
        visibility:visible;
        margin-top: 100px;
        flex-grow: 0.05;
        transition: all 0.6s;
    }
    `;

  const count = div.querySelector(".counterEl") as Element;

  const playerMoves = div.querySelector<any>(
    ".player-hands-container"
  ).children;

  const playerRock = div.querySelector(".player-rock-hand") as Element;
  const playerPaper = div.querySelector(".player-paper-hand") as Element;
  const playerScissors = div.querySelector(".player-scissors-hand") as Element;

  const pcMovesCont = div.querySelector(".pc-hands-container") as Element;
  const pcRock = div.querySelector(".pc-rock-hand") as Element;
  const pcPaper = div.querySelector(".pc-paper-hand") as Element;
  const pcScissors = div.querySelector(".pc-scissors-hand") as Element;

  for (const p of playerMoves) {
    p.addEventListener("click", () => {
      const type = p.getAttribute("class");
      clearInterval(countdown);

      if (type == "player-rock-hand") {
        state.setMoves("piedra");
        activePlay("piedra");
      } else if (type == "player-paper-hand") {
        state.setMoves("papel");
        activePlay("papel");
      } else if (type == "player-scissors-hand") {
        state.setMoves("tijeras");
        activePlay("tijeras");
      }
    });
  }

  function activePlay(move) {
    count.classList.add("disabled");
    for (const p of playerMoves) {
      p.classList.add("disabled");
    }
    if (move == "piedra") {
      playerRock.classList.remove("disabled");
      playerRock.classList.add("enabled");
      setTimeout(() => {
        playerPaper.classList.add("disabled");
        playerScissors.classList.add("disabled");
      }, 1500);
    } else if (move == "papel") {
      playerPaper.classList.remove("disabled");
      playerPaper.classList.add("enabled");
      setTimeout(() => {
        playerRock.classList.add("disabled");
        playerScissors.classList.add("disabled");
      }, 1500);
    } else if (move == "tijeras") {
      playerScissors.classList.remove("disabled");
      playerScissors.classList.add("enabled");
      setTimeout(() => {
        playerRock.classList.add("disabled");
        playerPaper.classList.add("disabled");
      }, 1500);
    }

    setTimeout(() => {
      const pcMove = state.getState().currentPlay.computerPlay;

      pcMovesCont.classList.add("computer-selection");

      if (pcMove == "piedra") {
        pcRock.classList.add("computer-selection");
        pcPaper.classList.add("disabled");
        pcScissors.classList.add("disabled");
      } else if (pcMove == "papel") {
        pcPaper.classList.add("computer-selection");
        pcRock.classList.add("disabled");
        pcScissors.classList.add("disabled");
      } else if (pcMove == "tijeras") {
        pcScissors.classList.add("computer-selection");
        pcRock.classList.add("disabled");
        pcPaper.classList.add("disabled");
      }

      setTimeout(() => {
        params.goTo("/results");
      }, 2000);
    });
  }

  div.appendChild(style);
  return div;
}
