import models from '../models/models.js';
import ApiError from '../error/ApiError.js';
import nodemailer from 'nodemailer';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Orders = models.Orders;
const LaboratoryTable = models.LaboratoryTable;
const CitiesTable = models.CitiesTable;

async function createAndSendPDF(analysisList, timeList, recipientEmail, laboratory, city, user_name, full_price) {
    const doc = new PDFDocument();
    const fontPath = path.resolve(__dirname, 'Roboto-Medium.ttf');
    doc.font(fontPath); // Встановіть шрифт з підтримкою української мови
    doc.fontSize(20).text('Список зареєстрованих аналізів у Labfinder', { align: 'center' }); // Додайте український текст до документу
    doc.moveDown();
    doc.fontSize(16).text(`Замовник: ${user_name}`);
    doc.fontSize(16).text(`LabFinder адреса: ${laboratory.lab_name} ${laboratory.adress}`);
    doc.fontSize(16).text(`Місто: ${city.city_name}`);
    doc.moveDown();
    // Добавляем информацию об анализах в документ
    analysisList.forEach((analysis, index) => {
        console.log(analysis);
        doc.fontSize(12).text(`Аналіз ${index + 1}: ${analysis.name}`);
        doc.fontSize(12).text(`Ціна: ${analysis.price} грн.`);
        doc.fontSize(12).text(`Час: ${timeList[index].time}`);
        doc.fontSize(12).text(`Дата: ${timeList[index].date}`);
        doc.fontSize(12).moveDown();
    });
    doc.fontSize(16).text(`Усього до сплати: ${full_price} грн`);
    const pdfPath = 'output.pdf';
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tobiasflynn2215@gmail.com',
            pass: 'zudyllqzrpylvquh'
        }
    });
    const mailOptions = {
        from: 'tobiasflynn2215@gmail.com',
        to: recipientEmail,
        subject: 'LabFinder: Список зареєстрованих аналізів',
        text: `Вітаємо вас, ${user_name}, замовлення на здачу аналізів до нашої лабораторії LabFinder, успішно оформлено!`,
        attachments: [
            {
                filename: 'analysis_list.pdf',
                path: pdfPath
            }
        ]
    };
    try {
        // Отправляем письмо с вложением
        const info = await transporter.sendMail(mailOptions);
        console.log('Письмо успешно отправлено:', info.response);
    } catch (error) {
        console.log('Ошибка при отправке письма:', error);
    }
    // Настройки письма
}

class OrdersController {
    async create(req, res, next) {
        try {
            const {full_price, valid, usersTableId, laboratoryTableId, user_email, analyzes, times, user_name} = req.body;
            const order = await Orders.create({full_price, valid, usersTableId, laboratoryTableId})
            const laboratory = await LaboratoryTable.findOne({where: {id: laboratoryTableId}})
            const city = await CitiesTable.findOne({where: {id: laboratory.citiesTableId}})
            console.log(city);
            createAndSendPDF(analyzes, times, user_email, laboratory, city, user_name, full_price);
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {full_price, valid, usersTableId, laboratoryTableId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let orders = await Orders.findAndCountAll({limit, offset});
        return res.json(orders);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = await Orders.findOne(
            {where: {id}}
        )
        return res.json(order);
    }

    async getAllById(req, res, next) {
        try {
            const {id} = req.params;
            const order = await Orders.findAll(
                {where: {usersTableId: id}}
            )
            if (order === null) {
                return res.json([]);
            }
            else {
                return res.json(order);
            }
            
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res) {
        try {
            const {id} = req.params;
            const {full_price, valid, usersTableId, laboratoryTableId} = req.body;
            const order = await Orders.update({full_price, valid, usersTableId, laboratoryTableId}, {where: {id}})
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params;
        const order = await Orders.destroy({where: {id}})
        return res.json(order);
    }
}

export default new OrdersController();