import Router from "express";
const router = new Router();
import reviewsController from "../controllers/reviewsController.js";

router.post('/', reviewsController.create)
router.get('/', reviewsController.getAll)
router.get('/:id', reviewsController.getOne)

export default router;