import { Router } from "express";
import indexController from "../controller/indexController";

const router = Router()

router.get('/',indexController.jobsController.findAll)
router.get('/:id',indexController.jobsController.findOne)
router.post('/',indexController.jobsController.create)
router.put('/:id', indexController.jobsController.update)
router.delete('/:id',indexController.jobsController.remove)
router.get('/rawsql/:id',indexController.jobsController.rawSQL)

export default router