import Router from "express";
const router = new Router();
import userController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', AuthMiddleware, userController.checkAuth)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

export default router;