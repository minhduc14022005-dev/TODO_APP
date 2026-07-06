import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './components/ConfirmModal';
import Pagination from './components/Pagination';
import { type ITask } from './types/task.type';
import { useTasks } from './hooks/useTask';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import TaskFilter from './components/TaskFilter';



const App: React.FC = () => {
  const { tasks, loading, searchQuery, filterStatus, currentPage, totalPages, setSearchQuery, setFilterStatus, setCurrentPage, saveTask, toggleStatus, deleteTask } = useTasks();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsOpenModal(true);
  };

  const handleOpenEdit = (task: ITask) => {
    setEditingTask(task);
    setIsOpenModal(true);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete); // Gọi API Xóa
      setTaskToDelete(null);          
    }
  };

  const handleFormSubmit = async (taskData: Partial<ITask>) => {
    await saveTask(taskData, editingTask?._id);
    setIsOpenModal(false);
  };
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 font-sans relative">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold"> QUẢN LÝ CÔNG VIỆC</h1>
            <p className="text-blue-100 mt-1 font-medium"> Để làm việc tốt hơn, hãy tạo công việc mới! </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-bold shadow hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <span>+</span> Thêm công việc
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Component Tìm kiếm & Lọc */}
          <TaskFilter 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
          />
          <TaskList
            tasks={tasks}
            loading={loading}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            onToggleStatus={toggleStatus}
            onDelete={(id) => setTaskToDelete(id)}
            onEdit={handleOpenEdit}
          />

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal Form */}
      <TaskFormModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleFormSubmit}
        taskToEdit={editingTask}
      />
      {/* Modal Xóa */}
      <ConfirmModal
        isOpen={taskToDelete !== null}
        title="Xóa công việc"
        message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa công việc này?"
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default App;