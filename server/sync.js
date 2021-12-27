"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
models_1.User.sequelize
    .sync({ force: true })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
