import React from 'react';

interface TaskFilterProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterStatus: boolean | undefined;
    onFilterChange: (value: boolean | undefined) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
    searchQuery, 
    onSearchChange, 
    filterStatus, 
    onFilterChange 
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            {/* Ô tìm kiếm */}
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm kiếm công việc..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            {/* Bộ lọc trạng thái */}
            <div className="sm:w-48">
                <select
                    value={filterStatus === undefined ? 'all' : filterStatus.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'all') onFilterChange(undefined);
                        else if (val === 'true') onFilterChange(true);
                        else if (val === 'false') onFilterChange(false);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="true">Đã hoàn thành</option>
                    <option value="false">Chưa hoàn thành</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilter;