import Router from "express";
const router = new Router();
import citiesController from "../controllers/citiesController.js";

router.post('/', citiesController.create)
router.get('/', citiesController.getAll)
router.get('/:id', citiesController.getOne)

export default router;