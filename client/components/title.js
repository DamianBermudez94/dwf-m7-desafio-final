customElements.define("title-component", class extends HTMLElement {
    text;
    connectedCallback() {
        this.text = this.textContent;
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
            .title{
              font-size:40px;
              margin:0;
              font-weight:bold;
              color:#000;
            }
          
        `;
        this.innerHTML = `
           <h1 class="title">${this.text}</h1>
          `;
        this.appendChild(style);
    }
});
