"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
customElements.define("report-page", class extends HTMLElement {
    petName;
    petId;
    petUserId;
    connectedCallback() {
        const cs = state_1.state.getState();
        this.petName = cs.reportName;
        this.petId = cs.petId;
        this.petUserId = cs.petUserId;
        this.render();
        //Data del reporte
        const form = this.querySelector(".form-report");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const reporter_name = e.target.name.value;
            const phone_number = e.target.phone.value;
            const message = e.target.description.value;
            await state_1.state.newReport({
                reporter_name,
                phone_number,
                message,
                petId: this.petId,
                userId: this.petUserId,
            });
            const container = this.querySelector(".container");
            const style = document.createElement("style");
            style.innerHTML = `
        .response-container{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-top:20px;
          justify-content:center;
          gap:4px;
          text-align:center;
        }
        .reponse{
          font-size:30px;
          font-family: 'Poppins', sans-serif;
          font-weight:bold;
          color:#000;
        }
        h5{
          font-size:24px;
          font-family: 'Poppins', sans-serif;
          color:#000;
        }
        `;
            this.appendChild(style);
            container.innerHTML = `
        <div class="response-container">
          <h2 class="reponse">Gracias por reportar, la mascotita te lo agradece ♥</h2>
          <h5>Redirigiendo...</h5>
        </div>  
        `;
            setTimeout(() => {
                router_1.Router.go("/");
            }, 3000);
        });
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
      .container{
          display:flex;
          flex-direction:column;
          padding:33px 32px;
          color:#000;
      }
      .form-report{
          display:flex;
          flex-direction:column;
          margin:15px 0;
      }
      .input-item{
          display:flex;
          flex-direction:column;
          margin:15px 0;
      }
      .input-text{
          height:50px;
          font-size:24px;
          background-color:#ECF0F1;
          border:0;    
          font-family:"Dosis";      
      }
      .input-textarea{
          height:120px;
          font-size:24px;
          background-color:#ECF0F1;
          border:0;
          font-family: 'Poppins', sans-serif;
      } 
      input[type=text]:focus {
        outline:none;
       }
       textarea:focus{
         outline:none;
       }
      `;
        this.innerHTML = `
        <header-component></header-component>
        <div class="container">
             <title-component>Reportar info de ${this.petName}</title-component>
             <form class="form-report">
                <div class="input-item">
                    <label>TU NOMBRE</label>
                    <input type="text" name="name" class="input-text"/>
                </div>
                <div class="input-item">
                    <label>TU TELEFONO</label>
                    <input type="text" name="phone" class="input-text"/>
                </div>
                <div class="input-item">
                    <label>DONDE LO VISTE?</label>
                    <textarea name="description" class="input-textarea"></textarea>
                </div>
                <button-component color="#FF9DF5">Enviar</button-component>
             </form>
        </div>     
        `;
        this.appendChild(style);
    }
});
