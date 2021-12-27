"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
const lodash_1 = require("lodash");
const router_1 = require("@vaadin/router");
customElements.define("pet-card", class extends HTMLElement {
    pets = [];
    async connectedCallback() {
        //Guardo en this.pets todas las mascotas cercanas
        const { allPets } = await state_1.state.getPets();
        this.pets = allPets;
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
          border: 2px solid #0059ff;
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
                <a class="card-link" href="">REPORTAR INFORMACION</a> 
            </div>    
        </div>`;
            //Si clickea en reportar informacion va a la pagina report de esa mascota
            div.querySelector(".card-link")?.addEventListener("click", (e) => {
                //Hay que pasar el id de la mascota
                const cs = state_1.state.getState();
                cs.petId = pet.objectID;
                cs.petUserId = pet.userId;
                state_1.state.setState(cs);
                state_1.state.setReportName((0, lodash_1.capitalize)(pet.name));
                router_1.Router.go("/report");
            });
            this.appendChild(div);
        });
    }
});
