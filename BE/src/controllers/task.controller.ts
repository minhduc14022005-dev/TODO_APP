import {Request, Response} from 'express';
import {ITaskService} from '../services/task.service';
import mongoose from 'mongoose';



export class TaskController {
    constructor(private readonly taskService: ITaskService) {}
    /*
    *Endpoint: POST api/tasks
    *Description: Tạo task mới
    */
    public createTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const taskData = req.body;
            const newTask = await this.taskService.createTask(taskData);
            res.status(201).json(
                {
                    success: true,
                    message: 'Tạo task thành công',
                    data: newTask
                }
            );
        } catch (error: any) {
            res.status(400).json(
                { 
                    success: false, 
                    message: error.message || 'Dữ liệu không hợp lệ' 
                }
            );
        }
    }

    /*
    *Endpoint: GET api/tasks?isCompleted=true/false (tùy chọn)
    *Description: Lấy danh sách task (hỗ trợ lọc theo trạng thái hoàn thành)
    */
    public getAllTaskDesc = async (req: Request, res: Response): Promise<void> => {
        try {
            const { isCompleted, search, page, limit } = req.query;

            let parseđIsCompleted: boolean | undefined = undefined;
            if(typeof isCompleted === 'string' && ['true', 'false'].includes(isCompleted)) {
                parseđIsCompleted = isCompleted === 'true';
            }

            const parsedSearch: string | undefined = typeof search === 'string' ? search : undefined;
            const parsedPage: number | undefined = parseInt(page as string, 10) > 0 ? parseInt(page as string, 10) : undefined;
            const parsedLimit: number | undefined = parseInt(limit as string, 10) > 0 ? parseInt(limit as string, 10) : undefined;
            const result = await this.taskService.getAllTaskDesc({
                isCompleted: parseđIsCompleted,
                search: parsedSearch,
                page: parsedPage,
                limit: parsedLimit
            });
            res.status(200).json({
                success: true,
                message: 'Lấy danh sách task thành công',
                data: result.tasks,
                pagination: result.pagination
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi server' 
            });
        }
    }

    /*
    *Endpoint: PUT api/tasks/:id
    *Description: Cập nhật task theo ID
    */
    public updateTaskById = async (req: Request, res: Response): Promise<void> => {
        try{
            const taskId = req.params.id as string;

            if(!mongoose.Types.ObjectId.isValid(taskId)){
                res.status(400).json({ 
                    success: false, 
                    message: 'ID task không hợp lệ' 
                });
                return;
            }
            const updateData = req.body;
            const updatedTask = await this.taskService.updateTaskById(taskId, updateData);
            if(!updatedTask){
                res.status(404).json({ 
                    success: false, 
                    message: 'Không tìm thấy task này' 
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Cập nhật task thành công',
                data: updatedTask
            });
        } catch(error: any){
            res.status(400).json({ 
                success: false, 
                message: error.message || 'Dữ liệu không hợp lệ' 
            });
        }
    }

    /*
    *Endpoint: DELETE api/tasks/:id
    *Description: Xóa task theo ID
    */
    public deleteTaskById = async (req: Request, res: Response): Promise<void> => {
        try{
            const taskId = req.params.id as string;
            if(!mongoose.Types.ObjectId.isValid(taskId)){
                res.status(400).json({ 
                    success: false, 
                    message: 'ID task không hợp lệ'
                });
                return;
            }
            const deletedTask = await this.taskService.deleteTaskById(taskId);
            if(!deletedTask){
                res.status(404).json({ 
                    success: false, 
                    message: 'Không tìm thấy task này' 
                });
                return;
            }
            res.status(200).json({ 
                success: true, 
                message: 'Xóa task thành công', 
                data: deletedTask 
            });
        } catch(error: any){
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi server' 
            });
        }
    }
}