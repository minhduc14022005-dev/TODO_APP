import apiClient from './api';
import { type ITask, type IApiResponse } from '../types/task.type';

export const taskService = {
    // Lấy danh sách task với phân trang, lọc theo trạng thái hoàn thành và tìm kiếm theo tiêu đề
    getAllTasks: async (
        page: number = 1,
        limit: number = 10,
        isCompleted?: boolean,
        search?: string

    ) => {
        const params: any = { page, limit };
        if (search) params.search = search;
        if(isCompleted !== undefined) params.isCompleted = isCompleted;

        const response = await apiClient.get<IApiResponse<ITask[]>>('/tasks', { params });
        return response.data;
    },

    // Tạo task mới
    createTask: async (taskData: Partial<ITask>) => {
        const response = await apiClient.post<IApiResponse<ITask>>('/tasks', taskData);
        return response.data;
    },

    // Cập nhật task theo ID
    updateTask: async (taskId: string, updateData: Partial<ITask>) => {
        const response = await apiClient.put<IApiResponse<ITask>>(`/tasks/${taskId}`, updateData);
        return response.data;
    },

    // Xóa task theo ID
    deleteTask: async (taskId: string) => {
        const response = await apiClient.delete<IApiResponse<ITask>>(`/tasks/${taskId}`);
        return response.data;
    }
};

