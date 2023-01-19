const rock = require("url:../../../src/assets/piedra.png");
customElements.define(
  "hand-rock-el",
  class Rock extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.shadow.innerHTML = `
        <img class="rock" src="${rock}">
      `;

      style.innerHTML = `
          .rock{
            width:100%;
            height:100%;
          }
          @media(min-width:768px){
            .rock{
              width:120%;
              height:120%;
            }
        }
      `;
      this.shadow.appendChild(style);
    }
  }
);
