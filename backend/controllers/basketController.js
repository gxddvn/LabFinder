import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const BasketUser = models.BasketUser;

class BasketController {
    async create(req, res, next) {
        try {
            const {full_price, usersTableId} = req.body;
            console.log(full_price, usersTableId);
            const basket = await BasketUser.create({full_price, usersTableId})
            console.log(basket);
            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {full_price, usersTableId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let baskets = await BasketUser.findAndCountAll({limit, offset});
        return res.json(baskets);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const basket = await BasketUser.findOne(
            {where: {id}}
        )
        return res.json(basket);
    }

    async getOneByUserId(req, res) {
        const {id} = req.body;
        const basket = await BasketUser.findOne(
            {where: {usersTableId: id}}
        )
        return res.json(basket);
    }

    async updateOne(req, res, next) {
        try {
            const {id, full_price} = req.body;
            const basket = await BasketUser.update({full_price}, {where: {id}});
            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params;
        const basket = await BasketUser.destroy({where: {id}})
        return res.json(basket);
    }
}

export default new BasketController();