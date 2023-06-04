import Router from "express";
const router = new Router();
import basketController from "../controllers/basketController.js";

router.post('/', basketController.create)
router.get('/', basketController.getAll)
router.get('/:id', basketController.getOne)
router.post('/userbasket', basketController.getOneByUserId)
router.delete('/del/:id', basketController.deleteOne)
router.put('/updateone', basketController.updateOne)

export default router;