import Router from "express";
const router = new Router();
import analyzesController from "../controllers/analyzesController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

// router.post('/', checkRoleMiddleware("ADMIN"),analyzesController.create)
router.post('/', analyzesController.create)
router.get('/', analyzesController.getAll)
router.get('/:id', analyzesController.getOne)
router.post('/arrids', analyzesController.getArrAnalyzes)

export default router;