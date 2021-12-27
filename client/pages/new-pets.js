"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
const dropzone_1 = require("dropzone");
const router_1 = require("@vaadin/router");
const MapboxClient = require("mapbox");
const mapboxgl = require("mapbox-gl");
const MAPBOX_TOKEN = "pk.eyJ1Ijoic29maWExIiwiYSI6ImNrdmV0a2d5NTB2dnQydm8wNG83eWoyeGIifQ.NVBPhXDuWe-mw4LS8D3GBw";
customElements.define("newpet-page", class extends HTMLElement {
    petData;
    petName;
    update;
    async connectedCallback() {
        this.petName = state_1.state.getState().reportName;
        const cs = state_1.state.getState();
        if (cs.update) {
            this.petData = cs.petData;
            this.update = true;
        }
        this.render();
        await this.mapbox();
        if (cs.update) {
            cs.update = false;
            state_1.state.setState(cs);
            const container = this.querySelector(".container-pic");
            const img = this.querySelector(".pic");
            container.textContent = "";
            img.src = this.petData.image;
            container.append(img);
        }
        const form = document.querySelector(".form-pet");
        let filePic;
        const myDropzone = new dropzone_1.Dropzone(".container-pic", {
            url: "/falsa",
            autoProcessQueue: false,
            previewTemplate: document.querySelector(".container-pic").innerHTML,
        });
        myDropzone.on("addedfile", function (file) {
            filePic = file;
        });
        myDropzone.on("thumbnail", (file, dataUrl) => {
            const container = this.querySelector(".container-pic");
            const img = this.querySelector(".pic");
            container.textContent = "";
            img.src = dataUrl;
            container.append(img);
        });
        if (!this.update) {
            //Creo la mascota con todos los datos
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const targets = event.target;
                const pictureDataURL = filePic.dataURL;
                const name = targets.name.value;
                const place = targets.location.value;
                const cs = state_1.state.getState();
                const { lat, lng } = cs.petLocation;
                await state_1.state.createPet({
                    pictureDataURL,
                    name,
                    lastGeo_lat: lat,
                    lastGeo_lon: lng,
                    place,
                });
                router_1.Router.go("/me/pets");
            });
            const cancelar = this.querySelector(".cancelar");
            cancelar.addEventListener("click", () => {
                router_1.Router.go("/");
            });
        }
        else {
            //Actualizo la mascota con todos los datos
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const targets = event.target;
                const pictureDataURL = filePic?.dataURL;
                const name = targets.name.value;
                const place = targets.location.value;
                const cs = state_1.state.getState();
                const { lat, lng } = cs.petLocation;
                await state_1.state.updatePet({
                    pictureDataURL,
                    name: name || this.petData.name,
                    lastGeo_lat: lat,
                    lastGeo_lon: lng,
                    place,
                    id: this.petData.id,
                });
                router_1.Router.go("/me/pets");
            });
            const cancelar = this.querySelector(".cancelar");
            cancelar.addEventListener("click", async () => {
                await state_1.state.updatePet({
                    founded: true,
                    id: this.petData.id,
                });
                const body = this.querySelector(".container");
                const style = document.createElement("style");
                style.innerHTML = `
          .container{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            gap:6px;
            font-size:22px;
            font-weight:bold;
            text-align:center;
            color:#EDEDED;     
          }
          img{
            max-width:350px;
            max-height:350px;
          }
          `;
                this.appendChild(style);
                body.innerHTML = `
          <div class="container">
            <h2>Nos alegramos que hayas encontrado a ${this.petData.name}</h2>
            <h3>Comparti nuestra app para encontrar mas mascotas perdidas👽</h3>
            <img src="${this.petData.image}"/>
          </div>
          
          `;
                this.appendChild(body);
                setTimeout(() => {
                    router_1.Router.go("/");
                }, 4000);
            });
        }
    }
    async mapbox() {
        const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
        function initMap() {
            mapboxgl.accessToken = MAPBOX_TOKEN;
            return new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
            });
        }
        function initSearchForm(callback) {
            const form = document.querySelector(".mapbox-button");
            form.addEventListener("click", (e) => {
                const location = document.querySelector(".location");
                const locationValue = location.value;
                mapboxClient.geocodeForward(locationValue, {
                    country: "ar",
                    autocomplete: true,
                    language: "es",
                }, function (err, data, res) {
                    // console.log(data);
                    if (!err)
                        callback(data.features);
                });
            });
        }
        const mapa = initMap();
        initSearchForm(function (results) {
            const firstResult = results[0];
            const marker = new mapboxgl.Marker()
                .setLngLat(firstResult.geometry.coordinates)
                .addTo(mapa);
            const [lng, lat] = firstResult.geometry.coordinates;
            const cs = state_1.state.getState();
            cs.petLocation = { lng, lat };
            state_1.state.setState(cs);
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapa);
            mapa.setCenter(firstResult.geometry.coordinates);
            mapa.setZoom(14);
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
          align-items:center;
          padding:33px 32px;
      }
      .form-pet{
          display:flex;
          flex-direction:column;
          margin:15px 0;
      }
      .input-item{
          display:flex;
          flex-direction:column;
          margin:15px 0;
          color:#000;
      }
      .input-text{
          height:50px;
          font-size:24px;
          color:#000;
          font-weight:500;
          background-color:#ffff;
          border:1px solid #0059ff;
          font-family: 'Poppins', sans-serif;
      }
      input[type=text]:focus {
       outline:none;
      }
      .container-pic{
        margin: 0 auto 10px auto;
        border: 3px solid #0059ff;
        border-radius:4px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:30px;
        color:#000;
        text-align:center;
        padding:15px;
        cursor:pointer;
      }
      .pic{
        ${this.update ? `width:250px;` : ""}
        ${this.update ? `height:250px;` : ""}
       background:grey;
       display:flex;
       justify-content:center;
       align-items:center;
       object-fit: cover;
      }
      #map{
        width:100%;
        height:200px;
        background-color:black;
        border-radius:2px;
        margin:20px 0;
      }
      .text{
        font-size:16px;
        font-weight:500;
        color:#000;
      }
      .cancelar{
        margin-top:20px;
      }
      .mapbox-button{
            background-color:#0059ff;
            width:335px;
            height:50px;
            border:none;
            color:#fff;
            border-radius:4px;
            font-size:20px;
            font-weight:700;
            font-family: 'Poppins', sans-serif;
            margin-top:6px;
      }
   `;
        this.innerHTML = `
        <header-component></header-component>
        <div class="container">
           ${this.update
            ? `<title-component>Editar mascota perdida</title-component>`
            : `<title-component>Reportar mascota perdida</title-component>`} 
             <form class="form-pet">
                <div class="input-item">
                    <label>NOMBRE:</label>
                    <input type="text" name="name" class="input-text" placeholder="${this.update ? this.petData.name : ""}"/>
                </div>
                <div class="container-pic">
                    <img class="pic"/>
                    agregar/modificar foto
                </div>
                <div id="map"></div>
                <div class="input-item">
                    <label>UBICACIÓN:</label>
                    <input type="search" name="location" class="input-text location"/>
                    <button type="button" class="mapbox-button">Guardar Ubicación</button>
                </div>
                <p class="text">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                <button-component type="submit">${this.update ? "Guardar" : "Reportar como perdido"}</button-component>
                <button-component type="button" class="cancelar">${this.update ? "Reportar como encontrado" : "Cancelar"}</button-component>
             </form>
        </div>  
      `;
        this.appendChild(style);
    }
});
