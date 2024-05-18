import Router from "express";
const router = new Router();
import userRoutes from './userRoutes.js';
import analyzesRoutes from './analyzesRoutes.js';
import citiesRoutes from './citiesRoutes.js';
import reviewsRoutes from './reviewsRoutes.js';
import basketRoutes from './basketRoutes.js';
import basketAnalyzesRoutes from './basketAnalyzesRoutes.js';
import analyzesOrdersRoutes from './analyzesOrdersRoutes.js';
import ordersRoutes from './ordersRoutes.js';
import laboratoryRoutes from './laboratoryRoutes.js';
import calendarRoutes from './calendarRoutes.js';
import labRecomendationRoutes from './labRecomendationRoutes.js'

router.use('/user', userRoutes)
router.use('/analyzes', analyzesRoutes)
router.use('/cities', citiesRoutes)
router.use('/reviews', reviewsRoutes)
router.use('/basket', basketRoutes)
router.use('/basketanalyzes', basketAnalyzesRoutes)
router.use('/analyzesorders', analyzesOrdersRoutes)
router.use('/orders', ordersRoutes)
router.use('/laboratory', laboratoryRoutes)
router.use('/calendar', calendarRoutes)
router.use('/rec', labRecomendationRoutes)

export default router;