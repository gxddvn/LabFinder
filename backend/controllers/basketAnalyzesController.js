import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const BasketAnalyzes = models.BasketAnalyzes;

class BasketAnalyzesController {
    async create(req, res, next) {
        try {
            const {basketUserId, analyzesTableId} = req.body;
            const baskets =  await BasketAnalyzes.findOne({where: {basketUserId: basketUserId, analyzesTableId: analyzesTableId}});
            if (baskets) {
                return next(ApiError.badRequest("Такий аналіз вже додано до бд."));
            }
            const basket_analyzes = await BasketAnalyzes.create({basketUserId, analyzesTableId})
            return res.json(basket_analyzes);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {basketUserId, analyzesTableId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let basket_analyzes = await BasketAnalyzes.findAndCountAll({limit, offset});
        return res.json(basket_analyzes);
    }

    async getAllBasketID(req, res, next) {
        try {
            const {id} = req.body;
            let basket_analyzes = await BasketAnalyzes.findAll({where: {basketUserId: id}});
            return res.json(basket_analyzes);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        const basket_analyzes = await BasketAnalyzes.findOne(
            {where: {basketUserId: id}}
        )
        return res.json(basket_analyzes);
    }

    // async updateOne(req, res) {
    //     try {
    //         const {id} = req.params;
    //         const {full_price} = req.body;
    //         const basket = await BasketAnalyzes.update({full_price}, {where: {id}})
    //         return res.json(basket);
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }

    async deleteOne(req, res) {
        const {id} = req.params;
        const basket_analyzes = await BasketAnalyzes.destroy({where: {analyzesTableId: id}})
        return res.json(basket_analyzes);
    }

    async deleteAll(req, res) {
        const {id} = req.params;
        const basket_analyzes = await BasketAnalyzes.destroy({where: {basketUserId: id}})
        return res.json(basket_analyzes);
    }
}

export default new BasketAnalyzesController();