import TaskModel, { ITask } from "../models/Task";

export class TaskService {
    // Tạo task mới
    public async createTask(taskData: Partial<ITask>): Promise<ITask>{
        if(!taskData.title || taskData.title.trim() === ''){
            throw new Error('Tên công việc không được để trống!');
        }
        const newTask = new TaskModel(taskData);
        const savedTask = await newTask.save();
        
        return savedTask;
    }

    // Lấy danh sách task (hỗ trợ lọc theo trạng thái hoàn thành)
    public async getAllTaskDesc(isCompleted?: boolean): Promise<ITask[]>{
        const filter: any = {};
        if(isCompleted !== undefined){
            filter.isCompleted = isCompleted;
        }

        const tasks = await TaskModel.find(filter).sort({ createdAt: -1 });
        return tasks;
    }

    // Cập nhật task theo ID
    public async updateTaskById(taskId: string, updateData: Partial<ITask>): Promise<ITask | null> {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true, runValidators: true}
        );
        return updatedTask;
    }

    // Xóa task theo ID
    public async deleteTaskById(taskId: string): Promise<ITask | null> {
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        return deletedTask;
    }
}
