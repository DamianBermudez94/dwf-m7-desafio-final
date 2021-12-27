"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
//Pages
require("./pages/home");
require("./pages/report");
require("./pages/auth");
require("./pages/date");
require("./pages/new-pets");
require("./pages/mypets");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/report", component: "report-page" },
    { path: "/login", component: "auth-page" },
    { path: "/profile/edit", component: "datos-page" },
    { path: "/pets/new", component: "newpet-page" },
    { path: "/me/pets", component: "mypets-page" },
]);
