import React, { useState, useEffect } from 'react';
import { type ITask } from '../types/task.type';
import { toast } from 'react-toastify';

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskData: Partial<ITask>) => Promise<void>;
    taskToEdit?: ITask | null; 
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit, isOpen]);

    // Nếu Modal đang đóng thì không render gì cả
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.warning('Vui lòng nhập tên công việc!');
            return;
        }

        if (title.trim().length < 3) {
            toast.warning('Tên công việc quá ngắn, vui lòng nhập ít nhất 3 ký tự!');
            return;
        }

        if (title.trim().length > 100) {
            toast.warning('Tiêu đề quá dài, không được vượt quá 100 ký tự!');
            return;
        }



        try {
            setIsSubmitting(true);
            await onSubmit({ title, description });

            toast.success(taskToEdit ? 'Cập nhật thành công!' : 'Tạo mới thành công!');
            
            // Thành công thì xóa trắng form và đóng Modal
            setTitle('');
            setDescription('');
            onClose();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi lưu dữ liệu!';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Lớp Overlay làm mờ nền bên dưới Modal
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
            {/* Hộp thoại Modal */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                        {taskToEdit ? 'Cập nhật công việc' : 'Tạo công việc mới'}
                    </h3>
                    <button onClick={onClose} className="text-blue-100 hover:text-white transition-colors text-2xl font-bold leading-none">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tên công việc <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Nhập tên công việc..."
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả chi tiết</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-none"
                            placeholder="Nhập mô tả (không bắt buộc)..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center gap-2"
                        >
                            {isSubmitting ? 'Đang lưu...' : (taskToEdit ? 'Lưu thay đổi' : 'Tạo mới')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;