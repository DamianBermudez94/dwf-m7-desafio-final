"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
customElements.define("menu-component", class extends HTMLElement {
    email;
    connectedCallback() {
        const cs = state_1.state.getState();
        state_1.state.subscribe(() => {
            this.email = cs?.me?.email;
        });
        this.email = cs?.me?.email;
        this.render();
        const token = state_1.state.getToken();
        const close = this.querySelector(".close");
        close.addEventListener("click", () => {
            this.innerHTML = `<header-component></header-component>`;
        });
        const myData = this.querySelector(".datos");
        myData.addEventListener("click", () => {
            state_1.state.setRouter("/profile/edit");
            !token && router_1.Router.go("/login");
            token && router_1.Router.go("/profile/edit");
        });
        const report = this.querySelector(".report");
        report.addEventListener("click", () => {
            state_1.state.setRouter("/pets/new");
            token && router_1.Router.go("/pets/new");
            !token && router_1.Router.go("/login");
        });
        const mascotas = this.querySelector(".mascotas");
        mascotas.addEventListener("click", () => {
            state_1.state.setRouter("/me/pets");
            token && router_1.Router.go("/me/pets");
            !token && router_1.Router.go("/login");
        });
        const footer = this.querySelector(".footer-menu");
        const logout = this.querySelector(".logout");
        logout?.addEventListener("click", () => {
            footer.textContent = "";
            const cs = state_1.state.getState();
            cs.me = {};
            state_1.state.setState(cs);
            state_1.state.logOut();
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
              padding:0;
          }
          h4,p {
              margin:0;
          }
          .container-menu{
            width:100%;
            height:100vh;
            background-color: #0059ff;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
          }
          .text-menu{
            font-size:24px;
            font-weight:700;
            padding: 0 104px;
            text-align:center;
            display:flex;
            flex-direction:column;
            gap:45px;
            margin-bottom:200px;
            color:#ECF0F1;
            cursor:pointer;
          }
          .footer-menu{
              text-align:center;
          }
          .footer-menu p {
              font-size:24px;
              color:#ECF0F1;
          }
          .footer-menu a {
              font-size:16px;
              color:#ECF0F1;
          }
          .close{
            font-size:24px;
            font-weight:700;
            position:fixed;
            top:10px;
            left:10px;
            color:#fff;
            cursor:pointer;
          }
          .hide{
            display:none;
          }
          
          `;
        this.innerHTML = `
        <div class="container-menu">
        <div class="close">X</div>
          <div class="text-menu">
            <a class="datos">Mis Datos</a>
            <a class="mascotas">Mis mascotas reportadas</a>
            <a class="report">Reportar mascota</a>
          </div>
          <div class="footer-menu">
            ${this.email
            ? ` 
                <p>${this.email}</p>
                <a href="" class="logout">CERRAR SESIÓN</a>`
            : ""}
          </div>
        </div>
          `;
        this.appendChild(style);
    }
});
