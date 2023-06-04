import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const AnalyzesTable = models.AnalyzesTable;

class AnalyzesController {
    async create(req, res, next) {
        try {
            const {name, description, price} = req.body;
            const analysis = await AnalyzesTable.create({name, description, price})
            return res.json(analysis);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {name, description, price, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let analyzes = await AnalyzesTable.findAndCountAll({limit, offset});
        return res.json(analyzes);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const analysis = await AnalyzesTable.findOne(
            {where: {id}}
        )
        return res.json(analysis);
    }

    async getArrAnalyzes(req, res, next) {
        try {
            const {ids} = req.body;
            if (ids) {
                const analysis = await AnalyzesTable.findAll(
                    {where: {id: ids}}
                )
                return res.json(analysis);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export default new AnalyzesController();