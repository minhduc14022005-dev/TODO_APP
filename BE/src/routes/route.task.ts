import {TaskController} from "../controllers/task.controller";
import { TaskService } from "../services/task.service";
import { Router } from "express";

const taskService = new TaskService();
const taskController = new TaskController(taskService);
const router = Router();

router.route('/')
    .post(taskController.createTask)
    .get(taskController.getAllTaskDesc);

router.route('/:id')
    .put(taskController.updateTaskById)
    .delete(taskController.deleteTaskById);

export default router;