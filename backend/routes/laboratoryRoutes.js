import Router from "express";
const router = new Router();
import laboratoryController from "../controllers/laboratoryController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

// router.post('/', checkRoleMiddleware("ADMIN"),laboratoryController.create)
router.post('/', laboratoryController.create)
router.get('/', laboratoryController.getAll)
router.get('/:id', laboratoryController.getOne)
router.get('/citiesid/:id', laboratoryController.getAllCitiesOne)

export default router;