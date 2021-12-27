"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetController = void 0;
const models_1 = require("../models");
const cloudinary_1 = require("../lib/cloudinary");
const algolia_1 = require("../lib/algolia");
const utils_1 = require("../lib/utils");
class PetController {
    async createPet(userId, data) {
        if (data.pictureDataURL) {
            const imagen = await cloudinary_1.cloudinary.uploader.upload(data.pictureDataURL, {
                resource_type: "image",
                discard_original_filename: true,
                width: 1000,
            });
            const dataComplete = {
                name: data.name,
                image: imagen.secure_url,
                lastGeo_lat: data.lastGeo_lat,
                lastGeo_lon: data.lastGeo_lon,
                place: data.place,
                founded: false,
                userId: userId,
            };
            const newPet = await models_1.Pet.create(dataComplete);
            await algolia_1.indexPets.saveObject({
                objectID: newPet.get("id"),
                name: newPet.get("name"),
                image: newPet.get("image"),
                _geoloc: {
                    lat: newPet.get("lastGeo_lat"),
                    lng: newPet.get("lastGeo_lon"),
                },
                place: newPet.get("place"),
                founded: newPet.get("founded"),
                userId: newPet.get("userId"),
            });
            return { data: dataComplete, petId: newPet.get("id") };
        }
    }
    async updatePet(petId, data) {
        if (data.pictureDataURL) {
            const imagen = await cloudinary_1.cloudinary.uploader.upload(data.pictureDataURL, {
                resource_type: "image",
                discard_original_filename: true,
                width: 1000,
            });
            data.image = imagen.secure_url;
        }
        await models_1.Pet.update(data, { where: { id: petId } });
        const dataUpdate = (0, utils_1.bodyToItem)(petId, data);
        await algolia_1.indexPets.partialUpdateObject(dataUpdate);
        return { data: data };
    }
    async getAllPetsNotFounded(coord) {
        const { lat, lng } = coord;
        const { hits } = await algolia_1.indexPets.search("", {
            aroundLatLng: [lat, lng].join(","),
            aroundRadius: 4000,
        });
        const allPets = hits.filter((p) => !p.founded);
        return { allPets };
    }
    async getPetsByUserId(userId) {
        const pets = await models_1.Pet.findAll({
            where: { userId: userId, founded: false },
        });
        return pets || [];
    }
    async getPetById(petId) {
        const pet = await models_1.Pet.findByPk(petId);
        return pet;
    }
}
exports.PetController = PetController;
