customElements.define(
  "button-el",
  class Button extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const button = document.createElement("button");
      const style = document.createElement("style");
      button.className = "button-el";

      style.innerHTML = `
                    .button-el {
                        color: #FFF;
                        width:300px;
                        height:90px;
                        border: solid 10px 
                        border-radius:10px;
                    }
                    `;

      button.textContent = this.textContent;
      this.shadow.appendChild(button);
      this.shadow.appendChild(style);
    }
  }
);
