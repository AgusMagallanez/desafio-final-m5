import { state } from "../../state";

export function initResults(params) {
  const div = document.createElement("div");
  div.classList.add("results-container");
  const style = document.createElement("style");

  const tieStar = require("url:../../../src/assets/resultado-empate.png");
  const winStar = require("url:../../../src/assets/resultado-ganaste.png");
  const looseStar = require("url:../../../src/assets/resultado-perdiste.png");

  const currentState = state.getState();
  const playerScore = currentState.historyScore.player;
  const computerScore = currentState.historyScore.computer;

  div.innerHTML = `  
    <img class="tie-img" src="${tieStar}">
    <img class="win-img" src="${winStar}">
    <img class="loose-img" src="${looseStar}">

    <div class="score-board">
      <h2 class="score-board-title">Score</h2>
      <h4 class="player-score">Jugador: ${playerScore}</h4>
      <h4 class="computer-score">CPU: ${computerScore}</h4>
      </div>

    <div class="score-buttons-container">
      <button-el class ="button-play">Volver a jugar</button-el>
      <button-el class ="button-restart">Reiniciar Puntajes</button-el>
    </div>

  `;

  style.innerHTML = `
    .results-container{
      display:flex;
      flex-direction:column;
      align-items:center;
    }

    .tie-img{
      display:none;
      height:200px;
    }

    .win-img{
      display:none;
      height:200px;
    }

    .loose-img{
      display:none;
      height:200px;
    }

    .score-board{
      height:200px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      margin:20px;
      width: 259px;
      height: 217px;
      background: #FFFFFF;
      border: 10px solid #000000;
      border-radius: 10px;
      font-family: 'Odibee Sans';
    }

    .score-board-title{
      margin:0;
      text-align:center;
      font-size:55px;

    }

    .player-score , .computer-score{
      margin: 5px 10px;
      font-size:45px;
    }

    .score-buttons-container{
      display:flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin:10px;
    }

  `;

  const result = currentState.historyScore.result;
  const tieImg = div.querySelector(".tie-img") as HTMLElement;
  const winImg = div.querySelector(".win-img") as HTMLElement;
  const looseImg = div.querySelector(".loose-img") as HTMLElement;

  if (result == "tie") {
    tieImg.style.display = "flex";
  } else if (result == "win") {
    winImg.style.display = "flex";
  } else if (result == "loose") {
    looseImg.style.display = "flex";
  }

  const buttonPlay = div.querySelector(".button-play") as any;
  buttonPlay.addEventListener("click", () => {
    params.goTo("/instructions");
  });

  const buttonReset = div.querySelector(".button-restart") as any;
  buttonReset.addEventListener("click", () => {
    state.setState({
      ...currentState,
      historyScore: {
        player: 0,
        computer: 0,
        result: "",
      },
    });
    params.goTo("/home");
  });

  div.appendChild(style);
  return div;
}
