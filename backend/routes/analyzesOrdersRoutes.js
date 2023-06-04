import Router from "express";
const router = new Router();
import analyzesOrdersController from "../controllers/analyzesOrdersController.js";

router.post('/', analyzesOrdersController.create)
router.get('/', analyzesOrdersController.getAll)
router.get('/:id', analyzesOrdersController.getOne)
// router.get('/allbyid/:id', analyzesOrdersController.getAllById)
router.post('/allbyid/', analyzesOrdersController.getAllById)
router.delete('/del/:id', analyzesOrdersController.deleteOne)
router.delete('/delall/:id', analyzesOrdersController.deleteAll)
// router.put('/:id', analyzesOrdersController.updateOne)

export default router;