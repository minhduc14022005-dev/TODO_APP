import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task.service';
import { type ITask } from '../types/task.type';
import { toast } from 'react-toastify';

export const useTasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<boolean | undefined>(undefined);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');

    // Tạo debounce để làm việc tối ưu bộ nhớ
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500); 
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Dùng useCallback để tối ưu bộ nhớ, tránh tạo lại hàm sau mỗi lần render
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await taskService.getAllTasks(currentPage, 5, filterStatus, searchQuery);
            if (response.success) {
                setTasks(response.data);
                // Nếu có pagination thì lấy ra số trang
                if (response.pagination) {
                    setTotalPages(response.pagination.totalPages);
                }
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách:', err);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, searchQuery, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, filterStatus]);

    // Tự động gọi API khi khởi tạo
    useEffect(() => {
        fetchTasks();
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
            toast.error('Lỗi mạng: Không thể cập nhật trạng thái!');
        }
    };

    // Hàm Xóa
    const deleteTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(t => t._id !== id));
            toast.success('Xóa công việc thành công!');
            return true; 
        } catch (err) {
            toast.error('Có lỗi xảy ra khi xóa công việc!');
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
        deleteTask,
        currentPage,
        totalPages,
        setCurrentPage
    };
};