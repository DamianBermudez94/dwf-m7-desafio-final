"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyToItem = exports.SECRET = exports.authMiddleware = exports.getSHA256 = void 0;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET = "JugoDeManzana1994";
exports.SECRET = SECRET;
const getSHA256 = (text) => {
    return crypto.createHash("sha256").update(text).digest("hex");
};
exports.getSHA256 = getSHA256;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const data = jwt.verify(token, SECRET);
        req._user = data;
        next();
    }
    catch { }
};
exports.authMiddleware = authMiddleware;
const bodyToItem = (petId, body) => {
    const respuesta = {};
    if (body.name) {
        respuesta.name = body.nombre;
    }
    if (body.image) {
        respuesta.image = body.image;
    }
    if (body.lastGeo_lat && body.lastGeo_lon) {
        respuesta._geoloc = { lat: body.lastGeo_lat, lng: body.lastGeo_lon };
    }
    if (body.founded) {
        respuesta.founded = body.founded;
    }
    if (petId) {
        respuesta.objectID = petId;
    }
    return respuesta;
};
exports.bodyToItem = bodyToItem;
