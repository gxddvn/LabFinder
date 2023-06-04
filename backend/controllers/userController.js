import ApiError from "../error/ApiError.js";
import bcrypt from 'bcrypt';
import models from "../models/models.js";
import jwt from "jsonwebtoken";

const UsersTable = models.UsersTable;

const generateJWT = (id, name, p_num, email, user_role) => {
    return jwt.sign({id, name, p_num, email, user_role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {name, p_num, email, password, user_role} = req.body;
        if (!name || !email || !p_num || !password) {
            return next(ApiError.badRequest("Некорректные данные!"));
        }
        const candidate = await UsersTable.findOne({where:{email}});
        if (candidate) {
            return next(ApiError.badRequest("User уже существует!"));
        }
        const HashPassword = await bcrypt.hash(password, 5);
        const user = await UsersTable.create({name, p_num, email, password: HashPassword});
        const token = generateJWT(user.id, user.name, user.p_num, user.email, user.user_role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await UsersTable.findOne({where:{email}});
        if (!user) {
            return next(ApiError.internal("User не найден!"));
        }
        let comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return next(ApiError.internal("Указан не верный пароль!"));
        }
        const token = generateJWT(user.id, user.name, user.p_num, user.email, user.user_role);
        return res.json({token});
    }

    async checkAuth(req, res, next) {
        // res.json({message: "All working!!!"});
        const token = generateJWT(req.user.id, req.user.name, req.user.p_num, req.user.email, req.user.user_role);
        return res.json({token})
    }

    async getOne(req, res) {
        const {id} = req.params;
        const user = await UsersTable.findOne(
            {where: {id}}
        )
        return res.json(user);
    }

    async getAll(req, res) {
        let {limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let users_tab = await UsersTable.findAndCountAll({limit, offset});
        return res.json(users_tab);
    }
}

export default new UserController();