import Router from "express";
import labRecomendationController from "../controllers/labRecomendationController.js";
const router = new Router();

router.post('/', labRecomendationController.getRecommendationsCont)

export default router;