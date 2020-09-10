import express from 'express';
import tasksController from '../controllers/task-controller';

const router = express.Router();

router.get('/task/:id?', tasksController.get);
router.post('/task', tasksController.create);
router.put('/task/:id', tasksController.update);
router.delete('/task/:id', tasksController.delete);

export default router;