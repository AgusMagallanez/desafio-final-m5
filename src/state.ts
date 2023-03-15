type Move = "piedra" | "papel" | "tijeras";

const state = {
  data: {
    currentPlay: {
      myPlay: "",
      computerPlay: "",
    },
    historyScore: {
      player: 0,
      computer: 0,
      result: "",
    },
  },

  init() {
    const localData = JSON.parse(localStorage.getItem("saved-game") as any);
    if (!localData) {
      return;
    } else {
      this.setState(localData);
    }
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    localStorage.setItem("saved-game", JSON.stringify(newState));
  },

  randomCpuMove() {
    const move = ["piedra", "papel", "tijeras"];
    const randomChoice = Math.floor(Math.random() * 3);
    return move[randomChoice];
  },

  setMoves(move: Move) {
    const currentState = this.getState();
    const cpuMoves = this.randomCpuMove();

    currentState.currentPlay.myPlay = move;
    currentState.currentPlay.computerPlay = cpuMoves;

    this.whoWins(move, cpuMoves);
  },

  whoWins(myplay: Move, computerplay: Move) {
    const empate = [
      myplay == "piedra" && computerplay == "piedra",
      myplay == "papel" && computerplay == "papel",
      myplay == "tijeras" && computerplay == "tijeras",
    ];

    const victoria = [
      myplay == "piedra" && computerplay == "tijeras",
      myplay == "papel" && computerplay == "piedra",
      myplay == "tijeras" && computerplay == "papel",
    ];

    if (victoria.includes(true)) {
      return this.pushToHistory("win");
    } else if (empate.includes(true)) {
      return this.pushToHistory("tie");
    } else {
      return this.pushToHistory("loose");
    }
  },
  pushToHistory(result) {
    const currentStateData = this.getState();
    const playerScore = currentStateData.historyScore.player;
    const computerScore = currentStateData.historyScore.computer;

    if (result == "win") {
      this.setState({
        ...currentStateData,
        historyScore: {
          player: playerScore + 1,
          computer: computerScore,
          result: "win",
        },
      });
    } else if (result == "loose") {
      this.setState({
        ...currentStateData,
        historyScore: {
          player: playerScore,
          computer: computerScore + 1,
          result: "loose",
        },
      });
    } else if (result == "tie") {
      this.setState({
        ...currentStateData,
        historyScore: {
          player: playerScore,
          computer: computerScore,
          result: "tie",
        },
      });
    }
    this.saveScore();
  },

  saveScore() {
    const currentStateData = this.getState().historyScore;
    localStorage.setItem("scoreData", JSON.stringify(currentStateData));
  },
};
export { state };
