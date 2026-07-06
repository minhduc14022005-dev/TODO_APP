import React from 'react';
import { type ITask } from '../types/task.type';

interface TaskItemProps {
    task: ITask;
    onToggleStatus: (taskId: string, isCompleted: boolean) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: ITask) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus, onDelete, onEdit }) => {
    return (
        <div className={`flex items-center justify-between p-4 mb-3 bg-white rounded-lg border-l-4 shadow-sm transition-all duration-200 hover:shadow-md ${task.isCompleted ? 'border-green-500 opacity-75' : 'border-blue-500'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
                {/* Nút Checkbox để đánh dấu hoàn thành*/}
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggleStatus(task._id, task.isCompleted)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                {/*Tên task*/}
                <div className="flex flex-col truncate">
                    <span className={`text-lg font-medium truncate ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {task.title}
                    </span>
                    {task.description && (
                        <span className="text-sm text-gray-500 truncate">
                            {task.description}
                        </span>)
                    }
                </div>
            </div>
            {/* Các nút để xóa hoặc chỉnh sửa task*/}
            <div className="flex gap-2 flex-shrink-0">
                <button
                    onClick={() => onEdit(task)}
                    className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
