import express from 'express';
import { categoryController } from '../controller/index.js';

const categoryRouter = express.Router();

//GET: /category => fetch all category
categoryRouter.get('/', categoryController.getAllCategory);


export default categoryRouter;