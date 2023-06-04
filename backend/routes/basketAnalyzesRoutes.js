import Router from "express";
const router = new Router();
import basketAnalyzesController from "../controllers/basketAnalyzesController.js";

router.post('/', basketAnalyzesController.create)
router.get('/', basketAnalyzesController.getAll)
router.get('/:id', basketAnalyzesController.getOne)
router.post('/analyzesbasket', basketAnalyzesController.getAllBasketID)
router.delete('/del/:id', basketAnalyzesController.deleteOne)
router.delete('/delall/:id', basketAnalyzesController.deleteAll)
// router.put('/:id', basketAnalyzesController.updateOne)

export default router;