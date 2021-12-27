customElements.define("button-component", class extends HTMLElement {
    text;
    color;
    type = "submit";
    connectedCallback() {
        this.text = this.textContent;
        this.color = this.getAttribute("color");
        this.type = this.getAttribute("type");
        this.render();
    }
    render() {
        const style = document.createElement("style");
        style.innerHTML = `
          *{
              box-sizing:border-box;
          }
          body{
              margin:0;
          }
          .container-button{
              display:flex;
              justify-content:center;
              align-items:center;
          }
          .button{
              background-color: #0059ff;
              width:335px;
              height:50px;
              border:#ffff;
              border-radius:4px;
              font-size:20px;
              font-weight:700;
              font-family: 'Poppins', sans-serif;
              color:#fff;
              transition: 0.5s;
              cursor: pointer;
          }
          .button:hover{
            background-color: #ffffff;
            color:  #0059ff;
            border: 1px solid #0059ff;
           
          }
      `;
        this.innerHTML = `
        <div class="container-button">
          <button type="${this.type}" class="button">${this.text}</button>
        </div>  
          `;
        this.appendChild(style);
    }
});
