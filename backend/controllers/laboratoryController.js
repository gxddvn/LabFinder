import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const LaboratoryTable = models.LaboratoryTable;

class LaboratoryController {
    async create(req, res, next) {
        try {
            const {lab_name, adress, coordinates, citiesTableId} = req.body;
            const laboratory = await LaboratoryTable.create({lab_name, adress, coordinates, citiesTableId})
            return res.json(laboratory);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        // let {lab_name, adress, coordinates, citiesTableId, limit, page} = req.query;
        // page = page || 1;
        // limit = limit || 10;
        // let offset = page * limit - limit;
        // let laboratory = await LaboratoryTable.findAndCountAll({limit, offset});
        let laboratory = await LaboratoryTable.findAll();
        return res.json(laboratory);
    }

    async getAllCitiesOne(req, res) {
        const {id} = req.params;
        let laboratory = await LaboratoryTable.findAll({where: {citiesTableId: id}});
        return res.json(laboratory);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const laboratory = await LaboratoryTable.findOne(
            {where: {id}}
        )
        return res.json(laboratory);
    }
}

export default new LaboratoryController();