const paper = require("url:../../../src/assets/papel.png");
customElements.define(
  "hand-paper-el",
  class Paper extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.shadow.innerHTML = `
        <img class="paper" src="${paper}">
      `;

      style.innerHTML = `
      .paper{
        width:100%;
        height:100%;
      }
      @media(min-width:768px){
        .paper{
          width:120%;
          height:120%;
        }
      }
    `;
      this.shadow.appendChild(style);
    }
  }
);
