"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const models_1 = require("../models");
class ReportController {
    async reportPet(data) {
        const { reporter_name, phone_number, message, petId } = data;
        const newReport = await models_1.Report.create({
            reporter_name,
            phone_number,
            message,
            petId,
        });
        return newReport;
    }
}
exports.ReportController = ReportController;
