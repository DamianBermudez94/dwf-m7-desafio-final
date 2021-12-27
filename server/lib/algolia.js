"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexPets = void 0;
// For the default version
const algoliasearch_1 = require("algoliasearch");
const client = (0, algoliasearch_1.default)('JSTB90O92R', '991bef075cb0635a0c29681cf168fdd9');
const indexPets = client.initIndex('pets');
exports.indexPets = indexPets;
