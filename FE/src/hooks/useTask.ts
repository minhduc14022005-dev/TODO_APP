import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task.service';
import { type ITask } from '../types/task.type';

export const useTasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<boolean | undefined>(undefined);

    // Dùng useCallback để tối ưu bộ nhớ, tránh tạo lại hàm sau mỗi lần render
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await taskService.getAllTasks(1,50, filterStatus, searchQuery);
            if (response.success) {
                setTasks(response.data);
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách:', err);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, searchQuery]);

    // Tự động gọi API khi khởi tạo
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            fetchTasks();
        }, 500);
        return () => clearTimeout(delayTimer);
    }, [fetchTasks]);

    // Hàm Tạo mới hoặc Cập nhật
    const saveTask = async (taskData: Partial<ITask>, editingId?: string) => {
        if (editingId) {
            await taskService.updateTask(editingId, taskData);
        } else {
            await taskService.createTask(taskData);
        }
        await fetchTasks(); // Tải lại danh sách
    };

    // Hàm Đổi trạng thái
    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setTasks(prev => prev.map(t => t._id === id ? { ...t, isCompleted: !currentStatus } : t));
            await taskService.updateTask(id, { isCompleted: !currentStatus });
        } catch (err) {
            fetchTasks(); // Rollback nếu lỗi
        }
    };

    // Hàm Xóa
    const deleteTask = async (id: string) => {
        if (!window.confirm('Em có chắc chắn muốn xóa công việc này?')) return false;
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(t => t._id !== id));
            return true; 
        } catch (err) {
            alert('Lỗi khi xóa hệ thống!');
            return false;
        }
    };
    return {
        tasks,
        loading,
        searchQuery,
        filterStatus,
        setSearchQuery,
        setFilterStatus,
        saveTask,
        toggleStatus,
        deleteTask
    };
};