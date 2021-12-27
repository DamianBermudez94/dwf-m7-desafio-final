"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
customElements.define("datos-page", class extends HTMLElement {
    fullname;
    async connectedCallback() {
        const token = state_1.state.getToken();
        if (token) {
            const me = await state_1.state.getMe();
            this.fullname = me.fullname;
        }
        this.render();
        const cs = state_1.state.getState();
        const form = this.querySelector(".profile-form");
        const success = this.querySelector(".response");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const password = e.target.password.value;
            const password_verify = e.target["password-verify"].value;
            //Si ingresan password
            if (password) {
                //SI las password son iguales
                if (password === password_verify) {
                    //SI no tiene token es decir que no esta en su cuenta
                    if (!token) {
                        //Se crea el user, se ingresa a su cuenta y va a la pagina a la que se dirigia
                        await state_1.state.signUp(cs.email, password, name);
                        await state_1.state.signIn(cs.email, password);
                        success.textContent = "Tus datos fueron guardados correctamente!";
                        setTimeout(() => {
                            router_1.Router.go(cs.goTo);
                        }, 1000);
                    }
                    else {
                        //Si tiene token es porque quiere updatear su data
                        await state_1.state.update(name, password);
                        success.textContent = "Tus datos fueron guardados correctamente!";
                        setTimeout(() => {
                            router_1.Router.go("/");
                        }, 1000);
                    }
                }
                else
                    console.log("no coinciden las password");
            }
            else {
                //Si no puso contraseña y no tiene token no puede crearse la cuenta
                if (!token) {
                    success.textContent = "Contraseña requerida!";
                }
                else {
                    //Si no tiene contraseña y si tiene token es porque solo quiere actualizar el nombre
                    await state_1.state.update(name, password);
                    success.textContent = "Tus datos fueron guardados correctamente!";
                    setTimeout(() => {
                        router_1.Router.go("/");
                    }, 1000);
                }
            }
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
          color:#000;
      }
      .profile-form{
          margin-top:20px;
      }
      .item-input-email{
          display:flex;
          flex-direction:column;
          gap:3px;
          margin-top:15px;
          margin-bottom:20px;
      }
      .item-input-password{
        display:flex;
        flex-direction:column;
        gap:3px;
        margin:50px 0 20px 0;
    }
    label{
      color:#000;
    }
      .name {
          height:40px;
          background-color:#ECF0F1;
          border:0;
          font-size:22px;
          font-family: 'Poppins', sans-serif;
      }    
      .name::placeholder {
        color: black;
        font-size: 22px;
      }
      .password{
          height:40px;
          margin-bottom:10px;
          font-size:22px;
          background-color:#ECF0F1;
          border:0;
          font-family: 'Poppins', sans-serif;
      }
      .password-verify{
          height:40px;
          font-size:22px;
          background-color:#ECF0F1;
          border:0;
          font-family: 'Poppins', sans-serif;
      }
      .container-response{
        margin-top:10px;
        color:#ECF0F1;
      }
      input[type=text]:focus {
        outline:none;
       }
    `;
        this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Mis Datos</title-component>
        <form class="profile-form">
            <div class="item-input-email">
                <label>NOMBRE</label>
                <input type="text" name="name" class="name" placeholder="${this.fullname || ""}"/>        
            </div>
            <div class="item-input-password">
                <label>CONTRASEÑA</label>
                <input type="text" name="password" class="password"/>   
                <label>REPETIR CONTRASEÑA</label>
                <input type="text" name="password-verify" class="password-verify"/>    
            </div>
            <button-component>Guardar</button-component>
        </form>
        <div class="container-response">
          <h3 class="response"></h3>
        </div>
      </div>        
      `;
        this.appendChild(style);
    }
});
