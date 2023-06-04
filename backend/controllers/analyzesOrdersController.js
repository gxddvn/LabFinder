import models from '../models/models.js';
import ApiError from '../error/ApiError.js';
import axios from 'axios';

const AnalyzesOrders = models.AnalyzesOrders;

class AnalyzesOrdersController {
    async create(req, res, next) {
        try {
            const {orderId, analyzesTableId, time, date, laboratoryTableId} = req.body;
            const analyzes_orders = await AnalyzesOrders.create({orderId, analyzesTableId})
            if(analyzes_orders !== {}) {
                axios.post('http://localhost:4444/api/calendar/', {time: time, date: date, laboratoryTableId: laboratoryTableId, analyzesOrderId: analyzes_orders.id})
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при отриманні відгуків");
                });
            }
            return res.json(analyzes_orders);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {orderId, analyzesTableId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let analyzes_orders = await AnalyzesOrders.findAndCountAll({limit, offset});
        return res.json(analyzes_orders);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const analyzes_orders = await AnalyzesOrders.findOne(
            {where: {orderId: id}}
        )
        return res.json(analyzes_orders);
    }

    async getAllById(req, res, next) {
        try {
            const {ids} = req.body;
            console.log(ids);
            const analyzes_orders = await AnalyzesOrders.findAll(
                {where: {orderId: ids}}
            )
            if (analyzes_orders === null) {
                return res.json([]);
            }
            else {
                return res.json(analyzes_orders);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // async updateOne(req, res) {
    //     try {
    //         const {id} = req.params;
    //         const {full_price} = req.body;
    //         const basket = await AnalyzesOrders.update({full_price}, {where: {id}})
    //         return res.json(basket);
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }

    async deleteOne(req, res) {
        const {id} = req.params;
        const analyzes_orders = await AnalyzesOrders.destroy({where: {id}})
        return res.json(analyzes_orders);
    }

    async deleteAll(req, res) {
        const {id} = req.params;
        const analyzes_orders = await AnalyzesOrders.destroy({where: {orderId: id}})
        return res.json(analyzes_orders);
    }
}

export default new AnalyzesOrdersController();