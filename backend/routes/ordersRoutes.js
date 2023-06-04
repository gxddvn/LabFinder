import Router from "express";
const router = new Router();
import ordersController from "../controllers/ordersController.js";

router.post('/', ordersController.create)
router.get('/', ordersController.getAll)
router.get('/:id', ordersController.getOne)
router.get('/allbyid/:id', ordersController.getAllById)
router.delete('/del/:id', ordersController.deleteOne)
router.put('/:id', ordersController.updateOne)

export default router;