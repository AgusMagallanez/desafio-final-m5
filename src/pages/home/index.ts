const imgTitle = require("url:../../../src/assets/home-title.svg");

export function initHome(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = `
  <h1>Hola</h1>    
  <img class="img-title">${imgTitle}</img>
      <button-el class ="button-el">Comenzar</button-el>
    `;

  style.innerHTML = `
    .img-title{
      width:300px;
    }
  `;
  const button = div.querySelector(".button-el") as any;
  button.addEventListener("click", () => {
    params.goTo("/instructions");
  });
  div.appendChild(style);
  return div;
}
