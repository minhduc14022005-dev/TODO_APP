import TaskModel, { ITask } from "../models/Task";

export interface ITaskQuery{
    isCompleted?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

export interface IPaginatedTaskResponse {
    tasks: ITask[]; // Mảng các công việc
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

export interface ITaskService {
    createTask(taskData: Partial<ITask>): Promise<ITask>;
    getAllTaskDesc(queryInfo: ITaskQuery): Promise<IPaginatedTaskResponse>;
    updateTaskById(taskId: string, updateData: Partial<ITask>): Promise<ITask | null>;
    deleteTaskById(taskId: string): Promise<ITask | null>;
}

export class TaskService implements ITaskService {
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
    public async getAllTaskDesc({ isCompleted, search, page = 1, limit = 10 }: ITaskQuery): Promise<IPaginatedTaskResponse>{
        const filter: any = {};
        if(isCompleted !== undefined){
            filter.isCompleted = isCompleted;
        }

        if(search && search.trim() !== ''){
            filter.title = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * (limit || 10);
        const [tasks, totalCount] = await Promise.all([
            TaskModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit || 10),
            TaskModel.countDocuments(filter)
        ]);

        return {
            tasks,
            pagination: {
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / (limit || 10)),
                currentPage: page,
                pageSize: limit || 10
            }
        };
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
