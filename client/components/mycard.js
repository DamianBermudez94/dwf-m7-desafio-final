"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
const lodash_1 = require("lodash");
const router_1 = require("@vaadin/router");
customElements.define("my-card", class extends HTMLElement {
    pets = [];
    async connectedCallback() {
        //Guardo en this.pets mis mascotas reportadas
        const { myPets } = await state_1.state.getMyPets();
        this.pets = myPets;
        this.render();
    }
    render() {
        const style = document.createElement("style");
        style.innerHTML = `
      .card-container{
          display:flex;  
          flex-direction:column;     
          justify-content:center;
          align-items:center;
          width:320px;
          border: solid 1px #0059ff;
          margin-bottom:20px;
          border-radius:15px;
          padding:13px 0;
          box-shadow: 10px 5px 10px #0059ff;
      }
      .card-image{
          width:60%;
      }
      .card-info{
        text-align:center;
        padding:10px;        
      }
      .card-name{
          font-size:40px;
          font-weight:700;
          color:#000;
          margin:0;
      }
      .card-place{
        font-size:24px;
        font-weight:700;
        color:#000;
        margin:0 0 5px 0;
      }
      .card-link{
          color:#000;
          text-align:center;
          font-weight:700;
          margin:0;
          cursor:pointer;
      }
      `;
        this.appendChild(style);
        //Por cada mascota creo una card con la informacion
        this.pets.forEach((pet) => {
            const div = document.createElement("div");
            div.innerHTML = `
        <div class="card-container">
            <img class="card-image" src="${pet.image}"/>
            <div class="card-info">
                <h2 class="card-name">${(0, lodash_1.capitalize)(pet.name)}</h2>
                <h3 class="card-place">${(0, lodash_1.capitalize)(pet.place)}</h3>       
                <a class="card-link">EDITAR</a> 
            </div>    
        </div>`;
            //Si clickea en editar va a la pagina para editar
            div.querySelector(".card-link")?.addEventListener("click", async () => {
                await state_1.state.setPetById(pet.id);
                const cs = state_1.state.getState();
                cs.update = true;
                state_1.state.setState(cs);
                router_1.Router.go("/pets/new");
            });
            this.appendChild(div);
        });
    }
});
