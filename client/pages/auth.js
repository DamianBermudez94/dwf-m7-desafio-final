"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
customElements.define("auth-page", class extends HTMLElement {
    connectedCallback() {
        this.render();
        const form = this.querySelector(".auth-form-email");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const finded = await state_1.state.userExist(email);
            finded && this.passwordRender();
            !finded && router_1.Router.go("/profile/edit");
        });
    }
    passwordRender() {
        const style = document.createElement("style");
        style.innerHTML = `
        .container{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin:10px 0;
          padding:10px;
          color:#EDEDED;
      }
      .auth-form{
          margin-top:20px;
        }
        .item{
          display:flex;
          flex-direction:column;
          margin-bottom:20px;
      }
      .password{
          height:40px;
          font-size:22px;
          background-color:#ECF0F1;
          border:0; 
          font-family: 'Poppins', sans-serif;
         
      }    
       input[type=text]:focus {
           outline:none;
      }   
      .password-forget{
          color:#000;
          margin-top:20px;
          text-align:center;
      }
      .response{
        margin-top:20px;
        color:#000;
        font-size:24px;
      }
    `;
        this.innerHTML = `
        <header-component></header-component>
        <div class="container">
          <title-component>Ingresar</title-component>
          <form class="auth-form-password">
              <div class="item">
                  <label class="label">CONTRASEÑA:</label>
                  <input type="text" name="password" class="password"/>        
                  <a href="" class="password-forget">OLVIDE MI CONTRASEÑA</a>
              </div>
              <button-component color="#FF9DF5">Ingresar</button-component>
          </form>
          <h3 class="response"></h3>
        </div>        
        `;
        this.appendChild(style);
        const form = this.querySelector(".auth-form-password");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const password = e.target.password.value;
            const cs = state_1.state.getState();
            const response = await state_1.state.signIn(cs.email, password);
            response && router_1.Router.go(cs.goTo);
            const passwordNo = this.querySelector(".response");
            !response && (passwordNo.textContent = "Contraseña incorrecta!");
        });
    }
    render() {
        const style = document.createElement("style");
        style.innerHTML = `
        .container{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin:10px 0;
          padding:10px;
          color:#EDEDED;
      }
      .auth-form{
          margin-top:20px;
          color:#EDEDED;
      }
      .item-input{
          display:flex;
          flex-direction:column;
          gap:3px;
          margin-bottom:20px;
      }
      .email{
          height:40px;
          font-size:22px;
          background-color:#ECF0F1;
          border:0;
          font-family:"Dosis";
      } 
      input[type=text]:focus {
        outline:none;
       }   
    `;
        this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Ingresar</title-component>
        <form class="auth-form-email">
            <div class="item-input">
                <label>EMAIL:</label>
                <input type="text" name="email" class="email"/>        
            </div>
            <button-component color="#FF9DF5">Siguiente</button-component>
        </form>
      </div>        
      `;
        this.appendChild(style);
    }
});
