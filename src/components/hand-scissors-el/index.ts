const scissors = require("url:../../../src/assets/tijera.png");
customElements.define(
  "hand-scissors-el",
  class Scissors extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.shadow.innerHTML = `
        <img class="scissors" src="${scissors}">
      `;

      style.innerHTML = `
        .scissors{
          width:100%;
          height:100%;
        }
        @media(min-width:768px){
          .scissors{
            width:120%;
            height:120%;
          }
        }
      `;
      this.shadow.appendChild(style);
    }
  }
);
