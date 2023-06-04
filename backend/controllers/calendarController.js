import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

const CalendarTable = models.CalendarTable;

class CalendarController {
    async create(req, res, next) {
        try {
            const {time, date, laboratoryTableId, analyzesOrderId} = req.body;
            const calendar = await CalendarTable.create({time, date, laboratoryTableId, analyzesOrderId})
            return res.json(calendar);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {time, date, laboratoryTableId, analyzesOrderId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let calendars = await CalendarTable.findAndCountAll({limit, offset});
        return res.json(calendars);
    }

    async getAllById(req, res) {
        const {date, laboratoryTableId} = req.body;
        const calendar = await CalendarTable.findAll(
            {where: {date: date, laboratoryTableId: laboratoryTableId}}
        )
        return res.json(calendar);
    }

    async getAllByAnalyzesId(req, res) {
        const {analyzesOrderId} = req.body;
        const calendar = await CalendarTable.findAll(
            {where: {analyzesOrderId: analyzesOrderId}}
        )
        return res.json(calendar);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const calendar = await CalendarTable.findOne(
            {where: {id}}
        )
        return res.json(calendar);
    }

    async updateOne(req, res) {
        try {
            const {id} = req.params;
            const {time, date, laboratoryTableId, analyzesOrderId} = req.body;
            const calendar = await CalendarTable.update({time, date, laboratoryTableId, analyzesOrderId}, {where: {id}})
            return res.json(calendar);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params;
        const calendar = await CalendarTable.destroy({where: {id}})
        return res.json(calendar);
    }
}

export default new CalendarController();