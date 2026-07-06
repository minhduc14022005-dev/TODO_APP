import React from 'react';
import { type ITask } from '../types/task.type';
import TaskItem from './TaskItem';

// Tạo TaskList
interface TaskListProps {
    tasks: ITask[];
    loading: boolean;
    searchQuery?: string;
    filterStatus?: boolean | undefined;
    onToggleStatus: (id: string, currentStatus: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
    tasks, 
    loading,
    searchQuery,
    filterStatus,
    onToggleStatus, 
    onDelete, 
    onEdit 
}) => {
    // Áp dụng kỹ thuật Early Return (Thoát sớm) cho trạng thái Loading
    if (loading && tasks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 font-medium animate-pulse">
                Đang tải dữ liệu từ hệ thống...
            </div>
        );
    }

    // Kỹ thuật Early Return cho trạng thái Rỗng (Empty State)
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                Chưa có công việc nào. Bấm "Thêm công việc" để bắt đầu!
            </div>
        );
    }

    if(!loading && tasks.length === 0){
        const isSearchingOrFiltering = (searchQuery && searchQuery.trim() !== '') || filterStatus !== undefined;
        if (isSearchingOrFiltering) {
            return (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    Không tìm thấy công việc nào.
                </div>
            );
        } else {
            return (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    Chưa có công việc nào. Bấm "Thêm công việc" để bắt đầu!
                </div>
            );
        }
    }

    // Hiển thị danh sách công việc
    return (
        <div className={`flex flex-col transition-opacity duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            {tasks.map(task => (
                <TaskItem 
                    key={task._id} 
                    task={task} 
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                    onEdit={onEdit} 
                />
            ))}
        </div>
    );
};

export default TaskList;