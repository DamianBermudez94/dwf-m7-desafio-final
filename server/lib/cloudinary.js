"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
cloudinary_1.v2.config({
    cloud_name: 'dwf-m7',
    api_key: '868729874872135',
    api_secret: 'tgcHmEwg2fXdLxDNKEMGDx9dcCY'
});
