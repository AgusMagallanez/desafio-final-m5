const imgInstructions = require("url:../../../src/assets/instructions.png");

export function initInstructions(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  div.classList.add("instructions-container");

  div.innerHTML = `
        <img src="${imgInstructions}" class="img-instructions">
            <button-el class ="button-play">¡Jugar!</button-el>
                <div class="hands-container">
                    <hand-rock-el class="rock-hand"></hand-rock-el>  
                    <hand-paper-el class="paper-hand"></hand-paper-el>
                    <hand-scissors-el class="scissors-hand"></hand-scissors-el>
                </div>

    `;

  style.innerHTML = `
        
        .instructions-container{
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content:space-between;
            width: 100%;
            height:100vh;
        }

        .img-instructions{
            width: 284px;
            margin-top:100px;
        }
        @media(min-width:768px){
            .img-instructions{
                width:420px;
            }
        }

        .hands-container{
            display:flex;
            justify-content: space-evenly;
            width: 100%;
            margin-bottom:10px;
        }
        @media(min-width:768px){
            .hands-container{
                margin-bottom:20px;
            }
        }
        
        @media(min-width: 768px){
            .paper-hand, .rock-hand, .scissors-hand{
            flex-grow:0.05;
            }
        } 
    `;

  const button = div.querySelector(".button-play") as any;
  button.addEventListener("click", () => {
    params.goTo("/game");
  });
  div.appendChild(style);
  return div;
}
