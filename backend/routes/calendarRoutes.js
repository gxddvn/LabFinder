import Router from "express";
const router = new Router();
import calendarController from "../controllers/calendarController.js";

router.post('/', calendarController.create)
router.post('/allbyid', calendarController.getAllById)
router.post('/allbyanalyzesid', calendarController.getAllByAnalyzesId)
router.get('/', calendarController.getAll)
router.get('/:id', calendarController.getOne)
router.delete('/del/:id', calendarController.deleteOne)
router.put('/:id', calendarController.updateOne)

export default router;