import models from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { where } from 'sequelize';

const ReviewsTable = models.ReviewsTable;

class ReviewsController {
    async create(req, res, next) {
        try {
            const {review, grades, usersTableId} = req.body;
            const review_tab = await ReviewsTable.create({review, grades, usersTableId})
            return res.json(review_tab);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {review, grades, usersTableId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let reviews_tab = await ReviewsTable.findAndCountAll({limit, offset});
        return res.json(reviews_tab);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const review_tab = await ReviewsTable.findOne(
            {where: {id}}
        )
        return res.json(review_tab);
    }
}

export default new ReviewsController();