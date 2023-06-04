import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const CitiesTable = models.CitiesTable;

class CitiesController {
    async create(req, res, next) {
        try {
            const {city_name} = req.body;
            const city = await CitiesTable.create({city_name})
            return res.json(city);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        // let {city_name, limit, page} = req.query;
        // page = page || 1;
        // limit = limit || 10;
        // let offset = page * limit - limit;
        // let cities = await CitiesTable.findAndCountAll({limit, offset});
        let cities = await CitiesTable.findAll();
        return res.json(cities);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const city = await CitiesTable.findOne(
            {where: {id}}
        )
        return res.json(city);
    }
}

export default new CitiesController();