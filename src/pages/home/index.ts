const imgTitle = require("url:../../../src/assets/home-title.png");

export function initHome(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  div.classList.add("home-container");

  div.innerHTML = `  
      <img src="${imgTitle}" class="img-title">
        <button-el class ="button-start">Comenzar</button-el>
          <div class="hands-container">
            <hand-rock-el class="hand-rock"></hand-rock-el>  
            <hand-paper-el class="hand-paper"></hand-paper-el>
            <hand-scissors-el class="hand-scissors"></hand-scissors-el>
          </div>
    `;

  style.innerHTML = `
    .home-container{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content:space-between;
      width: 100%;
      height:100vh;
    }

    .img-title{
      width: 284px;
      margin-top:100px;
    }
    @media(min-width:768px){
      .img-title{
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
      .hand-paper, .hand-rock, .hand-scissors{
      flex-grow:0.05;
      }
  } 
  `;
  const button = div.querySelector(".button-start") as any;
  button.addEventListener("click", () => {
    params.goTo("/instructions");
  });
  div.appendChild(style);
  return div;
}
